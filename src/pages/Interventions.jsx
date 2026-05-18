import { useState } from "react";

export default function Interventions() {
  const [interventions, setInterventions] = useState([
    {
      id: 1,
      client: "Client Test",
      adresse: "Paris",
      statut: "Terminée",
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Interventions</h1>

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
                <td className="py-4">{item.client}</td>
                <td>{item.adresse}</td>
                <td>{item.statut}</td>

                <td>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}