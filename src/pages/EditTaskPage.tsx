import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useTasks, useTaskDispatch } from "../state/taskContext";
import { useTasksRepo } from "../hooks/useTasksRepo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const PROJECTS = ["TG", "Chiper", "Ingles", "Running", "GYM"];
const PRIORITIES = ["low", "med", "high"];

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const tasks = useTasks();
  const dispatch = useTaskDispatch();
  const repo = useTasksRepo(tasks, dispatch);
  const nav = useNavigate();

  const task = tasks.find((t) => t.id === id);
  const [title, setTitle] = useState(task?.title ?? "");
  const [project, setProject] = useState(task?.project ?? "TG");
  const [due, setDue] = useState(task?.due ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "med");
  const [notes, setNotes] = useState(task?.notes ?? "");

  if (!id || !task) {
    return (
      <Box>
        <Typography color="error">No se encontró la tarea.</Typography>
        <Button component={Link} to="/">Volver</Button>
      </Box>
    );
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 3 || !id) return;
    repo.edit(id as string, {
      title: title.trim(),
      project: project as "TG" | "Chiper" | "Ingles" | "Running" | "GYM",
      due,
      priority: priority as "low" | "med" | "high",
      notes,
    });
    nav("/");
  }

  return (
    <Box component="form" onSubmit={handleSave} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Editar tarea</Typography>
      <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)} required inputProps={{ minLength: 3 }} />
  <TextField select label="Proyecto" value={project} onChange={e => setProject(e.target.value as typeof project)}>
        {PROJECTS.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
      </TextField>
      <TextField type="date" label="Vencimiento" value={due} onChange={e => setDue(e.target.value)} InputLabelProps={{ shrink: true }} />
  <TextField select label="Prioridad" value={priority} onChange={e => setPriority(e.target.value as typeof priority)}>
        {PRIORITIES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
      </TextField>
      <TextField label="Notas" value={notes} onChange={e => setNotes(e.target.value)} multiline minRows={2} />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" disabled={title.trim().length < 3}>Guardar</Button>
        <Button component={Link} to="/" variant="outlined">Cancelar</Button>
      </Box>
    </Box>
  );
}
