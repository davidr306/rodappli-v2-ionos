import { useEffect, useRef, useState } from "react";

import { db, storage } from "../firebase/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import SignatureCanvas from "react-signature-canvas";

import Topbar from "../components/layout/Topbar";

export default function Interventions() {

  const fileInputRef =
    useRef(null);

  const signatureRef =
    useRef(null);

  const [client, setClient] =
    useState("");

  const [adresse, setAdresse] =
    useState("");

  const [travaux, setTravaux] =
    useState("");

  const [technicien,
    setTechnicien] =
    useState("");

  const [statut,
    setStatut] =
    useState("");

  const [dateIntervention,
    setDateIntervention] =
    useState("");

  const [photo, setPhoto] =
    useState(null);

  const [interventions,
    setInterventions] =
    useState([]);

  const [modeEdition,
    setModeEdition] =
    useState(false);

  const [interventionId,
    setInterventionId] =
    useState(null);

  const [recherche,
    setRecherche] =
    useState("");

  const [filtreStatut,
    setFiltreStatut] =
    useState("");

  async function chargerInterventions() {

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

    try {

      if (!photo) {
        return "";
      }

      const storageRef = ref(
        storage,
        `interventions/${Date.now()}-${photo.name}`
      );

      await uploadBytes(
        storageRef,
        photo
      );

      return await getDownloadURL(
        storageRef
      );

    } catch (error) {

      console.error(error);

      return "";

    }

  }

  function supprimerPhoto() {

    setPhoto(null);

    if (fileInputRef.current) {

      fileInputRef.current.value =
        "";

    }

  }

  function viderFormulaire() {

    setClient("");
    setAdresse("");
    setTravaux("");
    setTechnicien("");
    setStatut("");
    setDateIntervention("");

    supprimerPhoto();

    setModeEdition(false);

    setInterventionId(null);

    try {

      signatureRef.current?.clear();

    } catch (error) {

      console.error(error);

    }

  }

  async function ajouterIntervention(e) {

    e.preventDefault();

    try {

      let photoUrl = "";

      try {

        photoUrl =
          await uploadPhoto();

      } catch (error) {

        console.error(error);

      }

      let signatureClient = "";

      try {

        if (
          signatureRef.current &&
          !signatureRef.current.isEmpty()
        ) {

          signatureClient =
            signatureRef.current
              .getCanvas()
              .toDataURL(
                "image/png"
              );

        }

      } catch (error) {

        console.error(error);

      }

      const data = {

        client:
          client || "",

        adresse:
          adresse || "",

        travaux:
          travaux || "",

        technicien:
          technicien || "",

        statut:
          statut || "",

        dateIntervention:
          dateIntervention || "",

        photoUrl:
          photoUrl || "",

        signatureClient:
          signatureClient || "",

      };

      if (modeEdition) {

        await updateDoc(

          doc(
            db,
            "interventions",
            interventionId
          ),

          data

        );

        alert(
          "Intervention modifiée"
        );

      } else {

        await addDoc(

          collection(
            db,
            "interventions"
          ),

          data

        );

        alert(
          "Intervention ajoutée"
        );

      }

      viderFormulaire();

      await chargerInterventions();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }

  function modifierIntervention(item) {

    setModeEdition(true);

    setInterventionId(item.id);

    setClient(item.client || "");
    setAdresse(item.adresse || "");
    setTravaux(item.travaux || "");
    setTechnicien(
      item.technicien || ""
    );

    setStatut(
      item.statut || ""
    );

    setDateIntervention(
      item.dateIntervention || ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  async function supprimerIntervention(id) {

    const confirmation =
      window.confirm(
        "Supprimer cette intervention ?"
      );

    if (!confirmation) {
      return;
    }

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

        <h2 className="text-2xl font-bold mb-6">

          {modeEdition
            ? "Modifier intervention"
            : "Nouvelle intervention"}

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Client"
            value={client}
            onChange={(e) =>
              setClient(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
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
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Technicien"
            value={technicien}
            onChange={(e) =>
              setTechnicien(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="date"
            value={dateIntervention}
            onChange={(e) =>
              setDateIntervention(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          />

        </div>

        <textarea
          placeholder="Travail effectué"
          value={travaux}
          onChange={(e) =>
            setTravaux(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full h-32 mt-4"
        />

        <select
          value={statut}
          onChange={(e) =>
            setStatut(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full mt-4"
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
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {

              const fichier =
                e.target.files?.[0];

              setPhoto(
                fichier || null
              );

            }}
            className="border p-3 rounded-xl w-full"
          />

          {photo && (

            <div className="mt-4 bg-gray-100 rounded-xl p-4 flex items-center justify-between">

              <p className="text-sm">

                {photo.name}

              </p>

              <button
                type="button"
                onClick={
                  supprimerPhoto
                }
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Supprimer
              </button>

            </div>

          )}

        </div>

        {/* SIGNATURE */}

        <div className="mt-6">

          <p className="font-semibold mb-2">
            Signature client
          </p>

          <div className="border rounded-xl inline-block overflow-hidden bg-white">

            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 350,
                height: 100,
                className: "border",
              }}
            />

          </div>

          <div>

            <button
              type="button"
              onClick={() =>
                signatureRef.current?.clear()
              }
              className="mt-3 bg-gray-500 text-white px-4 py-2 rounded-xl"
            >
              Effacer signature
            </button>

          </div>

        </div>

        <div className="flex gap-4 mt-6">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >

            {modeEdition
              ? "Sauvegarder"
              : "Ajouter intervention"}

          </button>

          {modeEdition && (

            <button
              type="button"
              onClick={viderFormulaire}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl"
            >
              Annuler
            </button>

          )}

        </div>

      </form>

      {/* RECHERCHE */}

      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Recherche
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Rechercher client ou adresse"
            value={recherche}
            onChange={(e) =>
              setRecherche(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          />

          <select
            value={filtreStatut}
            onChange={(e) =>
              setFiltreStatut(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          >

            <option value="">
              Tous les statuts
            </option>

            <option value="En cours">
              En cours
            </option>

            <option value="Terminée">
              Terminée
            </option>

          </select>

        </div>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {interventions

          .filter((item) => {

            const matchRecherche =

              item.client
                ?.toLowerCase()
                .includes(
                  recherche.toLowerCase()
                ) ||

              item.adresse
                ?.toLowerCase()
                .includes(
                  recherche.toLowerCase()
                );

            const matchStatut =

              filtreStatut === "" ||

              item.statut ===
                filtreStatut;

            return (
              matchRecherche &&
              matchStatut
            );

          })

          .map((item) => (

            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              {item.photoUrl && (

                <img
                  src={item.photoUrl}
                  alt="intervention"
                  className="w-full h-52 object-cover rounded-2xl mb-4"
                />

              )}

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

              <p className="mt-4">
                <strong>Statut :</strong>{" "}
                {item.statut}
              </p>

              <p className="mt-4 whitespace-pre-wrap">
                {item.travaux}
              </p>

              {item.signatureClient && (

                <div className="mt-4">

                  <p className="font-semibold mb-2">
                    Signature client
                  </p>

                  <img
                    src={item.signatureClient}
                    alt="signature"
                    className="border rounded-xl bg-white"
                  />

                </div>

              )}

              <div className="flex gap-3 mt-6">

                <button
                  type="button"
                  onClick={() =>
                    modifierIntervention(
                      item
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                >
                  Modifier
                </button>

                <button
                  type="button"
                  onClick={() =>
                    supprimerIntervention(
                      item.id
                    )
                  }
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