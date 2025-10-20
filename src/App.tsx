import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import RevenuePage from "./pages/revenue";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/revenue" replace />} />

        <Route path="/revenue" element={<RevenuePage />} />
      </Routes>
    </Router>
  );
}
