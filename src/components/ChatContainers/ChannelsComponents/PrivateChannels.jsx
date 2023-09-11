import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function PrivateChannels() {
  return (
    <>
      <div className="flex justify-center items-center">
        {true ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        )}
        <h1>Canales</h1>
      </div>
      <div className="mt-2 overflow-y-auto overflow-x-hidden scrollbar w-[100%] h-96">
        <p className="ml-5"># General</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
        <p className="ml-5"># Grupo B</p>
      </div>
    </>
  );
}
