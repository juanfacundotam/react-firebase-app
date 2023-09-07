import React from "react";

export default function AddTask() {
  const { user } = useAuth();
  const newTaskHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className="w-fit flex flex-col justify-center items-center border-2 mt-5 text-black">
      <form onSubmit={newTaskHandler} className="flex items-center justify-center">
        <input type="text" placeholder="Describe tu tarea"/>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Ver Archivo
        </button>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Eliminar Archivo
        </button>
      </form>

    </div>
  );
}
