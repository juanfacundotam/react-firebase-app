import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function ContactsContainer() {
  return (
    <>
      <div className="flex justify-center items-center">
        {true ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        )}
        <h1>Contactos</h1>
      </div>
      <div className="mt-2 overflow-y-auto overflow-x-hidden scrollbar w-[100%] h-96">
        <p className="ml-5">Pedro Juan Gomez</p>
        <p className="ml-5">Ricardo Iorio</p>
        <p className="ml-5">Tomas Achaval</p>
        <p className="ml-5">Tomas Achaval</p>
        <p className="ml-5">Tomas Achaval</p>
        <p className="ml-5">Tomas Achaval</p>
        <p className="ml-5">Tomas Achaval</p>
        <p className="ml-5">Tomasssssssssssssssssssssss Achaval</p>
        <p className="ml-5">Tomassssssssssssssssssssssssss Achaval</p>
        <p className="ml-5">Tomasssssssssssssssssssssss Achaval</p>
        <p className="ml-5">Tomasssssssssssssssssssssss Achaval</p>
        <p className="ml-5">Tomas Achaval</p>
      </div>
    </>
  );
}
