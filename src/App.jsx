import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import ReportIssue from "./pages/ReportIssue/ReportIssue";
import Reports from "./pages/Reports/Reports";
import Admin from "./pages/Admin/Admin";
import Register from "./pages/Register/Register";
import MyReports from "./pages/MyReports/MyReports";
import ProtectedRoute from "./components/ProtectedRoute";
import MapPage from "./pages/MapPage/MapPage";

function App() {
  return (
    <BrowserRouter>
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
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
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
    </BrowserRouter>
  );
}

export default App;
