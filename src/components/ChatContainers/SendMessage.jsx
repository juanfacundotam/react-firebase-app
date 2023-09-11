import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GifBoxIcon from '@mui/icons-material/GifBox';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
export default function SendMessage() {
  return (
    <div className=" bg-[#40414F] flex justify-center items-center w-[95%] h-[80%] rounded-lg text-white gap-3 ">
      <AddCircleIcon sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1}}/>
      <input
        className=" bg-[#40414F] rounded py-2  focus:outline-none w-full"
        type="text"
        placeholder="Escribe mensaje a #general"
      />
 <GifBoxIcon sx={{ fontSize: 25, cursor: "pointer", marginRight: 1}}/>
 <EmojiEmotionsIcon sx={{ fontSize: 25, cursor: "pointer", marginRight: 1}}/>

    </div>
  );
}
