const webpack = require("webpack");
const path = require("path");
const appRootDir = require("app-root-dir");
const ROUTES = require("../src/shared/url");
const { config } = require("./project.config");
const mode = config.ENV;

const reactServiceWorkerConfig = {
  name: "service-worker",
  entry: {
    "service-worker": path.resolve(
      appRootDir.get(),
      "src",
      "service-worker.js"
    ),
  },
  output: {
    path: path.resolve(appRootDir.get(), "dist"),
    filename: "[name].js",
    chunkFilename: "[name].[id].[hash].js",
  },
  mode,
  plugins: [
    new webpack.DefinePlugin({
      TIMESTAMP: new Date().getTime(),
      ROUTES: JSON.stringify(ROUTES),
    }),
  ],
};

module.exports = reactServiceWorkerConfig;
