import ExtractTextPlugin, { extract } from "extract-text-webpack-plugin";
import lost from 'lost'

export default (config, options) => {
    const stylesheetLoaders = [
        { test: /\.css/, loader: ExtractTextPlugin.extract("css-loader") },
        { test: /\.styl/, loader: ExtractTextPlugin.extract("css-loader!postcss-loader!stylus-loader") }

    ];

    let loaders = [];
    for (let loader of stylesheetLoaders) {
        if (options.prerender) {
            loader.loader = "null";
        } else if (options.separateStylesheet) {
            loader.loader = extract("style", loader.loader);
        } else {
            loader.loader = `style!${loader.loader}`;
        }
        loaders.push(loader);
    }

    config.module.loaders = config.module.loaders.concat(stylesheetLoaders);
    config.postcss = [
        lost
    ]

    // //   if (options.separateStylesheet) {
    //   }
    config.plugins.push(new ExtractTextPlugin("app.css"));

    return config;
};


// import ExtractTextPlugin, { extract } from "extract-text-webpack-plugin";

// export default (config, options) => {
//   const stylesheetLoaders = [
//                    { test: /\.styl$/, loaders:["style-loader","css-loader","postcss-loader","stylus-loader"] }

//   ];

//   let loaders = [];
//   for (let loader of stylesheetLoaders) {
//     if (options.prerender) {
//     //   loader.loader = "null";
//     } else if (options.separateStylesheet) {
//       loader.loader = extract("style", loader.loader);
//     } else {
//       loader.loader = `style!${loader.loader}`;
//     }
//     loaders.push(loader);
//   }

//   config.module.loaders = config.module.loaders.concat(stylesheetLoaders);

//   if (options.separateStylesheet) {
//     config.plugins.push(new ExtractTextPlugin("app.css"));
//   }
//   return config;
// };
