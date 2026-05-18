import { useState, useEffect } from "react";
import { generatePDF } from "../utils/generatePDF";
import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

export default function Interventions() {

  const [client, setClient] = useState("");
  const [adresse, setAdresse] = useState("");
  const [statut, setStatut] = useState("");

  const [interventions, setInterventions] = useState([]);

  async function chargerInterventions() {
    try {

      const querySnapshot = await getDocs(
        collection(db, "interventions")
      );

      const liste = [];

      querySnapshot.forEach((doc) => {
        liste.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setInterventions(liste);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    chargerInterventions();
  }, []);

  async function ajouterIntervention(e) {
    e.preventDefault();

    const nouvelleIntervention = {
      client,
      adresse,
      statut,
    };

    try {

      await addDoc(
        collection(db, "interventions"),
        nouvelleIntervention
      );

      chargerInterventions();

      setClient("");
      setAdresse("");
      setStatut("");

      alert("Intervention ajoutée !");

    } catch (error) {
      console.error(error);
      alert("Erreur Firebase");
    }
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-6">
        Interventions
      </h1>

      <form
        onSubmit={ajouterIntervention}
        className="bg-white rounded-2xl shadow p-6 mb-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Nom du client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="border rounded-xl p-3"
          />

          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            className="border rounded-xl p-3"
          >
            <option value="">
              Choisir un statut
            </option>

            <option value="En cours">
              En cours
            </option>

            <option value="Terminée">
              Terminée
            </option>

          </select>

        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Ajouter intervention
        </button>

      </form>

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

            {interventions.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="py-4">
                  {item.client}
                </td>

                <td>
                  {item.adresse}
                </td>

                <td>
                  {item.statut}
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
  );
}