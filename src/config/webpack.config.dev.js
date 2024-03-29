const path = require('path');
const Webpack = require('webpack');
const VueLoader = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../../');

module.exports = {
  mode: 'development',

  entry: './src/dev/index.ts',

  devServer: {
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },

      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(rootPath, 'src'),
    },
  },

  plugins: [
    new VueLoader.VueLoaderPlugin(),

    new Webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, 'src', 'dev', 'index.html'),
    }),
  ],
};
