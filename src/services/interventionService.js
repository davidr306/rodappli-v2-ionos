import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getNextInterventionNumber() {

  const counterRef = doc(
    db,
    "counters",
    "interventions"
  );

  const counterSnap = await getDoc(counterRef);

  // première intervention
  if (!counterSnap.exists()) {

    await setDoc(counterRef, {
      lastNumber: 1,
    });

    return "BI-2026-0001";
  }

  // incrémentation
  const lastNumber =
    counterSnap.data().lastNumber + 1;

  await updateDoc(counterRef, {
    lastNumber: lastNumber,
  });

  // format 0001
  const padded = String(lastNumber).padStart(
    4,
    "0"
  );

  return `BI-2026-${padded}`;
}