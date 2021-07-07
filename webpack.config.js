const reactClientConfig = require("./configs/webpack.client.config");
const reactServerConfig = require("./configs/webpack.server.config");
const reactServiceWorkerConfig = require("./configs/webpack.service-worker.config");

module.exports = [
  reactClientConfig,
  reactServerConfig,
  reactServiceWorkerConfig,
];
