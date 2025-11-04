// Define el tipo de una tarea individual
// Modelo extendido de tarea, compatible con tareas antiguas
export type Task = {
     id: string;
     title: string;
     done: boolean;
     project?: "TG" | "Chiper" | "Ingles" | "Running" | "GYM";
     due?: string;
     priority?: "low" | "med" | "high";
     notes?: string;
}

// Define las acciones posibles para manipular las tareas
export type TaskAction =
     | { type: "hydrate"; payload: { tasks: Task[] } }
     | { type: "add"; payload: { title: string; project?: "TG" | "Chiper" | "Ingles" | "Running" | "GYM"; due?: string; priority?: "low" | "med" | "high"; notes?: string } }
     | { type: "toggle"; payload: { id: string } }
     | { type: "edit"; payload: { id: string; title?: string; project?: "TG" | "Chiper" | "Ingles" | "Running" | "GYM"; due?: string; priority?: "low" | "med" | "high"; notes?: string } }
     | { type: "remove"; payload: { id: string } }
