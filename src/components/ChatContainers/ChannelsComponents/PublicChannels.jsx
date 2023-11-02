import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";



export default function PublicChannels({ setMenuOpen, setActiveChannel, contact, messageChats, setNewContactFunction, searchAndLinkContact, setChannelName}) {
  const [openChannels, setOpenChannels] = useState(true)

  const setChannel = (channel) => {
    setActiveChannel({name: channel, category: "channel"})
    setChannelName(channel)
  }

  return (
<>
      <div className="flex justify-center items-center cursor-pointer hover:text-gray-300" 
      onClick={() => {setOpenChannels(!openChannels)}}
      >
        {openChannels ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        )}
        <h1>Canales</h1>
      </div>

      {openChannels && <div className="mt-2 overflow-y-auto overflow-x-hidden scrollbar w-[100%] h-fit">
      {messageChats.canales && messageChats.canales.map((item, index) => {
        return (<p key={index} className="ml-5 cursor-pointer hover:text-gray-300" onClick={() => {setChannel(item.id); if(window.innerWidth <= 767){setMenuOpen(false)}}}># {item.id}</p>)
      })}
        


 
      </div>}
    </>
  );
}