// Hook de UI para frontend puro, sin backend
// Todas las acciones solo afectan el estado global (context/reducer)
export function useTasksRepo(state: any[], dispatch: (action: any) => void) {
  return {
    add: (data: any) => dispatch({ type: "add", payload: data }),
    toggle: (id: string) => dispatch({ type: "toggle", payload: { id } }),
    edit: (id: string, patch: any) => dispatch({ type: "edit", payload: { id, ...patch } }),
    remove: (id: string) => dispatch({ type: "remove", payload: { id } }),
    loading: false,
    error: null
  };
}
