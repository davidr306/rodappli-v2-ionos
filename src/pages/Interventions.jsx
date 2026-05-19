import { useEffect, useState } from "react";

import { db } from "../firebase/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import Topbar from "../components/layout/Topbar";

export default function Interventions() {

  const [client, setClient] =
    useState("");

  const [adresse, setAdresse] =
    useState("");

  const [travaux, setTravaux] =
    useState("");

  const [interventions,
    setInterventions] =
    useState([]);

  async function chargerInterventions() {

    const querySnapshot =
      await getDocs(
        collection(
          db,
          "interventions"
        )
      );

    const liste = [];

    querySnapshot.forEach((docItem) => {

      liste.push({
        id: docItem.id,
        ...docItem.data(),
      });

    });

    setInterventions(liste);

  }

  useEffect(() => {

    chargerInterventions();

  }, []);

  async function ajouterIntervention(e) {

    e.preventDefault();

    try {

      await addDoc(
        collection(
          db,
          "interventions"
        ),
        {
          client,
          adresse,
          travaux,
        }
      );

      alert(
        "Intervention ajoutée"
      );

      setClient("");
      setAdresse("");
      setTravaux("");

      chargerInterventions();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }

  async function supprimerIntervention(id) {

    await deleteDoc(
      doc(
        db,
        "interventions",
        id
      )
    );

    chargerInterventions();

  }

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <Topbar title="Interventions" />

      <form
        onSubmit={ajouterIntervention}
        className="bg-white p-6 rounded-2xl shadow mb-8"
      >

        <input
          type="text"
          placeholder="Client"
          value={client}
          onChange={(e) =>
            setClient(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full mb-4"
        />

        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) =>
            setAdresse(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full mb-4"
        />

        <textarea
          placeholder="Travaux"
          value={travaux}
          onChange={(e) =>
            setTravaux(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full h-32 mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Ajouter intervention
        </button>

      </form>

      <div className="grid md:grid-cols-2 gap-6">

        {interventions.map((item) => (

          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <h2 className="text-2xl font-bold">
              {item.client}
            </h2>

            <p className="mt-2">
              {item.adresse}
            </p>

            <p className="mt-4 whitespace-pre-wrap">
              {item.travaux}
            </p>

            <button
              onClick={() =>
                supprimerIntervention(
                  item.id
                )
              }
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Supprimer
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}