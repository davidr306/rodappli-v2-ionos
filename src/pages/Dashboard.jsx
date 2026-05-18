import Sidebar from "../components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-black mb-2">
          Rodappli V2
        </h1>

        <p className="text-gray-500 mb-8">
          Gestion des interventions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
              Interventions
            </h2>

            <p className="text-3xl font-bold text-black mt-2">
              12
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
              Clients
            </h2>

            <p className="text-3xl font-bold text-black mt-2">
              8
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
              Factures
            </h2>

            <p className="text-3xl font-bold text-black mt-2">
              5
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}