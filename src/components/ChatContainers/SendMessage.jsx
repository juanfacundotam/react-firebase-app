import React, { useState, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PhotoIcon from "@mui/icons-material/Photo";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from '@mui/icons-material/Send';


import { useAuth } from "../../context/authContext";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

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
  fetchData,
  activeChannel,
}) {
  const { sendMessageFirebase, sendMessagePublicFirebase } = useAuth();
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const handleEmojiClick = (emoji) => {
    // Maneja la inserción del emoji en tu mensaje o donde sea necesario
    // Ejemplo: setText(text + emoji);
  };

  const setMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const addEmojiHandler = (e) => {
const symbol = e.unified.split("_")
const array = []
symbol.forEach(elem => {
  array.push("0x" + elem);
});
let emoji = String.fromCodePoint(...array);
setMessage(message + emoji);
inputRef.current.focus();

  }


  const handleKeyPress = async (e, iconSend) => {
    console.log(iconSend)
    if ((e.key === "Enter" || iconSend === "ok") && message !== "") {
      const hora = new Date();
      const formattedTime = hora.toISOString();
      // Llama a tu función aquí cuando se presiona "Enter"

      if (!messageBody[0].data.message) {
        (messageBody[0].data = {
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
        }),
          console.log("");
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
      setMessage("");
      setShowEmoji(false);
      anchor.current.scrollIntoView({ behavior: "smooth", block: "end" });

      if (activeChannel.category === "contact") {
        await sendMessageFirebase(messageBody);
      } else {
        await sendMessagePublicFirebase(messageBody);
      }
      await fetchData();
    }
  };

  return (
    <div className=" bg-[#40414F] flex justify-center items-center w-[95%] h-[75%] max-h-[50px] rounded-lg text-white gap-3 relative">
      {/* <PhotoIcon sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1 }} /> */}
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
        ref={inputRef}
      />

      {/* <GifBoxIcon sx={{ fontSize: 25, cursor: "pointer", marginRight: 1 }} /> */}
      <EmojiEmotionsIcon
        sx={{ fontSize: 25, cursor: "pointer", marginRight: 1 }}
        onClick={() => {
          setShowEmoji(!showEmoji)
        }}
      />
      <SendIcon
        sx={{ fontSize: 25, cursor: "pointer", marginRight: 1 }}
        onClick={(e) => handleKeyPress(e, "ok")}
      />
      {showEmoji && (
        <div className="absolute flex justify-center items-center bottom-16 right-0">

        <Picker
          data={data}
          onEmojiSelect={addEmojiHandler}
          emojiSize={20}
          emojiButtonSize={25}
          // maxFrequentRows={0}
          />
          </div>
      )}

      {/* <div>
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={toggleEmojiPicker}>Mostrar emojis</button>
      
      {emojiPickerVisible && (
  <EmojiPicker onEmojiClick={handleEmojiClick} />
)}
    </div> */}
    </div>
  );
}
