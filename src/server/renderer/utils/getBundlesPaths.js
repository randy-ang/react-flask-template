import fs from "fs";
import path from "path";
import appRootDir from "app-root-dir";

export default function getBundlesPaths(
  bundles = [],
  buildManifestPath = "build-manifest.json"
) {
  const buildManifestFullPath = path.resolve(
    appRootDir.get(),
    "dist",
    buildManifestPath
  );

  if (!fs.existsSync(buildManifestFullPath)) {
    throw new Error(`We could not find the "${buildManifestFullPath}" file`);
  }

  const readBuildManifestFile = () =>
    JSON.parse(fs.readFileSync(buildManifestFullPath, "utf8"));
  const buildManifestJson = readBuildManifestFile();

  if (typeof buildManifestJson === "undefined") {
    throw new Error("No asset data found for client bundle.");
  }

  return bundles.map((bundleShortName) => buildManifestJson[bundleShortName]);
}
