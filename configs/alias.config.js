const { get } = require("app-root-dir");
const path = require("path");

const rootDir = get();

const alias = {
  components: path.resolve(rootDir, "src", "shared", "components"),
  routes: path.resolve(rootDir, "src", "shared", "routes"),
  "@url": path.resolve(rootDir, "src", "shared", "url.js"),
  "@shared": path.resolve(rootDir, "src", "shared"),
  "@": path.resolve(rootDir, "src"),
};

module.exports = alias;
