import React, { useState} from "react";
import Message from "./BodyComponents/Message";
import Perfil from "./BodyComponents/Perfil";

export default function BodyMessage({messageArray, anchor }) {

  return (
    <div className=" flex flex-col justify-start items-start w-full h-fit" >
      {/* <Perfil datos={datos} image={image}/> */}
      {/* {messageArray ? messageArray.map((item, index) => {
        return (
          <div key={index}  className=" flex justify-center items-start w-full h-full text-white">
        
              <img
                src={item.image}
                className="mr-2  rounded-full w-10 h-10"
                alt=""
              />

            <div className="flex flex-col justify-center items-end w-full h-full">


              <div className="flex  justify-start items-center w-full  gap-3">


               
                  <h1 className="text-xs text-gray-200 mt-auto">
                    {item.nickName}
                  </h1>
                  <h3 className="text-[0.6rem] text-gray-400 mt-auto">
                    {item.date}
                  </h3>
              
                <h2 className="text-[0.6rem] text-gray-400 mt-auto">{`"${item.estado}"`}</h2>
              </div>


              <div className="pl-2 text-[0.8rem] flex flex-col justify-start items-start w-full h-full gap-y-1 text-white ">
                <p>{item}</p>
              </div>
            </div>
          </div>
        );
      }) : null} */}
      <div ref={anchor} className="mt-[45px]"></div>
    </div>
  );
}
