import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar({ title }) {

  const navigate = useNavigate();
  const location = useLocation();

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
      ? "bg-blue-600 text-white px-6 py-3 rounded-2xl shadow"
      : "bg-white px-6 py-3 rounded-2xl shadow";

  }

  return (

    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

      <h1 className="text-5xl font-bold text-black">

        {title}

      </h1>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/dashboard")}
          className={buttonClass("/dashboard")}
        >

          Accueil

        </button>

        <button
          onClick={() => navigate("/interventions")}
          className={buttonClass("/interventions")}
        >

          Interventions

        </button>

        <button
          onClick={() => navigate("/planning")}
          className={buttonClass("/planning")}
        >

          Planning

        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow"
        >

          Déconnexion

        </button>

      </div>

    </div>

  );

}