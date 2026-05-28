import { signOut } from "firebase/auth";

import { auth } from "../../firebase/firebase";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Topbar({ title }) {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  async function handleLogout() {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      console.error(error);

    }

  }

  function buttonClass(path) {

    return location.pathname === path
      ? "bg-blue-600 text-white py-2 rounded-xl shadow text-sm w-full"
      : "bg-white text-black py-2 rounded-xl shadow text-sm w-full";

  }

  return (

    <div className="mb-8">

      <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">

        {title}

      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className={buttonClass("/dashboard")}
        >

          Accueil

        </button>

        <button
          onClick={() =>
            navigate("/interventions")
          }
          className={buttonClass("/interventions")}
        >

          Interventions

        </button>

        <button
          onClick={() =>
            navigate("/planning")
          }
          className={buttonClass("/planning")}
        >

          Planning

        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 rounded-xl shadow text-sm w-full"
        >

          Déconnexion

        </button>

      </div>

    </div>

  );

}