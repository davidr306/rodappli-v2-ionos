import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

import Topbar
from "../components/layout/Topbar";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {

  const [
    interventions,
    setInterventions,
  ] = useState([]);

  useEffect(() => {

    chargerDonnees();

  }, []);

  async function chargerDonnees() {

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

  // STATS

  const totalInterventions =
    interventions.length;

  const interventionsTerminees =
    interventions.filter(
      (item) =>
        item.statut ===
        "Terminée"
    ).length;

  const interventionsEnCours =
    interventions.filter(
      (item) =>
        item.statut ===
        "En cours"
    ).length;

  // CA ESTIMÉ

  const caEstime =
    totalInterventions * 150;

  // INTERVENTIONS DU MOIS

  const moisActuel =
    new Date().getMonth();

  const interventionsDuMois =
    interventions.filter(
      (item) => {

        if (
          !item.dateIntervention
        ) {
          return false;
        }

        const date =
          new Date(
            item.dateIntervention
          );

        return (
          date.getMonth() ===
          moisActuel
        );

      }
    ).length;

  // DATA GRAPHIQUE

  const dataGraphique = [

    {
      name: "Total",
      valeur:
        totalInterventions,
    },

    {
      name: "Terminées",
      valeur:
        interventionsTerminees,
    },

    {
      name: "En cours",
      valeur:
        interventionsEnCours,
    },

    {
      name: "Mois",
      valeur:
        interventionsDuMois,
    },

  ];

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <Topbar title="Dashboard" />

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500">
            Interventions
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {totalInterventions}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500">
            Terminées
          </p>

          <h2 className="text-4xl font-bold mt-3 text-green-600">
            {interventionsTerminees}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500">
            En cours
          </p>

          <h2 className="text-4xl font-bold mt-3 text-yellow-500">
            {interventionsEnCours}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500">
            CA estimé
          </p>

          <h2 className="text-4xl font-bold mt-3 text-blue-600">
            {caEstime} €
          </h2>

        </div>

      </div>

      {/* GRAPH */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">

          Statistiques

        </h2>

        <div className="w-full h-[350px]">

          <ResponsiveContainer>

            <BarChart
              data={dataGraphique}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="valeur"
                radius={[12, 12, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}