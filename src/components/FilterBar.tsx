import { useSearchParams } from "react-router-dom";

type Status = "all" | "pending" | "done";

export default function FilterBar() {
  const [sp, setSp] = useSearchParams();
  const status = (sp.get("status") ?? "all") as Status;

  function setStatus(next: Status) {
    const clone = new URLSearchParams(sp);
    clone.set("status", next);
    setSp(clone, { replace: true }); // evita llenar el historial
  }

  return (
    <div style={{ margin: "8px 0" }}>
      <label>
        Estado:{" "}
        <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="done">Hechos</option>
        </select>
      </label>
    </div>
  );
}
// Componente para la barra de filtros
// Permite filtrar tareas por estado (todas, pendientes, hechas)
// Usa URLSearchParams para manejar el estado del filtro en la URL
// Esto permite compartir enlaces con filtros aplicados
// y mantener el estado al recargar la página