import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddContactModal from "./AddContactModal"



export default function ContactsContainer({setActiveChannel, contact, messageChats, setNewContactFunction, searchAndLinkContact, setChannelName}) {
  const [openChannels, setOpenChannels] = useState(true)
  

  const setContact = (contact, nickName) => {
    setActiveChannel(contact)
    setChannelName(nickName)
  }


  return (
<>
      <div className="flex justify-between items-center cursor-pointer w-full " 
      >
        <div className="flex hover:text-gray-300" onClick={() => {setOpenChannels(!openChannels)}}>
        {openChannels ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 15, cursor: "pointer" }} />
        )}
        <h1>Contactos</h1>

        </div>
        <AddContactModal setNewContactFunction={setNewContactFunction} searchAndLinkContact={searchAndLinkContact}/>

      </div>

      {openChannels && <div className="mt-2 overflow-y-auto overflow-x-hidden scrollbar w-[100%] h-fit">
      {messageChats.map((item, index) => {
        return (<p key={index} className="ml-5 cursor-pointer hover:text-gray-300" onClick={() => {setContact(item.id, item.data.nickName)}}># {item.data.nickName}</p>)
      })}
 
      </div>}
    </>
  );
}
