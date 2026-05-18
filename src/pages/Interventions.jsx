import { useEffect, useState } from "react";
import { generatePDF } from "../utils/generatePDF";
import Sidebar from "../components/layout/Sidebar";

import {
  createIntervention,
  getInterventions,
} from "../services/interventionService";

export default function Interventions() {

  const [interventions, setInterventions] = useState([]);

  const [client, setClient] = useState("");
  const [adresse, setAdresse] = useState("");

  async function loadInterventions() {
    const data = await getInterventions();
    setInterventions(data);
  }

  useEffect(() => {
    loadInterventions();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await createIntervention({
      client,
      adresse,
      statut: "En cours",
    });

    setClient("");
    setAdresse("");

    loadInterventions();
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Interventions
        </h1>

        <p className="text-gray-500 mb-8">
          Gestion des interventions techniques
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4"
        >

          <input
            type="text"
            placeholder="Nom du client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Ajouter intervention
          </button>

        </form>

        <div className="bg-white rounded-2xl shadow p-6">

          <table className="w-full">

  <thead>
  <tr className="border-b text-left">
    <th className="pb-4">Client</th>
    <th className="pb-4">Adresse</th>
    <th className="pb-4">Statut</th>
    <th className="pb-4">PDF</th>
  </tr>
</thead>

<tbody>


              {interventions.map((item) => (

                <tr key={item.id} className="border-b">

  <td className="py-4">
    {item.client}
  </td>

  <td>
    {item.adresse}
  </td>

  <td>
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
      {item.statut}
    </span>
  </td>

  <td>
    <button
      onClick={() => generatePDF(item)}
      className="bg-green-600 text-white px-4 py-2 rounded-xl"
    >
      PDF
    </button>
  </td>

</tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}