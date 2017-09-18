'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManiFest = require('webpack-manifest-plugin');
const QiniuPlugin = require('qn-webpack');
const path = require('path')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

const sourceMap = process.env.TEST || process.env.NODE_ENV !== 'production'
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })]
  : [];

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
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
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  // new BundleAnalyzerPlugin(),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: ({ resource }) => (
      resource &&
      resource.indexOf('node_modules') >= 0 &&
      resource.match(/\.js$/)
    ),
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'common-in-lazy',
    minChunks: ({ resource } = {}) => (
      resource &&
      resource.includes('node_modules') &&
      /draft-js/.test(resource)
    ),
  }),

  new webpack.optimize.DedupePlugin(),

  new ManiFest({
    fileName: 'hole-manifest.json',
  }),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),

];

const cdn = process.env.CDN_PATH
if (process.env.NODE_ENV === 'production' && cdn) {
  if (!cdn.startsWith('http://') && !cdn.startsWith('https://')) {
    throw new TypeError('CDN_PATH should startswith http(s)://')
  }

  const fs = require('fs')
  const existCDNConfig = fs.existsSync(path.join(__dirname, '../qiniu.json'))
  /* eslint-disable */

  console.log('existCDNConfig=>', existCDNConfig)
  /* eslint-enable */
  if (existCDNConfig) {
    const config = require('../qiniu.json')
    prodPlugins.push(new QiniuPlugin({
      accessKey: config.accessKey,
      secretKey: config.secretKey,
      exclude: /js\.map$/,
      bucket: config.bucket,
      path: config.path,
      zone: config.zone,
    })
    )
  }
}

module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);
