// This file configures a web server for testing the production build
// on your local machine.

/* eslint-disable no-console */

const webpack = require('webpack');
const historyApiFallback = require('connect-history-api-fallback');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.dev');
const path = require('path');
const port = process.env.npm_package_config_port || 3000;
const host = process.env.npm_package_config_host || 'localhost';
const {
  chalkProcessing
} = require('./chalkConfig');

console.log(chalkProcessing('Opening production build...'));

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, 'dist'),
  publicPath: config.output.publicPath,
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
