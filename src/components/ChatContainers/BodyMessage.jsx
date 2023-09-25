import React, { useState } from "react";
import Message from "./BodyComponents/Message";
import Perfil from "./BodyComponents/Perfil";

export default function BodyMessage({ messageObject, anchor, user }) {
  console.log(messageObject);
  return (
    <div className=" flex flex-col justify-start items-start w-full h-fit">
      {/* <Perfil datos={datos} image={image}/> */}

      {messageObject && messageObject.message.length
        ? messageObject.message.map((item, index) => {
            if (item.user === user) {
              return (
                <div
                  key={index}
                  className={
                    " flex justify-end items-end w-full h-full text-white"
                  }
                >
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

                    <div className=" text-[0.8rem] flex flex-col justify-start items-start w-full h-full gap-y-1 text-white ">
                      <p>{item.message}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={
                    "border-2 flex  justify-end items-start w-full  h-full text-white"
                  }
                >
                  <div className="flex border-2 flex-col whitespace-nowrap mr-3 "> 
                    
                    <div className="flex  justify-start items-center w-full  gap-3">
                      <h2 className="text-[0.6rem] text-gray-400 mt-auto">{`"${item.estado}"`}</h2>
                      <h3 className="text-[0.6rem] text-gray-400 mt-auto">
                        {item.date}
                      </h3>
                    <h1 className="text-xs text-gray-200 mt-auto">
                        {item.nickName}
                      </h1>
               

                    </div>
                    <div className="pl-2 text-[0.8rem] flex flex-col justify-start items-end w-full h-full gap-y-1 text-white ">
                      <p>{item.message}</p>
                    </div>

                    {/* <div className="pl-2 text-[0.8rem] flex flex-col justify-start items-start w-full h-full gap-y-1 text-white ">
                    </div> */}
                  </div>  
                  <img
                    src={item.image}
                    className="mr-2  rounded-full w-10 h-10"
                    alt=""
                  /> 

                </div>
              );
            }
          })
        : null}

      <div ref={anchor} className="mt-[45px]"></div>
    </div>
  );
}
