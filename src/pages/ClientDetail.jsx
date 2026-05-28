import {
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
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

  useEffect(() => {

    chargerClient();

  }, []);

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

        setClient({
          id:
            snapshot.id,
          ...snapshot.data(),
        });

      }

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

      <div className="bg-white rounded-3xl shadow-lg p-8">

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

    </div>

  );

}