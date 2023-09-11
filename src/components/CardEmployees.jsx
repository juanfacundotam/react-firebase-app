import React, { useState } from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import iconImage from "../assets/logoloro.png";

export default function CardEmployees({ name, image, rol }) {
  const [editing, setEditing] = useState(false);
  const settingsHandler = () => {
    setEditing(!editing);
  };
  console.log(editing);
  return (
    <div className="relative w-full md:w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <SettingsIcon
          sx={{ fontSize: 20, cursor: "pointer" }}
          onClick={settingsHandler}
        />
      </div>
      {editing ? (
        <div className="absolute expand-diagonal flex flex-col justify-center items-center bg-[#202123] right-8 top-8 w-[16rem] h-[16rem] border-[1px] border-[#ffffff2d] rounded-lg z-50 overflow-hidden gap-2">
          <div className="flex flex-col justify-center items-start w-[80%]">
            <label
              htmlFor="email"
              className="block mb-2 text-sm  text-gray-900 font-light dark:text-white"
            >
              NickName
            </label>
            <input
              type="text"
              name="text"
              placeholder="Edita tu NickName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="flex flex-col justify-center items-start w-[80%]">
            <label
              htmlFor="email"
              className="block mb-2 text-sm  text-gray-900 font-light dark:text-white"
            >
              NickName
            </label>
            <input
              type="text"
              name="text"
              placeholder="Edita tu NickName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="flex justify-center items-center w-[80%]">
            <div className="group relative w-16 h-16 bg-[#1b1b1b] rounded-full  overflow-hidden ">
              <div className="absolute flex justify-center items-start -bottom-[120%] -right-2  w-20 h-20 bg-[#fafafa56] border-[1px] border-gray-400 rounder-full z-50 group-hover:-translate-y-8 transition-transform duration-500 ease-in-out">

              <AddAPhotoIcon sx={{ fontSize: 20, cursor: "pointer" , color:"blue"}}/>
              </div>
              <img
                src={iconImage}
                className="w-16 h-16 rounded-full z-1"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col justify-center items-center pb-10">
        <img
          className=" w-20 h-20 mb-3 rounded-full shadow-lg flex justify-center items-center"
          src={image}
          alt="Imagen"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{rol}</span>
        <Link
          to="chat"
          className="mt-7 cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 gap-3"
        >
          <img
            src={iconImage}
            alt=""
            className=" bg-[#ffffff] w-10 h-10 p-1 rounded-full"
          />
          {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a> */}
          <h1 className="">Ir al Chat</h1>
        </Link>
      </div>
    </div>
  );
}
