import { useTasks, useTaskDispatch } from "../state/taskContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItems";
import FilterBar from "../components/FilterBar";
import { useSearchParams } from "react-router-dom";

export default function TasksPage() {
  const tasks = useTasks();
  const dispatch = useTaskDispatch();
  const [sp] = useSearchParams();
  const status = (sp.get("status") ?? "all") as "all" | "pending" | "done";

  const filtered = tasks.filter((t) => {
    if (status === "all") return true;
    if (status === "done") return t.done;
    return !t.done; // "pending"
  });

  return (
    <div>
      <h2>Tasks</h2>

      <FilterBar />

      <TaskForm onAdd={(title) => dispatch({ type: "add", payload: { title } })} />

      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {filtered.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
        {filtered.length === 0 && <li>No hay tareas para este filtro.</li>}
      </ul>
    </div>
  );
}
