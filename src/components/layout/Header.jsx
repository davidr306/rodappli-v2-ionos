export default function Header() {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ margin: 0 }}>Rodappli V2</h1>
        <p style={{ margin: 0, color: "#6b7280" }}>
          Gestion des interventions
        </p>
      </div>

      <div>
        <button
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Nouvelle intervention
        </button>
      </div>
    </div>
  );
}