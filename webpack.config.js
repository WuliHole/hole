'use strict';

const path = require('path');
const proxy = require('./server/webpack-dev-proxy');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const postcssInit = require('./webpack/postcss');
const localIp = require('ip').address()

// const applicationEntries = process.env.NODE_ENV === 'development'
//   ? ['webpack-hot-middleware/client?reload=true']
//   : [];

const PORT = process.env.PORT
const productionPublicPath = process.env.CDN_PATH
  ? process.env.CDN_PATH + '/[hash]/'
  : `http://localhost:${PORT ? PORT : 3000}/`

module.exports = {
  entry: {
    index: './src/index.tsx',
  },

  output: {
    path: path.join(__dirname, 'dist'),

    filename: process.env.NODE_ENV === 'production'
      ? '[name][hash].js'
      : '[name].js',

    publicPath: process.env.NODE_ENV === 'production'
      ? productionPublicPath
      : `http://${localIp}:8080/`,

    sourceMapFilename: process.env.NODE_ENV === 'production'
      ? '[name][hash].js.map'
      : '[name].js.map',

    chunkFilename: '[id][hash].js',
  },

  devtool: process.env.NODE_ENV === 'production' ?
    'source-map' :
    'inline-source-map',

  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
      'utils': path.join(__dirname, 'src', 'utils'),
      'app': path.join(__dirname, 'src'),
    },

    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.tsx',
      '.ts',
      '.js',
      '.json',
    ],
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: { index: '/' },
    disableHostCheck: true,
    proxy: Object.assign({}, proxy(), {
      '*': 'http://localhost:3000',
      '*.hot-update.json': { ignorePath: true },
    }),
  },

  module: {
    preLoaders: [
      loaders.tslint,
    ],
    loaders: [
      loaders.tsx,
      loaders.html,
      loaders.less,
      loaders.css,
      loaders.pluginCss,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
      loaders.json,
    ],
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    // why this
    // https://github.com/davezuko/react-redux-starter-kit/issues/327
    fs: '{}',
  },

  postcss: postcssInit,
};
