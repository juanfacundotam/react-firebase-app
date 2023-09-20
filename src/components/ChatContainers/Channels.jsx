import React, { useState } from "react";
import ChannelsContainer from "./ChannelsComponents/ChannelsContainer";
import ContactsContainer from "./ChannelsComponents/ContactsContainer";
import PublicChannels from "./ChannelsComponents/PublicChannels";
import PrivateChannels from "./ChannelsComponents/PrivateChannels";

export default function Channels({setActiveChannel}) {


  return (
    <>
    
     <div className="flex flex-col justify-start items-start w-[80%] h-fit max-h-[45%] mt-5 text-[0.8rem] ">
        <PublicChannels setActiveChannel={setActiveChannel}/>
      </div>
      {/* <div className="flex flex-col justify-start items-start w-[80%] h-fit max-h-[29%] mt-5 text-[0.8rem] ">
        <PrivateChannels />
      </div> */}
      <div className="flex flex-col justify-start items-start w-[80%] h-fit max-h-[45%] mt-5 text-[0.8rem] ">
        <ContactsContainer setActiveChannel={setActiveChannel}/>
      </div>
    </>
  );
}
