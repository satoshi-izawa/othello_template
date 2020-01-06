/** @type import('webpack').Configuration */

const isProduction = process.env.NODE_ENV !== 'development';
const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const context = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    index: 'src/index.tsx',
  },
  devtool: isProduction ? false : 'inline-source-map',
  output: {
    path: path.resolve(context, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve(context, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true },
        }],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                cssnano({ preset: ['default', { normalizeUrl: false }] }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.html' },
    ]),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
      BUILD: JSON.stringify((() => {
        const current = new Date();
        const formatter = num => `00${num}`.slice(-2);
        return [
          current.getFullYear(),
          formatter(current.getMonth() + 1),
          formatter(current.getDate()),
          formatter(current.getHours()),
          formatter(current.getMinutes()),
        ].join('');
      })()),
    }),
  ],
};
