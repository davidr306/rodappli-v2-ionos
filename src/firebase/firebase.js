import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhn5DVTzvEKUBnHaciqNwnxspd6j6jvyc",
  authDomain: "rodappli.firebaseapp.com",
  projectId: "rodappli",
  storageBucket: "rodappli.firebasestorage.app",
  messagingSenderId: "851960384600",
  appId: "1:851960384600:web:f14f2768eb10919e8f4e2d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);