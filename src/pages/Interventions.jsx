import Sidebar from "../components/layout/Sidebar";

export default function Interventions() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Interventions
        </h1>

        <p className="text-gray-500 mb-8">
          Liste des interventions techniques
        </p>

        <div className="bg-white rounded-2xl shadow p-6">

          <table className="w-full">

            <thead>
              <tr className="text-left border-b">
                <th className="pb-4">Client</th>
                <th className="pb-4">Adresse</th>
                <th className="pb-4">Statut</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4">Client Test</td>
                <td>Paris</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Terminée
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4">Entreprise ABC</td>
                <td>Lyon</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    En cours
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}