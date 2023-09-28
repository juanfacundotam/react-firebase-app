import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
  messageBody
}) {

  const {sendMessageFirebase} =
    useAuth();

  const setMessageHandler = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message !== "") {
      const hora = new Date();
      const formattedTime = hora.toISOString();
      // Llama a tu función aquí cuando se presiona "Enter"
      if(!messageBody[0].data.message){
        console.log("entra NO HAY")
        
        messageBody[0].data = 
        {
          name: "Juan Pedro",
          email: messageBody[0].id,
          category: "contact",
          message: [
            {
              date: "2023-09-25T19:51:24.320Z",
              estado: "Desarrollador apasionado",
              name: "Juan Pedro",
              message: "todo bien?",
              image:
                "https://firebasestorage.googleapis.com/v0/b/react-firebase-app-d4e2b.appspot.com/o/documentos%2Ffacutam%40gmail.com%2FfotoCV-removebg-preview.png?alt=media&token=c82358f0-946c-45e5-95b1-a769c73f3e7d",
              nickName: "Juan Facundo Tam",
              user: "facutam@gmail.com",
            },
            {
              date: "2023-09-25T19:58:24.320Z",
              estado: "Data Science",
              name: "Juan Pedro",
              message: "bien, vos?",
              image: "https://i.pravatar.cc/300",
              nickName: "JP",
              user: "jpedro@gmail.com",
            },
          ],
        },
        console.log(messageBody)
      } else {
        console.log("entra HAY")
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
      // Cantidad de desplazamiento necesaria

      // anchor.scrollTo({
      //   top: scrollAmount,
      //   behavior: 'smooth',
      // });
      anchor.current.scrollIntoView({ behavior: "smooth", block: "end" });

      sendMessageFirebase(messageBody)
      console.log(messageChats)
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
