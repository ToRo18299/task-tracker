import { createContext, useContext, useReducer } from 'react'
import { taskReducer } from './taskreducer'
import type { Task, TaskAction } from './types'

// Crea un contexto para el estado de las tareas
const TaskStateCtx = createContext<Task[] | undefined>(undefined)
// Crea un contexto para el dispatch de acciones sobre las tareas
const TaskDispatchCtx = createContext<React.Dispatch<TaskAction> | undefined>(undefined)

// Proveedor de contexto que envuelve la app y provee el estado y el dispatch
export function TaskProvider({ children }: { children: React.ReactNode }) {
  // useReducer gestiona el estado de las tareas usando el reducer y un estado inicial vacío
  const [state, dispatch] = useReducer(taskReducer, [])
  // Provee el estado y el dispatch a los componentes hijos
  return (
    <TaskDispatchCtx.Provider value={dispatch}>
      <TaskStateCtx.Provider value={state}>{children}</TaskStateCtx.Provider>
    </TaskDispatchCtx.Provider>
  )
}

// Hook para acceder al estado de las tareas desde cualquier componente
export function useTasks() {
  const ctx = useContext(TaskStateCtx)
  if (!ctx) throw new Error('useTasks must be used within <TaskProvider>')
  return ctx
}
// Hook para acceder al dispatch y poder modificar el estado de las tareas
export function useTaskDispatch() {
  const ctx = useContext(TaskDispatchCtx)
  if (!ctx) throw new Error('useTaskDispatch must be used within <TaskProvider>')
  return ctx
}
