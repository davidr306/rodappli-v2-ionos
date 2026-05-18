import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    setLoading(true);

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Email ou mot de passe incorrect");

    }

    setLoading(false);

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}

        <div className="hidden md:flex flex-col justify-center bg-blue-700 text-white p-12">

          <h1 className="text-5xl font-bold leading-tight">
            Rodappli
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-relaxed">

            Gestion professionnelle
            des interventions terrain,
            bons d’intervention,
            signatures clients
            et suivi technique.

          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-blue-600 rounded-2xl p-4">
              📄 Bons d’intervention PDF
            </div>

            <div className="bg-blue-600 rounded-2xl p-4">
              ✍️ Signature client
            </div>

            <div className="bg-blue-600 rounded-2xl p-4">
              ☁️ Sauvegarde cloud Firebase
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="p-8 md:p-14 flex flex-col justify-center">

          <div className="mb-10">

            <h2 className="text-4xl font-bold text-gray-800">
              Connexion
            </h2>

            <p className="text-gray-500 mt-3">
              Connectez-vous à votre espace Rodappli
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Adresse email
              </label>

              <input
                type="email"
                placeholder="contact@entreprise.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Mot de passe
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
            >

              {loading
                ? "Connexion..."
                : "Se connecter"}

            </button>

          </form>

          <p className="text-center text-gray-400 text-sm mt-10">
            © Rodappli — Gestion d’interventions
          </p>

        </div>

      </div>

    </div>

  );

}