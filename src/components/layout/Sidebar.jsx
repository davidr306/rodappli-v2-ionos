export default function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <h2>Rodappli</h2>

      <nav>
        <a href="#">Dashboard</a>
        <a href="#">Interventions</a>
        <a href="#">Clients</a>
      </nav>

      <button onClick={onLogout}>Déconnexion</button>
    </div>
  );
}