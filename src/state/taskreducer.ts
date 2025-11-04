import { type Task, type TaskAction } from './types'

// Esta función maneja el estado de la lista de tareas según la acción recibida
export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'add':
      // Agrega una nueva tarea con los nuevos campos y defaults
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: action.payload.title,
          done: false,
          project: action.payload.project ?? "TG",
          due: action.payload.due,
          priority: action.payload.priority ?? "med",
          notes: action.payload.notes,
        },
      ]
    case "hydrate":
      // Inicializa el estado con un conjunto de tareas, migrando las antiguas
      return action.payload.tasks.map(t => ({
        ...t,
        project: t.project ?? "TG",
        priority: t.priority ?? "med",
      }));
    case 'toggle':
      // Cambia el estado 'done' de la tarea con el id recibido
      return state.map(t => t.id === action.payload.id ? { ...t, done: !t.done } : t)
    case 'edit':
      // Edita los campos de la tarea con el id recibido
      return state.map(t =>
        t.id === action.payload.id
          ? {
              ...t,
              ...(action.payload.title !== undefined ? { title: action.payload.title } : {}),
              ...(action.payload.project !== undefined ? { project: action.payload.project } : {}),
              ...(action.payload.due !== undefined ? { due: action.payload.due } : {}),
              ...(action.payload.priority !== undefined ? { priority: action.payload.priority } : {}),
              ...(action.payload.notes !== undefined ? { notes: action.payload.notes } : {}),
            }
          : t
      );
    case 'remove':
      // Elimina la tarea con el id recibido
      return state.filter(t => t.id !== action.payload.id)
    default:
      // Si la acción no coincide, retorna el estado sin cambios
      return state
  }
}

