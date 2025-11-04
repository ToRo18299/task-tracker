import { Link } from "react-router-dom";
import { useTasks, useTaskDispatch } from "../state/taskContext";
import { useTasksRepo } from "../hooks/useTasksRepo";
import type { Task } from "../state/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Componente para mostrar una tarea individual
type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const tasks = useTasks();
  const dispatch = useTaskDispatch();
  const { toggle, remove } = useTasksRepo(tasks, dispatch);
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}>
        <Checkbox
          checked={task.done}
          onChange={() => toggle(task.id)}
          inputProps={{ "aria-label": task.done ? "Marcar como pendiente" : "Marcar como hecha" }}
        />
        <Typography sx={{ flex: 1, textDecoration: task.done ? "line-through" : "none" }}>
          {task.title}
        </Typography>
        <IconButton component={Link} to={`/edit/${task.id}`} aria-label="Editar tarea" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => remove(task.id)} aria-label="Eliminar tarea" color="error">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
