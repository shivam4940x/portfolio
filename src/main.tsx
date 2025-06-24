import { RouteTransitionProvider } from "@/context/RouteTransitionProvider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/assets/css/main.css";
import "@/assets/css/fonts.css";
import "@/assets/css/tailwind.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTransitionProvider>
        <App />
      </RouteTransitionProvider>
    </BrowserRouter>
  </StrictMode>
);
