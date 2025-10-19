import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./pages/Dashboard";
// import MainApp from "./mainstack_dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* <Route path="/revenue" element={<MainApp />} /> */}
        <Route path="/revenue" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
