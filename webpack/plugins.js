'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const sourceMap = process.env.TEST || process.env.NODE_ENV !== 'production'
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })]
  : [];

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),

  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
  }),
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets' },
  ]),
  new ExtractTextPlugin('[name]-[contenthash].css'),

].concat(sourceMap);

const devPlugins = [
  new StyleLintPlugin({
    configFile: './.stylelintrc',
    files: ['src/**/*.css', 'src/**/*.less'],
    failOnError: false,
    syntax: 'less',
  }),
];

const prodPlugins = [
  new BundleAnalyzerPlugin(),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: ({ resource }) => (
      resource &&
      resource.indexOf('node_modules') >= 0 &&
      resource.match(/\.js$/)
    ),
  }),

  new webpack.optimize.CommonsChunkPlugin({
    async: 'common-in-lazy',
    minChunks: ({ resource } = {}) => (
      resource &&
      resource.includes('node_modules') &&
      /draft-js/.test(resource)
    ),
  }),

  new webpack.optimize.CommonsChunkPlugin({
    async: 'used-twice',
    minChunks: (module, count) => (
      count >= 2
    ),
  }),

  new webpack.optimize.DedupePlugin(),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),

];

module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);
