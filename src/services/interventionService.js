import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

const interventionsCollection = collection(db, "interventions");

export async function createIntervention(data) {
  await addDoc(interventionsCollection, data);
}

export async function getInterventions() {
  const snapshot = await getDocs(interventionsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}