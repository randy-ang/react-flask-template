const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { directory } = require("./project.config");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const alias = require("./alias.config");
const AssetsPlugin = require("assets-webpack-plugin");

const PROD = process.env.NODE_ENV === "production";
const config = {
  name: "client",
  entry: { app: directory.custom("src", "client", "main.js") },
  resolve: {
    alias,
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "/",
    path: directory.build,
    // chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          PROD ? MiniCssExtractPlugin.loader : require.resolve("style-loader"),
          require.resolve("css-loader"),
          require.resolve("sass-loader"),
        ],
      },
    ],
  },
  plugins: [
    new LoadablePlugin({
      writeToDisk: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[chunkhash].css",
    }),
    new WebpackManifestPlugin({
      fileName: "build-manifest.json",
    }),
    new CopyWebpackPlugin([directory.public]),
    new AssetsPlugin({
      filename: "assets.json",
      path: directory.build,
    }),
  ].filter(Boolean),
  devtool: PROD ? false : "source-map",
  mode: process.env.NODE_ENV,
  optimization: {
    splitChunks: {
      chunks: "async",
      maxAsyncRequests: Infinity,
      minSize: 3000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          filename: "vendor.[contenthash].js",
        },
      },
    },
  },
};

const reactClientConfig = merge(baseConfig, config);

module.exports = reactClientConfig;
