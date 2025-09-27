import { useTasks, useTaskDispatch } from "../state/taskContext";

// Componente principal de la página de tareas
export default function TasksPage() {
  // Obtiene la lista de tareas del contexto
  const tasks = useTasks();
  // Obtiene la función dispatch para modificar las tareas
  const dispatch = useTaskDispatch();

  return (
    <div>
      <h2>Tasks</h2>

      {/* Botón para añadir una tarea demo usando el dispatch */}
      <button
        onClick={() =>
          dispatch({ type: "add", payload: { title: `Tarea ${tasks.length + 1}` } })
        }
      >
        Añadir demo
      </button>

      {/* Lista de tareas renderizada dinámicamente */}
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {/* Muestra el título y el estado de la tarea */}
            {t.title} {t.done ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}
