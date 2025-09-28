import { createContext, useContext, useEffect, useReducer } from 'react'  // <-- agrega useEffect
import { taskReducer } from './taskreducer'
import type { Task, TaskAction } from './types'

const TaskStateCtx = createContext<Task[] | undefined>(undefined)
const TaskDispatchCtx = createContext<React.Dispatch<TaskAction> | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  // 1) Inicializar desde localStorage (una sola vez)
  const [state, dispatch] = useReducer(taskReducer, [], () => {
    try {
      const raw = localStorage.getItem('tasks')
      return raw ? (JSON.parse(raw) as Task[]) : []
    } catch {
      return []
    }
  })

  // 2) Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(state))
    } catch {
      // opcional: reportar/loggear
    }
  }, [state])

  return (
    <TaskDispatchCtx.Provider value={dispatch}>
      <TaskStateCtx.Provider value={state}>{children}</TaskStateCtx.Provider>
    </TaskDispatchCtx.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskStateCtx)
  if (!ctx) throw new Error('useTasks must be used within <TaskProvider>')
  return ctx
}
export function useTaskDispatch() {
  const ctx = useContext(TaskDispatchCtx)
  if (!ctx) throw new Error('useTaskDispatch must be used within <TaskProvider>')
  return ctx
}
