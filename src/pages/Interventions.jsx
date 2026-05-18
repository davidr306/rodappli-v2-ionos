import Topbar from "../components/layout/Topbar";

export default function Interventions() {

  return (

    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

      <Topbar title="Interventions" />

      <div className="bg-white rounded-2xl shadow p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="pb-4">
                Client
              </th>

              <th className="pb-4">
                Adresse
              </th>

              <th className="pb-4">
                Statut
              </th>

              <th className="pb-4">
                PDF
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-4">
                Client Test
              </td>

              <td>
                Paris
              </td>

              <td>
                Terminée
              </td>

              <td>

                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  PDF
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}