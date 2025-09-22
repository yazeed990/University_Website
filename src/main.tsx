import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
