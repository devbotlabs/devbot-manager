import _ from "lodash";
import webpack from "webpack";
import strategies from "./strategies";
import yargs from "yargs";
import ExtractTextPlugin from "extract-text-webpack-plugin";
var path = require('path');

const argv = yargs
    .alias("p", "optimize-minimize")
    .alias("d", "debug")
    .alias("s", "dev-server")
    .argv;

const defaultOptions = {
    development: argv.debug,
    docs: false,
    test: false,
    optimize: argv.optimizeMinimize,
    devServer: argv.devServer,
    separateStylesheet: argv.separateStylesheet,
    prerender: argv.prerender,
};

export default (options) => {
    options = _.merge({}, defaultOptions, options);

    options.hotPort = 2992;
    options.publicPath = options.devServer ? "/_assets/" : "";
    const environment = options.test || options.development ? "development" : "production";
    const babelLoader = "babel";
    const reactLoader = options.development ? `react-hot!${babelLoader}` : babelLoader;
    const chunkFilename = (options.devServer ? "[id].js" : "[name].js") +
        (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "");

    options.excludeFromStats = [
        /node_modules[\\\/]react(-router)?[\\\/]/,
    ];

    const config = {
        entry: {
            app: "./reactClient/modules/client.js",
        },

        output: {
            path: "./www/public/__build__",
            filename: '[name].js',
            chunkFilename: '[id].chunk.js',
            //   publicPath: options.publicPath,
            sourceMapFilename: "debugging/[file].map",
        },

        resolve: {
            extensions: ["", ".js", ".jsx"],
        },


        module: {
            loaders: [

                { test: /\.(js|jsx)/, loader: babelLoader, exclude: /node_modules/ },
                { test: /\.json/, loader: "json" },
                { test: /\.(woff|woff2)/, loader: "url?limit=100000" },
                { test: /\.(png|jpg|jpeg|gif|svg)/, loader: "url?limit=100000" },
                { test: /\.(ttf|eot)/, loader: "file" }
            ]
        },
    


        // //   if (options.separateStylesheet) {
        //   }

        plugins: [
            // new webpack.optimize.ChunkPlugin({
            //     name: "commons",
            //     filename: "commons.js",
            //     chunks: ["app", "[name]","[id]"]
            // }),
            // new ExtractTextPlugin("[name].styl"),
            new ExtractTextPlugin("[name].css"),
            // new ExtractTextPlugin("[id].css",{  children: true}),
            //     new ExtractTextPlugin("cssplugin",{   filename: '[name].css',
            // chunkFilename: '[name].chunk.css',}),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new webpack.PrefetchPlugin("react"),
            new webpack.PrefetchPlugin("react-router"),
            new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
            //    new webpack.optimize.CommonsChunkPlugin("init.js"),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(environment),
                },
            })
        ],

        devServer: {
            host: "localhost",
            port: options.hotPort,
            proxy: [

                {
                    path: new RegExp("/meteor/(.*)"),
                    target: "http://localhost:3000"
                }
            ],
            stats: {
                exclude: options.excludeFromStats,
            },
        }
    };


    return strategies.reduce((conf, strategy) => {
        return strategy(conf, options);
    }, config);
};
