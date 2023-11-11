import React, { useEffect, useState } from "react";
import Message from "./BodyComponents/Message";
import Perfil from "./BodyComponents/Perfil";

export default function BodyMessage({iconsHidden, messageBody, anchor, user, activeChannel }) {
  let current = "";
  let firstCurrent = true;
  let flagCurrent = true;
if(!messageBody.length){
  return;
}

  return (
    <div className=" flex flex-col justify-start items-start w-full h-fit pl-2">
      {/* <Perfil datos={datos} image={image}/> */}
      {messageBody && messageBody[0].data.message
        ? messageBody[0].data.message.map((item, index) => {
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
                    " flex justify-end items-end w-full h-full text-white "
                  }
                >
                  <img
                    src={item.image}
                    className="mr-2  rounded-full w-10 min-w-[40px] h-10"
                    alt=""
                  />

                  <div className="flex flex-col justify-center items-end w-full h-full ">
                    <div className="flex  justify-start items-center w-full  gap-3 mb-2 mt-5 md:mt-auto">
                      <h1 className=" text-gray-200 text-xs  md:text-xl">
                        {item.nickName}
                      </h1>
                      {iconsHidden && <h3 className="text-base md:text-[0.6rem] text-gray-400 mt-auto">
  {item.date}
</h3>}

                      {iconsHidden && <h2 className="text-base md:text-[0.6rem] text-gray-400 mt-auto">{`"${item.estado}"`}</h2>}
                    </div>

                    <div className="text-base md:text-[0.5rem] flex flex-col justify-start items-start w-full h-full  text-white">
                      <p className="ml-2 text-[0.7rem]">{item.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className=" flex justify-end items-end w-full h-fit text-white  "
                >
                  <div
                    src={item.image}
                    className="mr-2  rounded-full w-10 h-fit min-w-[40px]"
                    alt=""
                  ></div>

                  <div className=" text-[0.8rem] flex flex-col justify-start items-start w-full h-full  text-white">
                    <p className="ml-2 text-[0.7rem] md:text-[0.9rem]">{item.message}</p>
                  </div>
                </div>
              );
            } else {
              return flagCurrent ? (
                <div
                  key={index}
                  className={
                    " flex  justify-end items-start w-full  h-full text-white mt-5"
                  }
                >
                  <div className="flex  flex-col whitespace-nowrap mr-3 ">
                    <div className="flex  justify-start items-center w-full  gap-3 mb-2 ">
                    {iconsHidden && <h2 className="text-base md:text-[0.6rem] text-gray-400 mt-auto">{`"${item.estado}"`}</h2>}
                      {iconsHidden && <h3 className="text-base md:text-[0.6rem] text-gray-400 mt-auto">
                        {item.date}
                      </h3>}
                      <h1 className="text-gray-200 text-xs  md:text-xl">
                        {item.nickName}
                      </h1>
                    </div>
                    <div className="pl-2 text-[0.7rem] flex flex-col justify-start items-end w-full h-full  text-white ">
                      <p className="mr-2 text-[0.7rem] md:text-[0.9rem]">{item.message}</p>
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
                  " flex  justify-end items-start w-full  h-full text-white "
                }
              >
                <div className="flex  flex-col whitespace-nowrap mr-3 ">

                  <div className="pl-2 text-[0.7rem] flex flex-col justify-start items-end w-full h-full  text-white ">
                    <p className="mr-2 text-[0.7rem] md:text-[0.9rem]">{item.message}</p>
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
      <div ref={anchor} className="mt-[70px] md:mt-[55px]"></div>
    </div>
  );
}
