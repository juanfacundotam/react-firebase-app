import React from "react";
import { useAuth } from "../../context/authContext";
export default function ({ tareas, setTareas }) {
  const { user, logout, deleteTask } = useAuth();

  const deleteTaskHandler = async (taskId) => {
    const updatedTasks = tareas.filter((tarea)=> tarea.id !== taskId)
    setTareas(await deleteTask(updatedTasks));
  };
  return (
    <>
      {tareas && !!tareas.length && (
        <div className="w-fit flex flex-col justify-center items-center border-2 mt-5">
          {tareas.map((tarea, index) => {
            return (
              <div key={index}>
                <div className="flex items-center justify-center">
                  <p>{tarea.description}</p>
                  <a href={tarea.url} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Ver Archivo
                  </a>
                  <button
                    onClick={() => deleteTaskHandler(tarea.id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Eliminar Archivo
                  </button>
                </div>
                <div className="border-b-2 w-96"></div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
