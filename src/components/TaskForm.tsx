
import { useState, type FormEvent } from "react";

// Props: función que se llama al añadir una tarea
type Props = { onAdd: (title: string) => void };

// Componente para el formulario de nueva tarea
export default function TaskForm({ onAdd }: Props) {
  // Estado local para el input de la tarea
  const [title, setTitle] = useState("");
  // Valida que el título tenga al menos 3 caracteres
  const isValid = title.trim().length >= 3;

  // Maneja el envío del formulario
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onAdd(title.trim()); // llama a la función para añadir la tarea
    setTitle(""); // limpia el input después de añadir
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Añadir tarea" style={{ display: "flex", gap: 8, margin: "12px 0" }}>
      {/* Etiqueta oculta para accesibilidad */}
      <label htmlFor="title" className="sr-only">Nueva tarea</label>
      {/* Input controlado para el título de la tarea */}
      <input
        id="title"
        placeholder="Ej: Comprar tornillos"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: 1, padding: 8 }}
      />
      {/* Botón para enviar el formulario, deshabilitado si el título no es válido */}
      <button type="submit" disabled={!isValid}>
        Añadir
      </button>
    </form>
  );
}
