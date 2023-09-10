import React from "react";
import { useAuth } from "../../context/authContext";

export default function AddTask({ tareas, setTareas }) {
  const { user, addTask, addFile } = useAuth();
  const newTaskHandler = async (e) => {
    e.preventDefault();
    const archive = e.target.formFiles.files[0];
    const urlDownload = await addFile(archive);

    const newTasks = [
      ...tareas,
      {
        id: +new Date(),
        description: e.target.formDescription.value,
        url: urlDownload,
      },
    ];
    setTareas(await addTask(newTasks));
    e.target.formDescription.value = "";
  };
  return (
    <div className="w-fit flex flex-col justify-center items-center  mt-5 text-gray-400">
      <form
        onSubmit={newTaskHandler}
        className=" flex flex-col items-center justify-center gap-2"
      >
        <input
          type="text"
          placeholder="Describe tu tarea"
          id="formDescription"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        <input
          type="file"
          placeholder="Añadir archivo"
          id="formFiles"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"

        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  );
}
