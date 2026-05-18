import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import InterventionForm from "../components/layout/InterventionForm";

export default function Dashboard({ user, onLogout }) {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app-container">
      <Sidebar onLogout={onLogout} />

      <div className="main-content">
        <Header user={user} />

        <div className="dashboard-grid">
          <div className="stats">
            <div className="card">Interventions</div>
            <div className="card">Factures</div>
            <div className="card">Clients</div>
          </div>

          <InterventionForm onSaved={() => setRefresh(!refresh)} />
        </div>
      </div>
    </div>
  );
}