import React from "react";

export default function Perfil({ datos, image }) {
  return (
    <div className="border-2 flex w-full">
      <div className="flex justify-start items-start w-fit h-full">
        <img src={image} className="m-2  rounded-full w-10 h-10" alt="" />
      </div>
      <div className="flex flex-col justify-center items-end w-full h-full">
        <div className="flex  justify-start items-end w-full h-[5%] gap-3">
          <div className="flex gap-2">
            <h1 className="text-xs text-gray-200 mt-auto">{datos.nickName}</h1>
            <h3 className="text-[0.6rem] text-gray-400 mt-auto">
              19/10/2023 19:30
            </h3>
          </div>
          <h2 className="text-[0.6rem] text-gray-400 mt-auto">{`"${datos.estado}"`}</h2>
        </div>
      </div>
    </div>
  );
}
