import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import StatsCard from "../components/dashboard/StatsCard";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
export default function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
const [stats, setStats] = useState({
  interventions: 0,
  clients: 0,
  pending: 0,
});

useEffect(() => {

  async function loadStats() {
    const data = await getDashboardStats();
    setStats(data);
  }

  loadStats();

}, []);
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">

          <div className="w-64 bg-gray-900 h-full p-5">
            <Sidebar />
          </div>

        </div>
      )}

      {/* Main */}
      <main className="flex-1 p-4 md:p-6">

        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <StatsCard
            title="Interventions"
            value={stats.interventions}
          />

          <StatsCard
            title="Clients"
            value={stats.clients}
          />

          <StatsCard
            title="En attente"
            value={stats.pending}
          />

        </div>

      </main>

    </div>
  );
}