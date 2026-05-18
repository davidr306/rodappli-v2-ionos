import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  function lienClass(path) {

    const actif = location.pathname === path;

    return `
      flex items-center gap-3 px-4 py-3 rounded-2xl transition
      ${
        actif
          ? "bg-blue-600 text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-100"
      }
    `;

  }

  return (

    <div className="w-72 min-h-screen bg-white border-r shadow-sm hidden md:flex flex-col">

      {/* HEADER */}

      <div className="p-8 border-b">

        <h1 className="text-3xl font-bold text-blue-600">
          Rodappli
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Gestion d’interventions
        </p>

      </div>

      {/* MENU */}

      <div className="flex-1 p-5 space-y-3">

        <Link
          to="/dashboard"
          className={lienClass("/dashboard")}
        >
          <span className="text-xl">
            📊
          </span>

          <span className="font-medium">
            Dashboard
          </span>
        </Link>

        <Link
          to="/interventions"
          className={lienClass("/interventions")}
        >
          <span className="text-xl">
            📄
          </span>

          <span className="font-medium">
            Interventions
          </span>
        </Link>

      </div>

      {/* FOOTER */}

      <div className="p-5 border-t">

        <div className="bg-gray-100 rounded-2xl p-4">

          <p className="font-semibold text-gray-700">
            Rodappli SaaS
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Gestion terrain professionnelle
          </p>

        </div>

      </div>

    </div>

  );

}