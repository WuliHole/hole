'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'

exports.tslint = {
  test: /\.tsx?$/,
  loader: 'tslint',
  exclude: /node_modules/,
};

exports.tsx = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  exclude: /node_modules/,
};

exports.istanbulInstrumenter = {
  test: /^(.(?!\.test))*\.tsx?$/,
  loader: 'istanbul-instrumenter-loader',
  query: {
    embedSource: true,
  },
};

exports.html = {
  test: /\.html$/,
  loader: 'raw',
  exclude: /node_modules/,
};

exports.css = {
  test: /\.css$/,

  loader: isProduction
    ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    : 'style-loader!css-loader!postcss-loader',

  exclude: /node_modules/,
};

exports.less = {
  test: /\.less$/,

  loader: isProduction
    ? ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    : null,

  loaders: !isProduction && ['style', 'css', 'less'],
}

exports.pluginCss = {
  test: /plugin\.css$/,
  loaders: [
    'style',
    'css',
  ],
}

exports.json = {
  test: /\.json$/,
  loader: 'json',
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

function makeUrlLoader(pattern) {
  return {
    test: pattern,
    loader: 'url',
    exclude: /node_modules/,
  };
}
