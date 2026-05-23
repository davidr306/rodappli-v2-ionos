import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  signOut,
} from "firebase/auth";

import {
  auth,
} from "../../firebase/firebase";

export default function Topbar({
  title,
}) {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  function navClass(path) {

    return location.pathname === path

      ? "bg-blue-600 text-white"

      : "bg-white text-gray-700";

  }

  async function deconnexion() {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        "Erreur déconnexion"
      );

    }

  }

  return (

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">

          {title}

        </h1>

      </div>

      <div className="flex flex-wrap gap-3">

        <Link
          to="/dashboard"
          className={`px-5 py-3 rounded-2xl shadow font-medium transition ${navClass("/dashboard")}`}
        >
          Accueil
        </Link>

        <Link
          to="/"
          className={`px-5 py-3 rounded-2xl shadow font-medium transition ${navClass("/")}`}
        >
          Interventions
        </Link>

        <Link
          to="/planning"
          className={`px-5 py-3 rounded-2xl shadow font-medium transition ${navClass("/planning")}`}
        >
          Planning
        </Link>

        <button
          onClick={deconnexion}
          className="bg-red-600 text-white px-5 py-3 rounded-2xl shadow font-medium"
        >
          Déconnexion
        </button>

      </div>

    </div>

  );

}