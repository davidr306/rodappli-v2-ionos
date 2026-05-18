import { Link, useNavigate } from "react-router-dom";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "../firebase/firebase";

export default function Home() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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

  async function deconnexion() {

    try {

      await signOut(auth);

      navigate("/");

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <header className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-blue-600">
              Rodappli
            </h1>

            <p className="text-sm text-gray-500">
              Gestion d’interventions professionnelle
            </p>

          </div>

          {user ? (

            <button
              onClick={deconnexion}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              Déconnexion
            </button>

          ) : (

            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
            >
              Connexion
            </Link>

          )}

        </div>

      </header>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>

            <div className="bg-blue-100 text-blue-700 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8">

              🚀 Logiciel SaaS terrain moderne

            </div>

            <h2 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">

              Gérez vos interventions simplement

            </h2>

            <p className="text-xl text-gray-500 mt-8 leading-relaxed">

              Bons d’intervention,
              signatures clients,
              PDF automatiques,
              suivi des techniciens
              et gestion terrain complète.

            </p>

            {user && (

              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition"
                >
                  Accéder au dashboard
                </Link>

                <Link
                  to="/interventions"
                  className="bg-white hover:bg-gray-50 border px-8 py-4 rounded-2xl font-bold text-lg transition"
                >
                  Voir les interventions
                </Link>

              </div>

            )}

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <div className="text-5xl mb-5">
                📄
              </div>

              <h3 className="text-2xl font-bold mb-3">
                PDF automatiques
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Génération instantanée des bons d’intervention.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

              <div className="text-5xl mb-5">
                ✍️
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Signature client
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Signature digitale directement sur mobile.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 -mt-6">

              <div className="text-5xl mb-5">
                ☁️
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Cloud sécurisé
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Données synchronisées avec Firebase.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 mt-4">

              <div className="text-5xl mb-5">
                📱
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Mobile Ready
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Optimisé smartphones et tablettes terrain.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}