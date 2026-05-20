import { useEffect, useRef, useState } from "react";

import { db } from "../firebase/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import SignatureCanvas from "react-signature-canvas";

import Topbar from "../components/layout/Topbar";

import { generatePDF }
from "../utils/generatePDF";

export default function Interventions() {

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

  function viderFormulaire() {

    setClient("");
    setAdresse("");
    setTravaux("");
    setTechnicien("");
    setStatut("");
    setDateIntervention("");

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

      let signatureClient = "";

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

      const data = {

        client,
        adresse,
        travaux,
        technicien,
        statut,
        dateIntervention,
        signatureClient,

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

      chargerInterventions();

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

    <div className="min-h-screen bg-gray-100 p-3 md:p-8">

      <Topbar title="Interventions" />

      {/* FORMULAIRE */}

      <form
        onSubmit={ajouterIntervention}
        className="bg-white rounded-3xl shadow-lg p-4 md:p-8 mb-6"
      >

        <h2 className="text-2xl md:text-3xl font-bold mb-6">

          {modeEdition
            ? "Modifier intervention"
            : "Nouvelle intervention"}

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Client"
            value={client}
            onChange={(e) =>
              setClient(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl text-base"
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
            className="border p-4 rounded-2xl text-base"
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
            className="border p-4 rounded-2xl text-base"
          />

          <input
            type="date"
            value={dateIntervention}
            onChange={(e) =>
              setDateIntervention(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl text-base"
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
          className="border p-4 rounded-2xl w-full h-32 mt-4 text-base"
        />

        <select
          value={statut}
          onChange={(e) =>
            setStatut(
              e.target.value
            )
          }
          className="border p-4 rounded-2xl w-full mt-4 text-base"
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

        {/* SIGNATURE */}

        <div className="mt-6">

          <p className="font-semibold mb-3 text-lg">
            Signature client
          </p>

          <div className="bg-white border rounded-2xl overflow-hidden w-full max-w-full">

            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 320,
                height: 120,
                className: "w-full",
              }}
            />

          </div>

          <button
            type="button"
            onClick={() =>
              signatureRef.current?.clear()
            }
            className="mt-4 bg-gray-500 text-white px-5 py-3 rounded-2xl text-sm md:text-base"
          >
            Effacer signature
          </button>

        </div>

        {/* BOUTONS */}

        <div className="flex flex-col md:flex-row gap-4 mt-8">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl text-base md:text-lg font-semibold w-full md:w-auto"
          >

            {modeEdition
              ? "Sauvegarder"
              : "Ajouter intervention"}

          </button>

          {modeEdition && (

            <button
              type="button"
              onClick={viderFormulaire}
              className="bg-gray-500 text-white px-6 py-4 rounded-2xl text-base md:text-lg font-semibold w-full md:w-auto"
            >
              Annuler
            </button>

          )}

        </div>

      </form>

      {/* RECHERCHE */}

      <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 mb-6">

        <h2 className="text-2xl font-bold mb-5">

          Recherche

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Rechercher client ou adresse"
            value={recherche}
            onChange={(e) =>
              setRecherche(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
          />

          <select
            value={filtreStatut}
            onChange={(e) =>
              setFiltreStatut(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
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

      {/* CARTES */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

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
              className="bg-white rounded-3xl shadow-lg p-5"
            >

              <h2 className="text-2xl font-bold break-words">

                {item.client}

              </h2>

              <p className="text-gray-500 mt-2 break-words">

                {item.adresse}

              </p>

              <div className="mt-5 space-y-2 text-sm md:text-base">

                <p>
                  <strong>
                    Technicien :
                  </strong>{" "}
                  {item.technicien}
                </p>

                <p>
                  <strong>
                    Date :
                  </strong>{" "}
                  {item.dateIntervention}
                </p>

                <p>
                  <strong>
                    Statut :
                  </strong>{" "}
                  {item.statut}
                </p>

              </div>

              <p className="mt-5 whitespace-pre-wrap text-sm md:text-base">

                {item.travaux}

              </p>

              {item.signatureClient && (

                <div className="mt-5">

                  <p className="font-semibold mb-2">

                    Signature client

                  </p>

                  <img
                    src={item.signatureClient}
                    alt="signature"
                    className="border rounded-2xl bg-white w-full"
                  />

                </div>

              )}

              <div className="flex flex-col md:flex-row gap-3 mt-6">

                <button
                  type="button"
                  onClick={() =>
                    generatePDF(item)
                  }
                  className="bg-green-600 text-white px-4 py-3 rounded-2xl w-full"
                >
                  PDF
                </button>

                <button
                  type="button"
                  onClick={() =>
                    modifierIntervention(
                      item
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-3 rounded-2xl w-full"
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
                  className="bg-red-600 text-white px-4 py-3 rounded-2xl w-full"
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