const nodeExternals = require("webpack-node-externals");
const { directory } = require("./project.config");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const alias = require("./alias.config");

const PROD = process.env.NODE_ENV === "production";

const config = {
  target: "node",
  entry: directory.custom("src", "server", "renderer", "ssr.js"),
  resolve: {
    alias,
  },
  output: {
    path: directory.custom("src", "server", "renderer", "build"),
    filename: "App.js",
    // chunkFilename: '[name].[id].js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [require.resolve("null-loader")],
      },
    ],
  },
  devtool: PROD ? false : "source-map",
};

const reactServerConfig = merge(baseConfig, config);

module.exports = reactServerConfig;
