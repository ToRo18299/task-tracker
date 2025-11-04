
import { useTasks, useTaskDispatch } from "../state/taskContext";
import { useTasksRepo } from "../hooks/useTasksRepo";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItems";
import Collapse from "@mui/material/Collapse";
import FilterBar from "../components/FilterBar";
import { useSearchParams } from "react-router-dom";
// import { api } from "../lib/api";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { Button } from "@mui/material";



export default function TasksPage() {
  const tasks = useTasks();
  const dispatch = useTaskDispatch();
  const repo = useTasksRepo(tasks, dispatch);
  const [sp] = useSearchParams();
  const status = (sp.get("status") ?? "all") as "all" | "pending" | "done";
  const project = (sp.get("project") ?? "all") as "all" | "TG" | "Chiper" | "Ingles" | "Running" | "GYM";
  const sort = (sp.get("sort") ?? "due") as "title" | "priority" | "due";




  // Filtra las tareas según el estado y proyecto seleccionados en la barra de filtros
  const filtered = tasks.filter((t) => {
    // status
    if (status !== "all" && ((status === "done" && !t.done) || (status === "pending" && t.done))) {
      return false;
    }
    // project
    if (project !== "all" && t.project !== project) {
      return false;
    }
    return true;
  });

  // Ordena las tareas según el parámetro sort
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sort === "priority") {
      // Prioridad: mayor primero (high > med > low)
      const order = { low: 1, med: 2, high: 3 };
      const ap = a.priority ? order[a.priority] : 0;
      const bp = b.priority ? order[b.priority] : 0;
      return bp - ap;
    }
    if (sort === "due") {
      // Vencimiento: más próximo primero
      const ad = a.due ? new Date(a.due).getTime() : Infinity;
      const bd = b.due ? new Date(b.due).getTime() : Infinity;
      return ad - bd;
    }
    return 0;
  });

  return (
    <Box>
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        Tasks
      </Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <FilterBar />
      </Box>

  <TaskForm onAdd={({ title, project }) => repo.add({ title, project })} />

      <Box component="ul" sx={{ p: 0, listStyle: "none" }}>
        {sorted.map((t) => (
          <Collapse key={t.id} in={true} timeout={400}>
            <TaskItem task={t} />
          </Collapse>
        ))}
        {sorted.length === 0 && (
          <Typography component="li" color="text.secondary" sx={{ py: 2 }}>
            No hay tareas para este filtro.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
