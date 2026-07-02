import { BrowserRouter, Routes } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import { appRoutes } from "@/routes";
import "@/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>{appRoutes}</Routes>

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </BrowserRouter>
  );
}