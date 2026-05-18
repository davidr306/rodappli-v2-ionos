import { Menu } from "lucide-react";

export default function Topbar({ setSidebarOpen }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex items-center justify-between mb-6">

      <div className="flex items-center gap-3">

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

      </div>

      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
        Déconnexion
      </button>
    </div>
  );
}