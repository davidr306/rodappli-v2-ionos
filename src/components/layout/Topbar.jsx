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

  <div className="topbar-fix mb-8">

    <h1 className="text-5xl font-bold text-black">
      {title}
    </h1>

    <div className="topbar-buttons">

      <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow">
        Accueil
      </button>

      <button className="bg-white px-6 py-3 rounded-2xl shadow">
        Interventions
      </button>

      <button className="bg-white px-6 py-3 rounded-2xl shadow">
        Planning
      </button>

      <button className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow">
        Déconnexion
      </button>

    </div>

  </div>

);