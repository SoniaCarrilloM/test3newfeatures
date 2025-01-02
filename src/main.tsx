import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SchoolProvider } from "./school-context";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </React.StrictMode>
);
