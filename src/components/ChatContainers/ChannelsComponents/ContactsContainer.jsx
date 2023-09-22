import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";



export default function ContactsContainer({setActiveChannel, contact}) {
  const [openChannels, setOpenChannels] = useState(true)

  const setContact = (contact) => {
    setActiveChannel(contact)
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
        <h1>Contactos</h1>
      </div>

      {openChannels && <div className="mt-2 overflow-y-auto overflow-x-hidden scrollbar w-[100%] h-fit">
      {contact.map((item, index) => {
        return (<p key={index} className="ml-5 cursor-pointer hover:text-gray-300" onClick={() => {setContact(item.name)}}># {item.name}</p>)
      })}

 
      </div>}
    </>
  );
}
