import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useTasks, useTaskDispatch } from "../state/taskContext";

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const tasks = useTasks();
  const dispatch = useTaskDispatch();
  const nav = useNavigate();

  const task = tasks.find((t) => t.id === id);
  const [title, setTitle] = useState(task?.title ?? "");

  if (!id || !task) {
    return (
      <div>
        <p>No se encontró la tarea.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  // Lógica para guardar los cambios de la tarea editada
  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    // Edita la tarea y navega de regreso a la lista
    dispatch({ type: "edit", payload: { id: id as string, title: clean } });
    nav("/"); // volver a la lista
  }

  return (
    <form onSubmit={handleSave} style={{ display: "flex", gap: 8 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit" disabled={title.trim().length < 3}>Guardar</button>
      <Link to="/">Cancelar</Link>
    </form>
  );
}
