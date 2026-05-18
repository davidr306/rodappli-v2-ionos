import jsPDF from "jspdf";

export function generatePDF(intervention) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Bon d’intervention", 20, 20);

  doc.setFontSize(14);

  doc.text(
    `Client : ${intervention.client}`,
    20,
    50
  );

  doc.text(
    `Description : ${intervention.description}`,
    20,
    70
  );

  doc.text(
    `Date : ${new Date().toLocaleDateString()}`,
    20,
    90
  );

  doc.save(
    `intervention-${intervention.client}.pdf`
  );
}