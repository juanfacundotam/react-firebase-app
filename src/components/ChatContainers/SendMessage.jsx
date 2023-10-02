import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PhotoIcon from '@mui/icons-material/Photo';
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useAuth } from "../../context/authContext";

export default function SendMessage({
  setMessage,
  message,
  messageChats,
  setMessageChats,
  datos,
  user,
  image,
  anchor,
  scrollAmount,
  setMessageBody,
  messageBody,
  fetchData
}) {

  const {sendMessageFirebase} =
    useAuth();

  const setMessageHandler = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && message !== "") {
      const hora = new Date();
      const formattedTime = hora.toISOString();
      // Llama a tu función aquí cuando se presiona "Enter"

      if(!messageBody[0].data.message){

        messageBody[0].data = 
        {
          ...messageBody[0].data,
          message: [
            {

              date: formattedTime,
              user: user,
              message: message,
              nickName: datos.nickName,
              estado: datos.estado,
              image: image,
            },
          ],
        },
        console.log("")
      } else {


        messageBody[0].data.message.push({
          date: formattedTime,
          user: user,
          message: message,
          nickName: datos.nickName,
          estado: datos.estado,
          image: image,
        });
      }
      setMessage("")
      anchor.current.scrollIntoView({ behavior: "smooth", block: "end" });

      await sendMessageFirebase(messageBody)
      await fetchData()
    }
  };


  return (
    <div className=" bg-[#40414F] flex justify-center items-center w-[95%] h-[75%] max-h-[50px] rounded-lg text-white gap-3 ">
      <PhotoIcon sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1 }} />
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
