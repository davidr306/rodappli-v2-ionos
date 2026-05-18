import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getDashboardStats() {

  const interventionsSnapshot = await getDocs(
    collection(db, "interventions")
  );

  const clientsSnapshot = await getDocs(
    collection(db, "clients")
  );

  const pending = interventionsSnapshot.docs.filter(
    (doc) => doc.data().status === "pending"
  );

  return {
    interventions: interventionsSnapshot.size,
    clients: clientsSnapshot.size,
    pending: pending.length,
  };
}