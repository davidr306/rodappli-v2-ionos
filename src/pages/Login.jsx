import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  useNavigate,
} from "react-router-dom";

import { auth } from "../firebase/firebase";

export default function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function connexion(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      if (
        error.code ===
        "auth/invalid-credential"
      ) {

        alert(
          "Email ou mot de passe incorrect"
        );

      } else {

        alert(error.message);

      }

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen flex">

      <div className="hidden lg:flex w-1/2 bg-blue-700 text-white flex-col justify-center px-16">

        <h1 className="text-5xl font-bold mb-6">
          Rodappli
        </h1>

        <p className="text-xl opacity-90 leading-relaxed">

          Gestion intelligente des interventions terrain,
          rapports PDF, signatures clients et suivi technique.

        </p>

      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">

        <form
          onSubmit={connexion}
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
        >

          <h2 className="text-5xl font-bold mb-3">

            Connexion

          </h2>

          <p className="text-gray-500 mb-10">

            Connectez-vous à votre espace Rodappli

          </p>

          <div className="mb-5">

            <label className="block mb-2 font-medium">

              Adresse email

            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
              required
            />

          </div>

          <div className="mb-8">

            <label className="block mb-2 font-medium">

              Mot de passe

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-2xl font-bold text-lg"
          >

            {loading
              ? "Connexion..."
              : "Connexion"}

          </button>

          <p className="text-center text-gray-400 text-sm mt-8">

            © Rodappli — Gestion d’interventions

          </p>

        </form>

      </div>

    </div>

  );

}