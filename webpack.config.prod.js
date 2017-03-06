const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: {
    js: path.resolve(__dirname, 'src/index'),
    vendor: Object.keys(pkg.dependencies)
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vendor.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: 'body',
      hash: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?name=[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
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
