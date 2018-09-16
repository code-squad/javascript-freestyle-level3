const path = require('path');

module.exports = {
  devtool: "source-map",
  entry: './src/js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production'
};