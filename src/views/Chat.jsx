import React from "react";
import { Link } from "react-router-dom";
import Channels from "../components/ChatContainers/Channels";
import UpBar from "../components/ChatContainers/UpBar";
import BodyMessage from "../components/ChatContainers/BodyMessage";
import SendMessage from "../components/ChatContainers/SendMessage";
export default function Chat() {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="bg-[#202123] flex flex-col justify-start items-center h-full w-[20%]">
        <Channels />
      </div>
      <div className="bg-[#343541] flex flex-col justify-center items-center h-full w-[80%]">
        <div className="border-b-[1px] border-[#646464] flex flex-col justify-center items-center h-[10%] w-full">
          <UpBar />
        </div>
        <div className="border-b-[1px] border-[#646464] bg-[#343541] flex flex-col justify-center items-center h-[80%] w-full mt-2">
          <BodyMessage />
        </div>
        <div className=" bg-[#343541] flex flex-col justify-center items-center h-[10%] w-full">
          <SendMessage />
        </div>
      </div>
    </div>
  );
}
