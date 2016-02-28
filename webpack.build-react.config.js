var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

const defaultOptions = {
  development: argv.debug,
  docs: false,
  test: false,
  optimize: argv.optimizeMinimize,
  devServer: argv.devServer,
  separateStylesheet: argv.separateStylesheet,
  prerender: argv.prerender,
};

export default (options)=> {
     const environment = options.test || options.development ? "development" : "production";
  const babelLoader = "babel";
  const reactLoader = options.development ? `react-hot!${babelLoader}` : babelLoader;
    
    
    
}

module.exports = {

  //devtool: 'source-map',

  entry: './reactClient/modules/client.js',

  output: {
    path: __dirname + '/www/__build__',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { 
          test: /\.(js|jsx)/,
            loader: 'babel',
        },
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js','.jsx', '.coffee'] 
  }

}
