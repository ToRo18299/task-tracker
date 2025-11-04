// Componente FilterBar
// Agregado para permitir filtrar tareas por estado, proyecto y ordenarlas.
// Los filtros se reflejan en la URL (?status, ?project, ?sort) para compartir y mantener estado.
// Implementa Selects de MUI para una UI moderna y clara.
// Última edición: septiembre 2025
import { useSearchParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Status = "all" | "pending" | "done";
type Project = "all" | "TG" | "Chiper" | "Ingles" | "Running" | "GYM";
type Sort = "title" | "priority" | "due";
const PROJECTS: Project[] = ["all", "TG", "Chiper", "Ingles", "Running", "GYM"];
const SORTS: Sort[] = ["title", "priority", "due"];

export default function FilterBar() {
  const [sp, setSp] = useSearchParams();
  const status = (sp.get("status") ?? "all") as Status;
  const project = (sp.get("project") ?? "all") as Project;
  const sort = (sp.get("sort") ?? "due") as Sort;

  function setStatus(next: Status) {
    const clone = new URLSearchParams(sp);
    clone.set("status", next);
    setSp(clone, { replace: true });
  }
  function setProject(next: Project) {
    const clone = new URLSearchParams(sp);
    clone.set("project", next);
    setSp(clone, { replace: true });
  }
  function setSort(next: Sort) {
    const clone = new URLSearchParams(sp);
    clone.set("sort", next);
    setSp(clone, { replace: true });
  }

  return (
    <>
      <FormControl size="small" sx={{ minWidth: 120, my: 1, mr: 2 }}>
        <InputLabel id="status-label">Estado</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          label="Estado"
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="pending">Pendientes</MenuItem>
          <MenuItem value="done">Hechos</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120, my: 1, mr: 2 }}>
        <InputLabel id="project-label">Proyecto</InputLabel>
        <Select
          labelId="project-label"
          value={project}
          label="Proyecto"
          onChange={(e) => setProject(e.target.value as Project)}
        >
          {PROJECTS.map(p => (
            <MenuItem key={p} value={p}>{p === "all" ? "Todos" : p}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120, my: 1 }}>
        <InputLabel id="sort-label">Ordenar</InputLabel>
        <Select
          labelId="sort-label"
          value={sort}
          label="Ordenar"
          onChange={(e) => setSort(e.target.value as Sort)}
        >
          <MenuItem value="title">Título</MenuItem>
          <MenuItem value="priority">Prioridad</MenuItem>
          <MenuItem value="due">Vencimiento</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
// Componente para la barra de filtros
// Permite filtrar tareas por estado (todas, pendientes, hechas)
// Usa URLSearchParams para manejar el estado del filtro en la URL
// Esto permite compartir enlaces con filtros aplicados
// y mantener el estado al recargar la página