import React from "react";

export default function ({ tareas }) {
  return (
    <div>
      {tareas.length && tareas.map((tarea, index) => {
        return (
          <div key={index}>
            <div  className="flex items-center justify-center">
              <p>{tarea.description}</p>
              <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Ver Archivo</button>
              <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Eliminar Archivo</button>
            </div>
            <div className="border-b-2 w-96"></div>
          </div>
        );
      })}
    </div>
  );
}
