import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import TaskPage from "./pages/TaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import { TaskProvider } from "./state/taskContext";

// Se crea la configuración de rutas para la aplicación
const router = createBrowserRouter([
  {
    path: "/", // Ruta raíz
    element: <App />, // Componente layout principal
    children: [
  { index: true, element: <TaskPage /> }, // Ruta "/" (home), muestra TaskPage
  { path: "edit/:id", element: <EditTaskPage /> }, // Ruta de edición
    ],
  },
]);

// Se monta la aplicación en el elemento con id "root"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* TaskProvider envuelve toda la app para proveer el contexto de tareas */}
    <TaskProvider>
      {/* Proveedor de rutas, gestiona la navegación */}
      <RouterProvider router={router} />
    </TaskProvider>
  </React.StrictMode>
);
