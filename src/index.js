import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SchoolProvider } from "./school-context";

ReactDOM.render(
  <React.StrictMode>
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
