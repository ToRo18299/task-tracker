import { type Task, type TaskAction } from './types'

// Esta función maneja el estado de la lista de tareas según la acción recibida
export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'add':
      // Agrega una nueva tarea con un id único y el título recibido
      return [
        ...state,
        { id: crypto.randomUUID(), title: action.payload.title, done: false },
      ]
    case 'toggle':
      // Cambia el estado 'done' de la tarea con el id recibido
      return state.map(t => t.id === action.payload.id ? { ...t, done: !t.done } : t)
    case 'edit':
      // Edita el título de la tarea con el id recibido
      return state.map(t => t.id === action.payload.id ? { ...t, title: action.payload.title } : t)
    case 'remove':
      // Elimina la tarea con el id recibido
      return state.filter(t => t.id !== action.payload.id)
    default:
      // Si la acción no coincide, retorna el estado sin cambios
      return state
  }
}

