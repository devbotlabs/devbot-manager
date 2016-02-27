var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var lost = require('lost');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://'+process.env.HOST_IP+':'+process.env.WEBPACK_PORT,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../reactClient/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'hot'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js','.jsx']
  },
   postcss: [
        lost
    ],
  module: {
    loaders: [
      { test: /\.styl$/, loaders: [  "style-loader","css-loader","postcss-loader","stylus-loader"] },

      {
      test: /\.css$/,
      loader: 'style!css'
    }, {
              test: /\.(js|jsx)$/,  //All .js and .jsx files

      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, '../reactClient')
    }]
  }
};
