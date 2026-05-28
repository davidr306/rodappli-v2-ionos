import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Topbar({ title }) {

  const navigate = useNavigate();

  async function handleLogout() {

    try {

      await signOut(auth);

      navigate("/");

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

      <h1 className="text-5xl font-bold text-black">

        {title}

      </h1>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow"
        >

          Accueil

        </button>

        <button
          onClick={() => navigate("/interventions")}
          className="bg-white px-6 py-3 rounded-2xl shadow"
        >

          Interventions

        </button>

        <button
          onClick={() => navigate("/planning")}
          className="bg-white px-6 py-3 rounded-2xl shadow"
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