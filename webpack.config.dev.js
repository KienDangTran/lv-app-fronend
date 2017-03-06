const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  // resolveLoader: {
  //   'fallback': path.join(__dirname, 'node_modules')
  // },
  debug: true,
  noInfo: true,
  devtool: '#cheap-module-eval-source-map',
  entry: [
    `webpack-dev-server/client?http://${process.env.npm_package_config_host}:${process.env.npm_package_config_port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: true
    })
  ],
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loaders: ['babel?retainLines=true'],
        exclude: /node_modules/
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.ico$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: () => [autoprefixer]
};
