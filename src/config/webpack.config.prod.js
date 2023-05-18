const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const rootPath = path.resolve(__dirname, '../../');

module.exports = {
  mode: 'production',

  entry: './src/lib/index.ts',

  output: {
    filename: 'index.js',
    path: path.resolve(rootPath, 'dist'),
    libraryTarget: 'commonjs',
    clean: true,
  },

  externals: {
    vue: 'vue',
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
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

  plugins: [new VueLoaderPlugin()],
};
