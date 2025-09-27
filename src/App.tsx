import { Link, Outlet } from "react-router-dom";
// Componente principal de la aplicación
export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Task Tracker</h1>

      {/* menú de navegación */}
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/">Tasks</Link>
        <Link to="/edit/123">Editar demo</Link>
      </nav>

      {/* aquí aparece la página según la URL */}
      <Outlet />
    </div>
  );
}
