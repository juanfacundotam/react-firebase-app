import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useAuth } from "../context/authContext";
import iconImage from "../assets/logoloro.png";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
export default function SettingsHome({image}) {
    const { user, logout, loading, searchOrCreateDocument } = useAuth();
    const [newImage, setNewImage] = useState("")


  return (
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
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div className="flex justify-around items-center w-[80%] gap-5 mt-4">
        <div className="group relative w-16 h-16 bg-[#1b1b1b] rounded-full  overflow-hidden ">
          <div className="absolute flex justify-center items-start -bottom-[120%] -right-2  w-20 h-20 bg-[#fafafa56] border-[1px] border-gray-400 rounder-full z-50 group-hover:-translate-y-8 transition-transform duration-500 ease-in-out">
            <AddAPhotoIcon
              sx={{ fontSize: 20, cursor: "pointer", color: "blue" }}
            />
          </div>
          <img src={image} className="w-16 h-16 rounded-full z-1" alt="" />
        </div>
        <div className="flex  justify-center items-start gap-5">
          <CloseIcon
            sx={{
              fontSize: 25,
              cursor: "pointer",
              color: "gray",
              border: "1px solid white",
              borderRadius: "5px",
              "&:hover": {
                color: "red",
              },
            }}
          />
          <CheckIcon
            sx={{
              fontSize: 25,
              cursor: "pointer",
              color: "gray",
              border: "1px solid white",
              borderRadius: "5px",
              "&:hover": {
                color: "green",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
