import {
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import {
  useParams,
} from "react-router-dom";

import {
  db,
} from "../firebase/firebase";

import Topbar from "../components/layout/Topbar";

export default function ClientDetail() {

  const { id } =
    useParams();

  const [
    client,
    setClient,
  ] = useState(null);

  const [
    interventions,
    setInterventions,
  ] = useState([]);

  useEffect(() => {

    chargerClient();

  }, [id]);

  async function chargerClient() {

    try {

      const ref =
        doc(
          db,
          "clients",
          id
        );

      const snapshot =
        await getDoc(ref);

      if (
        snapshot.exists()
      ) {

        const clientData = {
          id:
            snapshot.id,
          ...snapshot.data(),
        };

        setClient(
          clientData
        );

        await chargerInterventions(
          clientData.nom
        );

      }

    } catch (error) {

      console.error(error);

    }

  }

  async function chargerInterventions(
    nomClient
  ) {

    try {

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "interventions"
          )
        );

      const liste = [];

      querySnapshot.forEach((docItem) => {

        const data =
          docItem.data();

        if (
          data.client ===
          nomClient
        ) {

          liste.push({
            id:
              docItem.id,
            ...data,
          });

        }

      });

      setInterventions(
        liste
      );

    } catch (error) {

      console.error(error);

    }

  }

  if (!client) {

    return (

      <div className="p-8">

        Chargement...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <Topbar title="Fiche Client" />

      {/* INFOS CLIENT */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        {client.entreprise && (

          <p className="text-blue-600 font-semibold text-lg mb-3">

            {client.entreprise}

          </p>

        )}

        <h1 className="text-4xl font-bold mb-6">

          {client.nom}

        </h1>

        <div className="space-y-4 text-lg">

          <p>

            📞 {client.telephone}

          </p>

          <p>

            ✉️ {client.email}

          </p>

          <p>

            📍 {client.adresse}

          </p>

        </div>

      </div>

      {/* HISTORIQUE */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-6">

        <h2 className="text-2xl font-bold mb-6">

          Historique interventions
          ({interventions.length})

        </h2>

        {interventions.length === 0 ? (

          <p className="text-gray-500">

            Aucune intervention

          </p>

        ) : (

          <div className="space-y-4">

            {interventions.map((item) => (

              <div
                key={item.id}
                className="border rounded-2xl p-4"
              >

                <p>

                  <strong>Date :</strong>{" "}
                  {item.dateIntervention}

                </p>

                <p>

                  <strong>Technicien :</strong>{" "}
                  {item.technicien}

                </p>

                <p>

                  <strong>Statut :</strong>{" "}
                  {item.statut}

                </p>

                <p className="mt-2">

                  <strong>Travaux :</strong>{" "}
                  {item.travaux}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}