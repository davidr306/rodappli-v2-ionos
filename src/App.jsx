import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "./firebase/firebase";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Interventions from "./pages/Interventions";

function PrivateRoute({ children }) {

  const [user, setUser] = useState(undefined);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

        }
      );

    return () => unsubscribe();

  }, []);

  if (user === undefined) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Chargement...

      </div>

    );

  }

  return user
    ? children
    : <Navigate to="/login" />;

}

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/interventions"
          element={
            <PrivateRoute>
              <Interventions />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}