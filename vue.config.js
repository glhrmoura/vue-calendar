const path = require('path');

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: false,
  outputDir: path.resolve(__dirname, './lib'),
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src/lib')
      },
    },
    optimization: {
      minimize: true,
    },
  }
});
