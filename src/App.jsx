import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login
from "./pages/Login";

import Interventions
from "./pages/Interventions";

import Clients from "./pages/Clients";

import ClientDetail from "./pages/ClientDetail";

import Dashboard
from "./pages/Dashboard";

import Planning
from "./pages/Planning";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={<Interventions />}
        />

<Route path="/clients" element={<Clients />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        
        <Route
  path="/clients/:id"
  element={<ClientDetail />}
/>

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

        <Route
  path="/planning"
  element={<Planning />}
/>

      </Routes>

    </BrowserRouter>

  );

}