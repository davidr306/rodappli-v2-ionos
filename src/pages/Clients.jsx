import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import {
  useNavigate,
} from "react-router-dom";

import {
  db,
} from "../firebase/firebase";

import Topbar from "../components/layout/Topbar";

export default function Clients() {

  const navigate =
    useNavigate();

  const [
    clients,
    setClients,
  ] = useState([]);

  const [
    entreprise,
    setEntreprise,
  ] = useState("");

  const [
    nom,
    setNom,
  ] = useState("");

  const [
    telephone,
    setTelephone,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    adresse,
    setAdresse,
  ] = useState("");

  useEffect(() => {

    chargerClients();

  }, []);

  async function chargerClients() {

    try {

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "clients"
          )
        );

      const liste = [];

      querySnapshot.forEach((docItem) => {

        liste.push({
          id: docItem.id,
          ...docItem.data(),
        });

      });

      setClients(liste);

    } catch (error) {

      console.error(error);

    }

  }

  async function ajouterClient(e) {

    e.preventDefault();

    try {

      await addDoc(
        collection(db, "clients"),
        {
          entreprise,
          nom,
          telephone,
          email,
          adresse,
          createdAt:
            new Date(),
        }
      );

      setEntreprise("");
      setNom("");
      setTelephone("");
      setEmail("");
      setAdresse("");

      chargerClients();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <Topbar title="Clients" />

      {/* FORMULAIRE */}

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">

          Ajouter un client

        </h2>

        <form
          onSubmit={ajouterClient}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            placeholder="Entreprise"
            value={entreprise}
            onChange={(e) =>
              setEntreprise(
                e.target.value
              )
            }
            className="p-4 rounded-2xl border"
          />

          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) =>
              setNom(e.target.value)
            }
            className="p-4 rounded-2xl border"
            required
          />

          <input
            type="text"
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) =>
              setTelephone(
                e.target.value
              )
            }
            className="p-4 rounded-2xl border"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="p-4 rounded-2xl border"
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
            className="p-4 rounded-2xl border md:col-span-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-2xl shadow md:col-span-2"
          >

            Ajouter le client

          </button>

        </form>

      </div>

      {/* LISTE CLIENTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {clients.map((client) => (

          <div
            key={client.id}
            onClick={() =>
              navigate(`/clients/${client.id}`)
            }
            className="bg-white rounded-3xl shadow-lg p-6 cursor-pointer hover:scale-105 transition"
          >

            {client.entreprise && (

              <p className="text-blue-600 font-semibold mb-2">

                {client.entreprise}

              </p>

            )}

            <h2 className="text-2xl font-bold mb-3">

              {client.nom}

            </h2>

            <p className="text-gray-600">

              📞 {client.telephone}

            </p>

            <p className="text-gray-600 mt-2">

              ✉️ {client.email}

            </p>

            <p className="text-gray-600 mt-2">

              📍 {client.adresse}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}