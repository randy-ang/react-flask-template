import React from "react";
import { StaticRouter } from "react-router-dom";
import App from "@/shared/App";
import { renderWithData } from "react-ssr-prefetch/server";
import { HelmetProvider } from "react-helmet-async";
import { ChunkExtractor } from "@loadable/server";
import { directory } from "../../../configs/project.config";
import { generateHtmlData } from "./utils/generateHtml";

let input = "";

process.stdin.on("data", function (data) {
  input += data.toString();
});

process.stdin.on("end", async function () {
  const props = JSON.parse(input);
  const routerContext = {};
  const helmetContext = {};
  const { url, shell } = props;
  const data = {};
  const contextProps = { data: { data, requests: [] } };

  const hydrateOnClient = (status = 200) => {
    const output = generateHtmlData({
      helmet: helmetContext.helmet,
      data,
      shell,
    });

    output.status = status;

    process.stdout.write(JSON.stringify(output));
    process.stdout.end();
  };

  if (shell) {
    return hydrateOnClient();
  }

  try {
    const app = (
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} context={routerContext}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );
    const statsFile = directory.custom("dist", "loadable-stats.json");
    const chunkExtractor = new ChunkExtractor({
      statsFile,
      entrypoints: ["app"],
    });
    const appChunks = chunkExtractor.collectChunks(app);
    const html = await renderWithData(appChunks, contextProps.data);
    const { helmet } = helmetContext;

    const output = generateHtmlData({
      chunkExtractor,
      content: html,
      helmet,
      data,
    });

    process.stdout.write(JSON.stringify(output));
    process.stdout.end();
  } catch (err) {
    console.error("error when ssr: " + err.message);
    hydrateOnClient();
  }
});
