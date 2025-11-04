// Mock de tareas para frontend sin backend
import type { Task } from '../state/types';

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Preparar informe TG",
    done: false,
    project: "TG",
    due: "2025-10-01",
    priority: "high",
    notes: "Enviar antes del viernes"
  },
  {
    id: "2",
    title: "Estudiar inglés unidad 5",
    done: true,
    project: "Ingles",
    due: "2025-09-25",
    priority: "med",
    notes: "Repasar vocabulario"
  },
  {
    id: "3",
    title: "Entrenamiento Running",
    done: false,
    project: "Running",
    due: "2025-09-29",
    priority: "low",
    notes: "10km suave"
  }
];

export interface TasksRepo {
  list(): Promise<Task[]>;
  create(data: Omit<Task, "id" | "done"> & { done?: boolean }): Promise<Task>;
  update(id: string, patch: Partial<Task>): Promise<Task>;
  remove(id: string): Promise<void>;
}

export async function getTasksRepo(): Promise<TasksRepo> {
  // Todas las operaciones son locales y mockeadas
  let tasks = [...mockTasks];
  return {
    async list() {
      return tasks;
    },
    async create(data) {
      const newTask: Task = {
        id: (Math.random() * 100000).toFixed(0),
        done: false,
        ...data
      };
      tasks.push(newTask);
      return newTask;
    },
    async update(id, patch) {
      const idx = tasks.findIndex(t => t.id === id);
      if (idx >= 0) {
        tasks[idx] = { ...tasks[idx], ...patch };
        return tasks[idx];
      }
      throw new Error("Task not found");
    },
    async remove(id) {
      tasks = tasks.filter(t => t.id !== id);
    }
  };
}
