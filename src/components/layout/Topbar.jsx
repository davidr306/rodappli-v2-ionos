import { useNavigate } from "react-router-dom";

export default function Topbar({ title }) {

  const navigate = useNavigate();

  return (

    <div className="mb-8 flex items-center justify-between">

      <div>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-white border px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-100 mb-4"
        >
          ← Accueil
        </button>

        <h1 className="text-3xl md:text-4xl font-bold">
          {title}
        </h1>

      </div>

    </div>

  );

}