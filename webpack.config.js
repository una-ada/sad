/**
 * Sad Webpack Config File
 * @author Una Ada <una@xn--z7x.dev>
 * {@link https://webpack.js.org/configuration/}
 * {@link https://webpack.js.org/configuration/watch/}
 * {@link https://webpack.js.org/guides/typescript/}
 */
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
