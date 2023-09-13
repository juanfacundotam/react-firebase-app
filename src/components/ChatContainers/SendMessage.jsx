import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
export default function SendMessage({setMessage, message, messageArray, setMessageArray}) {


  const setMessageHandler = (e) => {
setMessage(e.target.value)
  }
  console.log(message)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Llama a tu función aquí cuando se presiona "Enter"
      console.log("enviado: ", message)

      setMessageArray([...messageArray, message])
      setMessage("")
 
    }
  };

  return (
    <div className=" bg-[#40414F] flex justify-center items-center w-[95%] h-[75%] max-h-[50px] rounded-lg text-white gap-3 ">
      <AddCircleIcon sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1 }} />
      {/* <input
        className=" bg-[#40414F] rounded S  focus:outline-none w-full h-[100%] overflow-hidden"
        type="text"
        placeholder="Escribe mensaje a #general"
      /> */}

      <input
      type="text"
        name="message"
        value={message}
        className="w-full min-h-[40px] resize-y h-fit focus:outline-none overflow-hidden bg-[#40414F] text-white text-[13px] p-2"
        placeholder="Escribe un mensaje..."
        onChange={setMessageHandler}
        onKeyDown={handleKeyPress}
      />

      <GifBoxIcon sx={{ fontSize: 25, cursor: "pointer", marginRight: 1 }} />
      <EmojiEmotionsIcon
        sx={{ fontSize: 25, cursor: "pointer", marginRight: 1 }}
      />
    </div>
  );
}
