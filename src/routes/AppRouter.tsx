import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppShell from "../components/layout/AppShell";
import Home from "../pages/Home";
import Tracking from "../pages/Tracking";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout global (Header + Outlet + Footer) */}
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="tracking" element={<Tracking />} />

          {/* Fallback seguro */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
