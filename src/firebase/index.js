import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TA_CLE_API",
  authDomain: "TON_DOMAINE",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_STORAGE_BUCKET",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };