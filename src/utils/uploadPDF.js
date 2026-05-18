import jsPDF from "jspdf";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "../firebase/firebase";

export async function generateAndUploadPDF(
  intervention,
  signature
) {

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "Bon d'intervention",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Numéro : ${intervention.numero}`,
    20,
    40
  );

  doc.text(
    `Client : ${intervention.client}`,
    20,
    50
  );

  doc.text(
    `Adresse : ${intervention.adresse}`,
    20,
    60
  );

  doc.text(
    `Travaux : ${intervention.travaux}`,
    20,
    80
  );

  // signature
  if (signature) {

    doc.text("Signature :", 20, 120);

    doc.addImage(
      signature,
      "PNG",
      20,
      130,
      60,
      30
    );
  }

  // génération blob
  const pdfBlob = doc.output("blob");

  // upload storage
  const fileRef = ref(
    storage,
    `interventions/${intervention.numero}.pdf`
  );

  await uploadBytes(fileRef, pdfBlob);

  // URL finale
  const url = await getDownloadURL(fileRef);

  return url;
}