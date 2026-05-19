import { useState, useEffect, useRef } from "react";

import { db, storage } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import SignatureCanvas from "react-signature-canvas";

import { generatePDF } from "../utils/generatePDF";

import Topbar from "../components/layout/Topbar";

export default function Interventions() {

  const signatureRef = useRef();

  const [client, setClient] = useState("");
  const [adresse, setAdresse] = useState("");
  const [statut, setStatut] = useState("");
  const [travaux, setTravaux] = useState("");
  const [technicien, setTechnicien] = useState("");
  const [dateIntervention, setDateIntervention] = useState("");

  const [photo, setPhoto] = useState(null);

  const [recherche, setRecherche] = useState("");

  const [modeEdition, setModeEdition] = useState(false);
  const [interventionId, setInterventionId] = useState(null);

  const [interventions, setInterventions] = useState([]);

  async function chargerInterventions() {

    try {

      const querySnapshot = await getDocs(
        collection(db, "interventions")
      );

      const liste = [];

      querySnapshot.forEach((docItem) => {

        liste.push({
          id: docItem.id,
          ...docItem.data(),
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

  async function uploadPhoto() {

    if (!photo) {
      return "";
    }

    try {

      const storageRef = ref(
        storage,
        `interventions/${Date.now()}-${photo.name}`
      );

      await uploadBytes(
        storageRef,
        photo
      );

      const url =
        await getDownloadURL(storageRef);

      return url;

    } catch (error) {

      console.error(error);

      return "";

    }

  }

  async function ajouterIntervention(e) {

    e.preventDefault();

    let signatureClient = "";

    if (
      signatureRef.current &&
      !signatureRef.current.isEmpty()
    ) {

      signatureClient =
        signatureRef.current
          .getTrimmedCanvas()
          .toDataURL("image/png");

    }

    const photoUrl =
      await uploadPhoto();

    const nouvelleIntervention = {
      client,
      adresse,
      statut,
      travaux,
      technicien,
      dateIntervention,
      signatureClient,
      photoUrl,
    };

    try {

      if (modeEdition) {

        await updateDoc(
          doc(db, "interventions", interventionId),
          nouvelleIntervention
        );

        alert("Intervention modifiée !");

      } else {

        await addDoc(
          collection(db, "interventions"),
          nouvelleIntervention
        );

        alert("Intervention ajoutée !");

      }

      await chargerInterventions();

      setClient("");
      setAdresse("");
      setStatut("");
      setTravaux("");
      setTechnicien("");
      setDateIntervention("");

      setPhoto(null);

      if (signatureRef.current) {
        signatureRef.current.clear();
      }

      setModeEdition(false);
      setInterventionId(null);

    } catch (error) {

      console.error(error);

      alert("Erreur Firebase");

    }

  }

  async function supprimerIntervention(id) {

    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette intervention ?"
    );

    if (!confirmation) {
      return;
    }

    try {

      await deleteDoc(
        doc(db, "interventions", id)
      );

      await chargerInterventions();

    } catch (error) {

      console.error(error);

    }

  }

  const interventionsFiltrees =
    interventions.filter((item) =>
      item.client
        ?.toLowerCase()
        .includes(recherche.toLowerCase())
    );

  return (

    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

      <Topbar title="Interventions" />

      <div className="mb-6">

        <input
          type="text"
          placeholder="Rechercher un client..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="border rounded-xl p-3 w-full md:w-80 bg-white"
        />

      </div>

      <form
        onSubmit={ajouterIntervention}
        className="bg-white rounded-2xl shadow p-6 mb-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

          <input
            type="text"
            placeholder="Technicien"
            value={technicien}
            onChange={(e) => setTechnicien(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="date"
            value={dateIntervention}
            onChange={(e) => setDateIntervention(e.target.value)}
            className="border rounded-xl p-3"
          />

        </div>

        <textarea
          placeholder="Travail effectué"
          value={travaux}
          onChange={(e) => setTravaux(e.target.value)}
          className="border rounded-xl p-3 w-full h-32 mt-4"
        ></textarea>

        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          className="border rounded-xl p-3 w-full mt-4"
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

        {/* PHOTO */}

        <div className="mt-6">

          <p className="font-semibold mb-2">
            Photo intervention
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPhoto(e.target.files[0])
            }
            className="border rounded-xl p-3 w-full"
          />

        </div>

        {/* SIGNATURE */}

        <div className="mt-6">

          <p className="font-semibold mb-2">
            Signature client
          </p>

          <div className="border rounded-xl bg-white overflow-hidden">

            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                className: "w-full h-40",
              }}
            />

          </div>

        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Ajouter intervention
        </button>

      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {interventionsFiltrees.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-6"
          >

            <h2 className="text-2xl font-bold">
              {item.client}
            </h2>

            <p className="text-gray-500 mt-2">
              {item.adresse}
            </p>

            <p className="mt-4">
              <strong>Technicien :</strong>{" "}
              {item.technicien}
            </p>

            <p className="mt-2">
              <strong>Date :</strong>{" "}
              {item.dateIntervention}
            </p>

            <p className="mt-4 whitespace-pre-wrap">
              {item.travaux}
            </p>

            {item.photoUrl && (

              <img
                src={item.photoUrl}
                alt="intervention"
                className="w-full h-52 object-cover rounded-2xl mt-5"
              />

            )}

            <div className="flex flex-wrap gap-3 mt-6">

              <button
                type="button"
                onClick={() => generatePDF(item)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                PDF
              </button>

              <button
                type="button"
                onClick={() => supprimerIntervention(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Supprimer
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}