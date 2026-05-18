export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">
          Rodappli
        </h1>

        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-blue-400">
            Dashboard
          </a>

          <a href="#" className="hover:text-blue-400">
            Interventions
          </a>

          <a href="#" className="hover:text-blue-400">
            Clients
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">

        {/* Topbar */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Tableau de bord
          </h2>

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Déconnexion
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Interventions
            </h3>

            <p className="text-3xl font-bold mt-2">
              24
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Clients
            </h3>

            <p className="text-3xl font-bold mt-2">
              18
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              En attente
            </h3>

            <p className="text-3xl font-bold mt-2">
              5
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}