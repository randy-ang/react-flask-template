const path = require("path");
const appRootDir = require("app-root-dir").get();

const config = {
  ENV: process.env.NODE_ENV || "production",
  APP_ENV: process.env.APP_ENV || "production",
  APP_ASSET_PATH: "/",
};

const SW_ENABLED = true;

const globals = {
  "process.env.NODE_ENV": JSON.stringify(config.ENV),
  "process.env.APP_ENV": JSON.stringify(config.APP_ENV),
  PROD: process.env.APP_ENV === "production",
  STAG: process.env.APP_ENV === "staging",
  DEV: process.env.APP_ENV === "development",
  SW_ENABLED: JSON.stringify(SW_ENABLED),
};

const generatePath = (...paths) => path.resolve(appRootDir, ...paths);

const directory = {
  base: generatePath(),
  build: generatePath("dist"),
  public: generatePath("public"),
  src: generatePath("src"),
  serverBuild: generatePath("src", "server", "renderer", "build"),
  custom: generatePath,
};

module.exports = {
  globals,
  directory,
  config,
};
