``// production config
const merge = require('webpack-merge');
const {resolve} = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/vgo_game', //so that it works with github pages
  },
  devtool: 'source-map',
  plugins: [],

  optimization: {
      minimize: false //TODO: minimization breaks ECSY...
  },
});
