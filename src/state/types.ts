// Define el tipo de una tarea individual
export type Task = {
     id: string;      // Identificador único de la tarea
     title: string;   // Título o descripción de la tarea
     done: boolean    // Estado: true si está completada, false si no
}

// Define las acciones posibles para manipular las tareas
export type TaskAction =
  | { type: 'add'; payload: { title: string } } // Agregar una nueva tarea
  | { type: 'toggle'; payload: { id: string } } // Cambiar el estado (completada/no) de una tarea
  | { type: 'edit'; payload: { id: string; title: string } } // Editar el título de una tarea
  | { type: 'remove'; payload: { id: string } } // Eliminar una tarea
