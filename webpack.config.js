const path = require("path");
const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: {
    bundle: "./src/index.js",
    
  },

  output: {
    filename: "[name].js",
    publicPath: '/',
    path: path.resolve(__dirname, "public")
  },

  devtool: "source-map",
   target: 'node',
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          { loader: "babel-loader" }
        ]
      }
    ]
  }
};
