import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/revenue" replace />} />

        <Route path="/revenue" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
