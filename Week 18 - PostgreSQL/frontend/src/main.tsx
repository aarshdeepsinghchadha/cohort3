import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import './index.css'; // Assuming you have an index.css file for global styles

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </React.StrictMode>
);
