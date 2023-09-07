import React from "react";
import { useAuth } from "../../context/authContext";

export default function AddTask({tareas, setTareas}) {
  const { user, addTask, addFile } = useAuth();
  const newTaskHandler = async (e) => {
    e.preventDefault();
    const archive = e.target.formFiles.files[0];
    const urlDownload = await addFile(archive)

    const newTasks = [...tareas, {
      id: + new Date(),
      description: e.target.formDescription.value,
      url: urlDownload
    }]
    setTareas(await addTask(newTasks))
    e.target.formDescription.value = "";
  }
  return (
    <div className="w-fit flex flex-col justify-center items-center border-2 mt-5 text-black">
      <form onSubmit={newTaskHandler} className="flex items-center justify-center">
        <input type="text" placeholder="Describe tu tarea" id="formDescription"/>
        <input type="file" placeholder="Añadir archivo" id="formFiles"/>
        <button type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Agregar Tarea
        </button>
      </form>

    </div>
  );
}
