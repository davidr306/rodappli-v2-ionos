import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getDashboardStats() {
  const interventionsSnap = await getDocs(
    collection(db, "interventions")
  );

  const clientsSnap = await getDocs(
    collection(db, "clients")
  );

  const facturesSnap = await getDocs(
    collection(db, "factures")
  );

  return {
    interventions: interventionsSnap.size,
    clients: clientsSnap.size,
    factures: facturesSnap.size,
  };
}