// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeWrapper from "./Componts/ThemeWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeWrapper>
      
      <App />
    </ThemeWrapper>
  </StrictMode>
);
