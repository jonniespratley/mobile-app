const path = require("path");
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
module.exports = {
  entry: {
    bundle: "./src/index.js"
  },
  devtool: "source-map",
  //target: 'node',
  externals: [
    //nodeExternals(),
    //'onsenui',
    //'react-onsenui'
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss']
  },
  output: {
    filename: "[name].js",
    publicPath: '/',
    path: path.resolve(__dirname, "public")
  }
};
