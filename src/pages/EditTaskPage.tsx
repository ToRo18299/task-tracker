import {useParams} from "react-router-dom";

// Componente para la página de edición de tareas
export default function EditTaskPage() {
  const { id } = useParams();   // lee el :id de la URL
  return <h2>Editando: {id}</h2>;
}
