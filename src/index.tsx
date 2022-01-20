import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { loadDevTools } from "jira-dev-tool";
import "antd/dist/antd.less";
import { AppProviders } from "context";

import reportWebVitals from "./reportWebVitals";
loadDevTools(() =>
  ReactDOM.render(
    // <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>,
    // </React.StrictMode>,
    document.getElementById("root")
  )
);

reportWebVitals();
