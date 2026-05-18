import jsPDF from "jspdf";

export function generatePDF(intervention) {

  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");

  doc.setFontSize(22);

  doc.text(
    "BON D’INTERVENTION",
    20,
    20
  );

  doc.setLineWidth(0.5);

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
    130
  );

  doc.setFont("helvetica", "normal");

  const texteTravaux = doc.splitTextToSize(
    intervention.travaux || "",
    160
  );

  doc.text(
    texteTravaux,
    20,
    145
  );

  doc.setLineWidth(0.3);

  doc.line(
    20,
    240,
    90,
    240
  );

  doc.line(
    120,
    240,
    190,
    240
  );

  doc.text(
    "Signature technicien",
    20,
    250
  );

  doc.text(
    "Signature client",
    120,
    250
  );

  if (intervention.signatureClient) {

    doc.addImage(
      intervention.signatureClient,
      "PNG",
      120,
      200,
      60,
      30
    );

  }

  doc.save(
    `intervention-${intervention.client}.pdf`
  );

}