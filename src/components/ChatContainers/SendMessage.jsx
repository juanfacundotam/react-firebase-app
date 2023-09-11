import React from "react";

export default function SendMessage() {
  return (
    <div className=" bg-[#40414F] flex justify-center items-center w-[95%] h-[80%] rounded-lg text-white gap-3 ">
      <h1 className="border-2 p-2 cursor-pointer">%</h1>
      <input
        className=" bg-[#40414F] rounded py-2  focus:outline-none w-full"
        type="text"
        placeholder="Escribe mensaje a #general"
      />
   <h1 className="border-2 p-2 cursor-pointer">%</h1>
   <h1 className="border-2 p-2 cursor-pointer">%</h1>
   <h1 className="border-2 p-2 cursor-pointer">%</h1>
   <h1 className="border-2 p-2 cursor-pointer">%</h1>

    </div>
  );
}
