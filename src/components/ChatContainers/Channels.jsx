import React, { useState } from "react";
import ChannelsContainer from "./ChannelsComponents/ChannelsContainer";
import ContactsContainer from "./ChannelsComponents/ContactsContainer";
import PublicChannels from "./ChannelsComponents/PublicChannels";
import PrivateChannels from "./ChannelsComponents/PrivateChannels";


export default function Channels({setActiveChannel, setMenuOpen, setChannelName, channelsFiltered, contactFiltered, messageChats, setNewContactFunction, searchAndLinkContact}) {



  return (
    <>
    
     <div className="flex flex-col justify-start items-start w-[80%] h-fit max-h-[45%] mt-5 text-xl md:text-xs ">
        <PublicChannels setMenuOpen={setMenuOpen} setActiveChannel={setActiveChannel} setChannelName={setChannelName} contact={contactFiltered} messageChats={messageChats} setNewContactFunction={setNewContactFunction} searchAndLinkContact={searchAndLinkContact}/>
      </div>
      {/* <div className="flex flex-col justify-start items-start w-[80%] h-fit max-h-[29%] mt-5 text-[0.8rem] ">
        <PrivateChannels
         />
      </div> */}
      <div className="border w-[80%] border-gray-500 mt-5"></div>
      <div className="flex flex-col justify-start items-start w-[80%] h-fit max-h-[45%] mt-5 text-xl md:text-xs ">
        <ContactsContainer setMenuOpen={setMenuOpen} setActiveChannel={setActiveChannel} setChannelName={setChannelName} contact={contactFiltered} messageChats={messageChats} setNewContactFunction={setNewContactFunction} searchAndLinkContact={searchAndLinkContact}/>
      </div>
    </>
  );
}
