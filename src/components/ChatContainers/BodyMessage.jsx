import React, { useEffect, useState } from "react";
import Message from "./BodyComponents/Message";
import Perfil from "./BodyComponents/Perfil";

export default function BodyMessage({ messageChats, anchor, user }) {
  let current = "";
  let firstCurrent = true;
  let flagCurrent = true;
console.log(messageChats[0].data.message)
  return (
    <div className=" flex flex-col justify-start items-start w-full h-fit pl-2">
      {/* <Perfil datos={datos} image={image}/> */}
      {messageChats && messageChats[0].data.message
        ? messageChats[0].data.message.map((item, index) => {
          console.log(item)
            if (firstCurrent) {
              current = item.user;
              firstCurrent = false;
            } else {
              if (current === item.user) {
                flagCurrent = false;
              } else {
                current = item.user;
                flagCurrent = true;
              }
              //else {
              //   current = item.user;
              //   firstCurrent = false;
              //   flagCurrent = false;
              // }
            }

            if (item.user === user) {
              return flagCurrent ? (
                <div
                  key={index}
                  className={
                    " flex justify-end items-end w-full h-full text-white"
                  }
                >
                  <img
                    src={item.image}
                    className="mr-2  rounded-full w-10 min-w-[40px] h-10"
                    alt=""
                  />

                  <div className="flex flex-col justify-center items-end w-full h-full ">
                    <div className="flex  justify-start items-center w-full  gap-3 mb-2">
                      <h1 className="text-xs text-gray-200 mt-auto">
                        {item.nickName}
                      </h1>
                      <h3 className="text-[0.6rem] text-gray-400 mt-auto">
                        {item.date}
                      </h3>

                      <h2 className="text-[0.6rem] text-gray-400 mt-auto">{`"${item.estado}"`}</h2>
                    </div>

                    <div className="text-[0.8rem] flex flex-col justify-start items-start w-full h-full  text-white">
                      <p className="ml-2">{item.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className=" flex justify-end items-end w-full h-fit text-white "
                >
                  <div
                    src={item.image}
                    className="mr-2  rounded-full w-10 h-fit min-w-[40px]"
                    alt=""
                  ></div>

                  <div className=" text-[0.8rem] flex flex-col justify-start items-start w-full h-full  text-white">
                    <p className="ml-2">{item.message}</p>
                  </div>
                </div>
              );
            } else {
              return flagCurrent ? (
                <div
                  key={index}
                  className={
                    " flex  justify-end items-start w-full  h-full text-white"
                  }
                >
                  <div className="flex  flex-col whitespace-nowrap mr-3 ">
                    <div className="flex  justify-start items-center w-full  gap-3 mb-2">
                      <h2 className="text-[0.6rem] text-gray-400 mt-auto">{`"${item.estado}"`}</h2>
                      <h3 className="text-[0.6rem] text-gray-400 mt-auto">
                        {item.date}
                      </h3>
                      <h1 className="text-xs text-gray-200 mt-auto">
                        {item.nickName}
                      </h1>
                    </div>
                    <div className="pl-2 text-[0.8rem] flex flex-col justify-start items-end w-full h-full  text-white ">
                      <p className="mr-2">{item.message}</p>
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
              ) : (
                <div
                key={index}
                className={
                  " flex  justify-end items-start w-full  h-full text-white"
                }
              >
                <div className="flex  flex-col whitespace-nowrap mr-3 ">

                  <div className="pl-2 text-[0.8rem] flex flex-col justify-start items-end w-full h-full  text-white ">
                    <p className="mr-2">{item.message}</p>
                  </div>

                  {/* <div className="pl-2 text-[0.8rem] flex flex-col justify-start items-start w-full h-full gap-y-1 text-white ">
                  </div> */}
                </div>
                <div

                  className="mr-2  rounded-full w-10 "

                ></div>
              </div>
              );
            }
          })
        : null}
      <div ref={anchor} className="mt-[45px]"></div>
    </div>
  );
}
