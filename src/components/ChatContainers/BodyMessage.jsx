import React, { useState } from "react";
import Message from "./BodyComponents/Message";
import Perfil from "./BodyComponents/Perfil";

export default function BodyMessage({ datos, image, messageArray }) {
  const [currentName, setCurrentName] = useState("");
  return (
    <div className=" flex flex-col justify-start items-start border-2 w-full h-fit">
      {/* <Perfil datos={datos} image={image}/> */}
      {messageArray.map((item, index) => {
        return (
          <div key={index} className="border-2 flex justify-center items-start w-full h-full text-white">
        
              <img
                src={image}
                className="mr-2  rounded-full w-10 h-10"
                alt=""
              />

            <div className="flex flex-col justify-center items-end w-full h-full">


              <div className="flex  justify-start items-center w-full  gap-3">


               
                  <h1 className="text-xs text-gray-200 mt-auto">
                    {datos.nickName}
                  </h1>
                  <h3 className="text-[0.6rem] text-gray-400 mt-auto">
                    19/10/2023 19:30
                  </h3>
              
                <h2 className="text-[0.6rem] text-gray-400 mt-auto">{`"${datos.estado}"`}</h2>
              </div>


              <div className="pl-2 text-[0.8rem] flex flex-col justify-start items-start w-full h-full gap-y-1 text-white ">
                <p>{item}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
