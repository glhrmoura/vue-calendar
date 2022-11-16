const path = require('path');

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: false,
  productionSourceMap: false,
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
    }
  }
});
