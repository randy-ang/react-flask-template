import serialize from "serialize-javascript";
import getBundlesPaths from "./getBundlesPaths";

function createPreloadTag({ as, href }) {
  if (href) {
    return `<link rel="preload" as="${as}" crossorigin="anonymous" href="${href}">`;
  }

  return "";
}

function createScriptTag({ src, type = "", nomodule = false }) {
  return `<script defer="defer" src="${src}" ${type ? `type="${type}"` : ""} ${
    nomodule ? "nomodule" : ""
  } crossorigin="anonymous"></script>`;
}

const joinHtml = (...htmlTags) => htmlTags.filter(Boolean).join("\n");

const mainBundles = getBundlesPaths(["app.js", "vendor.js"]);
console.error("mainBundles: ", mainBundles);

export const generateHtmlData = ({
  chunkExtractor = {
    getLinkTags: () =>
      mainBundles
        .map((bundlePath) =>
          createPreloadTag({ as: "script", href: bundlePath })
        )
        .join("\n\t"),
    getStyleTags: () => {},
    getScriptTags: () =>
      mainBundles
        .map((bundlePath) => createScriptTag({ src: bundlePath }))
        .join(""),
  },
  helmet = {
    base: [],
    bodyAttributes: [],
    htmlAttributes: [],
    link: [],
    meta: [],
    script: [],
    style: [],
    title: [],
  },
  data,
  content = "",
  shell = false,
}) => {
  const footer = joinHtml(
    `<script type="text/javascript">
  window.__data=${serialize({ data }, { isJSON: true })};
  window.__shell__=${shell};
</script>`,
    helmet.script.toString(),
    chunkExtractor.getScriptTags()
  );

  const head = joinHtml(
    helmet.base.toString(),
    helmet.title.toString(),
    helmet.meta.toString(),
    chunkExtractor.getLinkTags(),
    chunkExtractor.getStyleTags(),
    helmet.link.toString(),
    helmet.style.toString(),
    helmet.script.toString()
  );

  return { footer, head, html: content };
};
