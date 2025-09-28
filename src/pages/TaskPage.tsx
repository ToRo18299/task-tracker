import { useTasks, useTaskDispatch } from "../state/taskContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItems";

export default function TasksPage() {
  // Obtiene la lista de tareas del contexto global
  const tasks = useTasks();
  // Obtiene la función dispatch para modificar el estado de las tareas
  const dispatch = useTaskDispatch();

  return (
    <div>
      <h2>Tasks</h2>

      {/* Formulario para añadir nuevas tareas */}
      <TaskForm onAdd={(title) => dispatch({ type: "add", payload: { title } })} />

      {/* Renderiza la lista de tareas usando TaskItem para cada una */}
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {tasks.map((t) => (
          // TaskItem muestra cada tarea y permite editar, eliminar y marcar como hecha
          <TaskItem key={t.id} task={t} />
        ))}
      </ul>
    </div>
  );
}
