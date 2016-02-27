var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot.config');

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, './src'),
  hot: true,
  historyApiFallback: true
}).listen(process.env.WEBPACK_PORT, process.env.HOST_IP, function (err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
  }

  console.log('Listening at localhost:1337'); //eslint-disable-line no-console
});
