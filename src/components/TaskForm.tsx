
import { useState, type FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

// Props: función que se llama al añadir una tarea
type Props = { onAdd: (data: { title: string; project: string }) => void };


// Componente para el formulario de nueva tarea
export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("TG");
  const isValid = title.trim().length >= 3;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onAdd({ title: title.trim(), project });
    setTitle("");
    setProject("TG");
  }

  return (
    <Box component="form" onSubmit={handleSubmit} aria-label="Añadir tarea" sx={{ display: "flex", gap: 2, my: 2 }}>
      <TextField
        id="title"
        label="Nueva tarea"
        placeholder="Ej: Comprar tornillos"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
      />
      <TextField
        select
        label="Proyecto"
        value={project}
        onChange={e => setProject(e.target.value)}
        size="small"
        sx={{ minWidth: 120 }}
      >
        {['TG', 'Chiper', 'Ingles', 'Running', 'GYM'].map(p => (
          <MenuItem key={p} value={p}>{p}</MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" disabled={!isValid}>
        Añadir
      </Button>
    </Box>
  );
}
