import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import ReactApp from "@/shared/App";

if (SW_ENABLED) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        console.log("Service worker registration succeeded:", registration);
      })
      .catch(function (error) {
        console.log("Service worker registration failed:", error);
      });
  } else {
    console.log("Service workers are not supported.");
  }
}

function App() {
  return (
    <BrowserRouter>
      <ReactApp />
    </BrowserRouter>
  );
}

loadableReady(() => {
  const renderApp = window.__shell__ ? render : hydrate;
  renderApp(<App />, document.querySelector("#app"));
});
