import { useTasks, useTaskDispatch } from "../state/taskContext";
import TaskForm from "../components/TaskForm";

export default function TasksPage() {
  const tasks = useTasks();
  const dispatch = useTaskDispatch();

  return (
    <div>
      <h2>Tasks</h2>

      {/* NUEVO: formulario controlado */}
      <TaskForm
        onAdd={(title) =>
          dispatch({ type: "add", payload: { title } })
        }
      />

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} {t.done ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}
