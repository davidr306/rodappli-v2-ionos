import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";

import format
from "date-fns/format";

import parse
from "date-fns/parse";

import startOfWeek
from "date-fns/startOfWeek";

import getDay
from "date-fns/getDay";

import frFR
from "date-fns/locale/fr";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

import Topbar from "../components/layout/Topbar";

const locales = {
  fr: frFR,
};

const localizer =
  dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

export default function Planning() {

  const [events, setEvents] =
    useState([]);

  useEffect(() => {

    chargerPlanning();

  }, []);

  async function chargerPlanning() {

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
          !data.dateIntervention
        ) {
          return;
        }

        const date =
          new Date(
            data.dateIntervention
          );

        liste.push({

          id: docItem.id,

          title:
            `${data.client} - ${data.statut}`,

          start: date,

          end: date,

          allDay: true,

          statut:
            data.statut || "",

        });

      });

      setEvents(liste);

    } catch (error) {

      console.error(error);

    }

  }

  function eventStyleGetter(
    event
  ) {

    let backgroundColor =
      "#2563eb";

    if (
      event.statut ===
      "Terminée"
    ) {

      backgroundColor =
        "#16a34a";

    }

    if (
      event.statut ===
      "En cours"
    ) {

      backgroundColor =
        "#f59e0b";

    }

    return {

      style: {

        backgroundColor,

        borderRadius: "12px",

        border: "none",

        color: "white",

        padding: "4px",

      },

    };

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <Topbar title="Planning" />

      <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">

        <div className="h-[75vh]">

          <Calendar

            localizer={localizer}

            events={events}

            startAccessor="start"

            endAccessor="end"

            culture="fr"

            messages={{

              today: "Aujourd'hui",

              previous: "Précédent",

              next: "Suivant",

              month: "Mois",

              week: "Semaine",

              day: "Jour",

              agenda: "Agenda",

            }}

            eventPropGetter={
              eventStyleGetter
            }

          />

        </div>

      </div>

    </div>

  );

}