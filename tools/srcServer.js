// This file configures the development web server
// which supports hot reloading and synchronized testing.

/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.dev');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const port = process.env.npm_package_config_port || 3000;
const host = process.env.npm_package_config_host || 'localhost';

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, 'src'),
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: historyApiFallback(),
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    'errors-only': true
  }
}).listen(port, host, function (err) {
  if (err) {
    console.error(err);
  }

  console.info(`Listening at http://${host}:${port}/`);
});
