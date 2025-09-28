import { Link } from "react-router-dom";
import { useTaskDispatch } from "../state/taskContext";
import type { Task } from "../state/types";

// Componente para mostrar una tarea individual
export default function TaskItem({ task }: { task: Task }) {
  // Obtiene la función dispatch para modificar el estado de la tarea
  const dispatch = useTaskDispatch();

  return (
    <li style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
      {/* Checkbox para marcar la tarea como hecha o pendiente */}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => dispatch({ type: "toggle", payload: { id: task.id } })}
        aria-label={task.done ? "Marcar como pendiente" : "Marcar como hecha"}
      />

      {/* Muestra el título de la tarea, tachado si está hecha */}
      <span style={{ flex: 1, textDecoration: task.done ? "line-through" : "none" }}>
        {task.title}
      </span>

      {/* Enlace para editar la tarea */}
      <Link to={`/edit/${task.id}`}>Editar</Link>

      {/* Botón para eliminar la tarea */}
      <button
        onClick={() => dispatch({ type: "remove", payload: { id: task.id } })}
        aria-label="Eliminar tarea"
      >
        🗑
      </button>
    </li>
  );
}
