import jsPDF from "jspdf";

export function generatePDF(intervention, signatureBase64) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("BON D'INTERVENTION", 20, 20);

  doc.setFontSize(12);
  doc.text(`Client: ${intervention.client}`, 20, 40);
  doc.text(`Adresse: ${intervention.adresse}`, 20, 50);
  doc.text(`Travaux: ${intervention.travaux}`, 20, 60);

  doc.text("Signature client :", 20, 90);

  if (signatureBase64) {
    doc.addImage(signatureBase64, "PNG", 20, 100, 150, 60);
  }

  doc.save(`intervention_${intervention.client}.pdf`);
}