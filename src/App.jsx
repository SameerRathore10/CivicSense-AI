import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import ReportIssue from "./pages/ReportIssue/ReportIssue";
import Reports from "./pages/Reports/Reports";
import Admin from "./pages/Admin/Admin";
import Register from "./pages/Register/Register";
import MyReports from "./pages/MyReports/MyReports";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import MapPage from "./pages/MapPage/MapPage";
import Navbar from "./components/layout/Navbar";
import { ErrorFallback } from "./components/ui/ErrorFallback";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/map" element={<MapPage />} />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportIssue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="/my-reports"
            element={
              <ProtectedRoute>
                <MyReports />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster richColors position="top-right" theme="dark" />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
