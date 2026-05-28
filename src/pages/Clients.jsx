import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
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

  const [
    modeEdition,
    setModeEdition,
  ] = useState(false);

  const [
    clientId,
    setClientId,
  ] = useState(null);

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

      if (modeEdition) {

        await updateDoc(

          doc(
            db,
            "clients",
            clientId
          ),

          {
            entreprise,
            nom,
            telephone,
            email,
            adresse,
          }

        );

        alert(
          "Client modifié"
        );

      } else {

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

        alert(
          "Client ajouté"
        );

      }

      setEntreprise("");
      setNom("");
      setTelephone("");
      setEmail("");
      setAdresse("");

      setModeEdition(false);

      setClientId(null);

      chargerClients();

    } catch (error) {

      console.error(error);

    }

  }

  function modifierClient(client) {

    setModeEdition(true);

    setClientId(client.id);

    setEntreprise(
      client.entreprise || ""
    );

    setNom(
      client.nom || ""
    );

    setTelephone(
      client.telephone || ""
    );

    setEmail(
      client.email || ""
    );

    setAdresse(
      client.adresse || ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <Topbar title="Clients" />

      {/* FORMULAIRE */}

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">

          {modeEdition
            ? "Modifier un client"
            : "Ajouter un client"}

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
              setNom(
                e.target.value
              )
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
              setEmail(
                e.target.value
              )
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

            {modeEdition
              ? "Sauvegarder"
              : "Ajouter le client"}

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

            <button
              type="button"
              onClick={(e) => {

                e.stopPropagation();

                modifierClient(client);

              }}
              className="mt-5 bg-yellow-500 text-white px-4 py-3 rounded-2xl w-full"
            >

              Modifier

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}