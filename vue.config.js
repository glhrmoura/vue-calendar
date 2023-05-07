const path = require('path');

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: false,
  outputDir: path.resolve(__dirname, './dist'),
  css: {
    extract: false,
  },
  configureWebpack: {
    optimization: {
      minimize: true,
    },
  },
});
