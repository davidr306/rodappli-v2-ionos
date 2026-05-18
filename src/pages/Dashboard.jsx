import Topbar from "../components/layout/Topbar";

export default function Dashboard() {

  return (

    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

      <Topbar title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white rounded-2xl shadow p-6">
          <p>Total interventions</p>
          <h2 className="text-4xl font-bold mt-3">
            10
          </h2>
        </div>

        <div className="bg-green-600 text-white rounded-2xl shadow p-6">
          <p>Interventions terminées</p>
          <h2 className="text-4xl font-bold mt-3">
            8
          </h2>
        </div>

        <div className="bg-yellow-500 text-white rounded-2xl shadow p-6">
          <p>Interventions en cours</p>
          <h2 className="text-4xl font-bold mt-3">
            2
          </h2>
        </div>

        <div className="bg-purple-600 text-white rounded-2xl shadow p-6">
          <p>Clients uniques</p>
          <h2 className="text-4xl font-bold mt-3">
            6
          </h2>
        </div>

      </div>

    </div>

  );

}