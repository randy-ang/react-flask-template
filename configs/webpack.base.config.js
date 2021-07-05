const webpack = require("webpack");
const { globals, config, directory } = require("./project.config");

const baseConfig = {
  mode: config.ENV,
  plugins: [new webpack.DefinePlugin(globals)],
  output: {
    path: directory.build,
    publicPath: config.APP_ASSET_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)/,
        loader: require.resolve("file-loader"),
      },
    ],
  },
};

module.exports = baseConfig;
