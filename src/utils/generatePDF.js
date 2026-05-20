import jsPDF from "jspdf";

import logo from "../assets/logo.png";

export async function generatePDF(
  intervention
) {

  try {

    const pdf = new jsPDF();

    // FOND HEADER

    pdf.setFillColor(
      17,
      24,
      39
    );

    pdf.rect(
      0,
      0,
      210,
      35,
      "F"
    );

    // LOGO

    try {

      pdf.addImage(
        logo,
        "PNG",
        15,
        7,
        22,
        22
      );

    } catch (error) {

      console.error(error);

    }

    // TITRE

    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFontSize(24);

    pdf.text(
      "RAPPORT D'INTERVENTION",
      50,
      22
    );

    // RESET COULEUR

    pdf.setTextColor(
      0,
      0,
      0
    );

    // CARTE INFOS

    pdf.setFillColor(
      245,
      245,
      245
    );

    pdf.roundedRect(
      15,
      45,
      180,
      55,
      4,
      4,
      "F"
    );

    pdf.setFontSize(12);

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      "Client :",
      22,
      58
    );

    pdf.text(
      "Adresse :",
      22,
      70
    );

    pdf.text(
      "Technicien :",
      22,
      82
    );

    pdf.text(
      "Date :",
      22,
      94
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.text(
      intervention.client || "",
      60,
      58
    );

    pdf.text(
      intervention.adresse || "",
      60,
      70
    );

    pdf.text(
      intervention.technicien || "",
      60,
      82
    );

    pdf.text(
      intervention.dateIntervention || "",
      60,
      94
    );

    // STATUT

    pdf.setFillColor(
      37,
      99,
      235
    );

    pdf.roundedRect(
      140,
      108,
      55,
      12,
      3,
      3,
      "F"
    );

    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFontSize(11);

    pdf.text(
      intervention.statut || "",
      158,
      116,
      {
        align: "center",
      }
    );

    pdf.setTextColor(
      0,
      0,
      0
    );

    // TRAVAUX

    pdf.setFontSize(16);

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      "Travaux effectués",
      20,
      140
    );

    pdf.setFontSize(12);

    pdf.setFont(
      "helvetica",
      "normal"
    );

    const texte =
      pdf.splitTextToSize(
        intervention.travaux || "",
        170
      );

    pdf.text(
      texte,
      20,
      152
    );

    // SIGNATURE

    if (
      intervention.signatureClient
    ) {

      pdf.setFontSize(16);

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.text(
        "Signature client",
        20,
        230
      );

      pdf.addImage(
        intervention.signatureClient,
        "PNG",
        20,
        240,
        70,
        25
      );

    }

    // FOOTER

    pdf.setDrawColor(
      220,
      220,
      220
    );

    pdf.line(
      15,
      280,
      195,
      280
    );

    pdf.setFontSize(10);

    pdf.setTextColor(
      120,
      120,
      120
    );

    pdf.text(
      "Rodatherm • Rapport généré par Rodappli",
      20,
      287
    );

    pdf.save(
      `intervention-${intervention.client || "client"}.pdf`
    );

  } catch (error) {

    console.error(error);

    alert(
      "Erreur génération PDF"
    );

  }

}