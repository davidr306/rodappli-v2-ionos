import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhn5DVTzvEKUBnHaciqNwnxspd6j6jvyc",
  authDomain: "rodappli.firebaseapp.com",
  projectId: "rodappli",
  storageBucket: "rodappli.appspot.com",
  messagingSenderId: "851960384600",
  appId: "1:851960384600:web:f14f2768eb10919e8f4e2d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


export const auth = getAuth(app);