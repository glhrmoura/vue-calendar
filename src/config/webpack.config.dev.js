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
    static: {
      directory: path.join(rootPath, 'src', 'dev', 'public'),
    },
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
              transpileOnly: true,
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
      favicon: path.resolve(rootPath, 'src', 'lib', 'static', 'images', 'favicon.ico'),
      template: path.resolve(rootPath, 'src', 'dev', 'public', 'index.html'),
    }),
  ],
};
