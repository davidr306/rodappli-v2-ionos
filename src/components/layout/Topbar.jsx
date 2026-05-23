import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Topbar({ title }) {

  async function handleLogout() {

    try {

      await signOut(auth);

      window.location.href = "/";

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

      {/* TITRE */}

      <h1 className="text-5xl font-bold text-black">

        {title}

      </h1>

      {/* MENU */}

      <div className="flex flex-wrap items-center gap-4">

        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow">

          Accueil

        </button>

        <button className="bg-white px-6 py-3 rounded-2xl shadow">

          Interventions

        </button>

        <button className="bg-white px-6 py-3 rounded-2xl shadow">

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