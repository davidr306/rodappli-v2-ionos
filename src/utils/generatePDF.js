import jsPDF from "jspdf";

export async function generatePDF(
  intervention
) {

  const pdf = new jsPDF();

  pdf.setFontSize(22);

  pdf.text(
    "RAPPORT D'INTERVENTION",
    20,
    20
  );

  pdf.setFontSize(12);

  pdf.text(
    `Client : ${intervention.client}`,
    20,
    40
  );

  pdf.text(
    `Adresse : ${intervention.adresse}`,
    20,
    50
  );

  pdf.text(
    `Technicien : ${intervention.technicien}`,
    20,
    60
  );

  pdf.text(
    `Date : ${intervention.dateIntervention}`,
    20,
    70
  );

  pdf.text(
    `Statut : ${intervention.statut}`,
    20,
    80
  );

  pdf.text(
    "Travaux effectués :",
    20,
    100
  );

  const texte =
    pdf.splitTextToSize(
      intervention.travaux || "",
      170
    );

  pdf.text(
    texte,
    20,
    110
  );

  let currentY = 140;

  // PHOTO

  if (intervention.photoUrl) {

    try {

      const response =
        await fetch(
          intervention.photoUrl
        );

      const blob =
        await response.blob();

      const reader =
        new FileReader();

      const base64 =
        await new Promise(
          (resolve) => {

            reader.onloadend =
              () =>
                resolve(
                  reader.result
                );

            reader.readAsDataURL(
              blob
            );

          }
        );

      pdf.text(
        "Photo intervention :",
        20,
        currentY
      );

      pdf.addImage(
        base64,
        "JPEG",
        20,
        currentY + 10,
        80,
        60
      );

      currentY += 80;

    } catch (error) {

      console.error(error);

    }

  }

  // SIGNATURE

  if (
    intervention.signatureClient
  ) {

    pdf.text(
      "Signature client :",
      20,
      currentY
    );

    pdf.addImage(
      intervention.signatureClient,
      "PNG",
      20,
      currentY + 10,
      80,
      30
    );

  }

  pdf.save(
    `intervention-${intervention.client}.pdf`
  );

}