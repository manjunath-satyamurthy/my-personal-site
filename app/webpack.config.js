const path = require('path');

module.exports = {

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: "bundle.js",
  },

  module: {

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      },

      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  },
}