import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhn5DVTzvEKUBnHaciqNwnxspd6j6jvyc",
  authDomain: "rodappli.firebaseapp.com",
  projectId: "rodappli",
  storageBucket: "rodappli.firebasestorage.app",
  messagingSenderId: "851960384600",
  appId: "1:851960384600:web:f14f2768eb10919e8f4e2d"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;