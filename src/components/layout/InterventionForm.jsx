import { useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import SignaturePad from "../SignaturePad";

import { generateAndUploadPDF } from "../../utils/uploadPDF";
import { getNextInterventionNumber } from "../../services/interventionService";

export default function InterventionForm() {
  const [client, setClient] = useState("");
  const [adresse, setAdresse] = useState("");
  const [travaux, setTravaux] = useState("");
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // numéro auto
      const numero = await getNextInterventionNumber();

      const intervention = {
        numero,
        client,
        adresse,
        travaux,
        createdAt: new Date(),
      };

      // save firestore
      const docRef = await addDoc(
        collection(db, "interventions"),
        intervention
      );

      // génération PDF + upload storage
      const pdfURL = await generateAndUploadPDF(
        intervention,
        signature
      );

      // update doc
      await updateDoc(doc(db, "interventions", docRef.id), {
        pdfURL,
        signature,
      });

      alert("Intervention enregistrée ✅");

      setClient("");
      setAdresse("");
      setTravaux("");
      setSignature(null);

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 14,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        Nouvelle intervention
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <input
          type="text"
          placeholder="Nom du client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Description des travaux"
          value={travaux}
          onChange={(e) => setTravaux(e.target.value)}
          rows={5}
          required
          style={textareaStyle}
        />

        <div>
          <h3>Signature client</h3>

          <SignaturePad onChange={setSignature} />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: 15,
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Enregistrement..."
            : "Créer intervention"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: 14,
  borderRadius: 10,
  border: "1px solid #d1d5db",
  fontSize: 15,
};

const textareaStyle = {
  padding: 14,
  borderRadius: 10,
  border: "1px solid #d1d5db",
  fontSize: 15,
};