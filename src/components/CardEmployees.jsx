import React, { useState } from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import iconImage from "../assets/logoloro.png";
import SettingsHome from "./SettingsHome";
import Spinner from "./spinner";

export default function CardEmployees({ name, image, rol, changeSomethingInSettings }) {
  const [editing, setEditing] = useState(false);
  const settingsHandler = () => {
    setEditing(!editing);
  };
  console.log(editing);
  return (
    <div className="relative w-full md:w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <SettingsIcon
          sx={{
            fontSize: 20,
            cursor: "pointer",
            transition: "transform 1s",
            "&:hover": {
              transform: "rotate(90deg)",
            },
          }}
          onClick={settingsHandler}
        />
      </div>
      {editing ? <SettingsHome settingsHandler={settingsHandler} image={image} changeSomethingInSettings={changeSomethingInSettings}/> : null}
      <div className="flex flex-col justify-center items-center pb-10">
        {image ?
        <img
          className=" w-20 h-20 mb-3 rounded-full shadow-lg flex justify-center items-center border-[1px] border-gray-700"
          src={image}
          alt="Imagen"
        /> : <h1 className="border-[1px]  border-gray-500 w-20 h-20 mb-3 rounded-full shadow-lg flex justify-center items-center text-[#fafafa59]">Foto</h1> }
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{rol}</span>
        <Link
          to="chat"
          className="mt-7 cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 gap-3"
        >
          <img src={iconImage} alt="" className="  w-8 h-8 p-1 rounded-full" />
          {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a> */}
          <h1 className="">Ir al Chat</h1>
        </Link>
      </div>
    </div>
  );
}
