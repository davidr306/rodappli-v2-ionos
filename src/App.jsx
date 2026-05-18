import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interventions from "./pages/Interventions";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interventions" element={<Interventions />} />
      </Routes>
    </BrowserRouter>
  );
}