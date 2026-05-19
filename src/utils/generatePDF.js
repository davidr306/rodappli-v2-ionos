import jsPDF from "jspdf";

export async function generatePDF(intervention) {

  try {

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");

    doc.setFontSize(22);

    doc.text(

      "BON D’INTERVENTION",

      20,

      20

    );

    doc.line(

      20,

      25,

      190,

      25

    );

    doc.setFont("helvetica", "normal");

    doc.setFontSize(13);

    doc.text(

      `Client : ${intervention.client || ""}`,

      20,

      45

    );

    doc.text(

      `Adresse : ${intervention.adresse || ""}`,

      20,

      60

    );

    doc.text(

      `Technicien : ${intervention.technicien || ""}`,

      20,

      75

    );

    doc.text(

      `Date : ${intervention.dateIntervention || ""}`,

      20,

      90

    );

    doc.text(

      `Statut : ${intervention.statut || ""}`,

      20,

      105

    );

    doc.setFont("helvetica", "bold");

    doc.text(

      "Travail effectué :",

      20,

      125

    );

    doc.setFont("helvetica", "normal");

    const texteTravaux =

      doc.splitTextToSize(

        intervention.travaux || "",

        160

      );

    doc.text(

      texteTravaux,

      20,

      140

    );

    /* PHOTO */

    if (intervention.photoUrl) {

      try {

        const response =

          await fetch(intervention.photoUrl);

        const blob =

          await response.blob();

        const reader =

          new FileReader();

        const imageBase64 =

          await new Promise((resolve) => {

            reader.onloadend = () =>

              resolve(reader.result);

            reader.readAsDataURL(blob);

          });

        doc.setFont(

          "helvetica",

          "bold"

        );

        doc.text(

          "Photo intervention :",

          20,

          190

        );

        doc.addImage(

          imageBase64,

          "JPEG",

          20,

          200,

          80,

          60

        );

      } catch (error) {

        console.error(

          "Erreur image PDF :",

          error

        );

      }

    }

    /* SIGNATURE */

    doc.line(

      20,

      280,

      90,

      280

    );

    doc.line(

      120,

      280,

      190,

      280

    );

    doc.text(

      "Signature technicien",

      20,

      290

    );

    doc.text(

      "Signature client",

      120,

      290

    );

    if (

      intervention.signatureClient &&

      intervention.signatureClient.startsWith("data:image")

    ) {

      try {

        doc.addImage(

          intervention.signatureClient,

          "PNG",

          120,

          240,

          60,

          30

        );

      } catch (error) {

        console.error(error);

      }

    }

    doc.save(

      `intervention-${intervention.client || "document"}.pdf`

    );

  } catch (error) {

    console.error(error);

    alert("Erreur génération PDF");

  }

}
