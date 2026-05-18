export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        Rodappli
      </h1>

      <nav className="flex flex-col gap-4">
        <a href="#">Dashboard</a>
        <a href="/interventions">Interventions</a>
        <a href="#">Clients</a>
      </nav>

      <button className="mt-10 bg-white text-black px-4 py-2 rounded">
        Déconnexion
      </button>
    </div>
  );
}