const baseConfig = require('./base');
const devConfig = require('./dev');
const prodConfig = require('./prod');
const { merge } = require('webpack-merge');

const mode = process.env.NODE_ENV;
const isDevMode = mode !== 'production';

console.log(`mode: ${mode}`);

module.exports = merge([
  baseConfig,
  isDevMode ? devConfig : prodConfig
]);
