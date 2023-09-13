import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
export default function SendMessage() {
  return (
    <div className=" bg-[#40414F] flex justify-center items-center w-[95%] h-[75%] max-h-[50px] rounded-lg text-white gap-3 ">
      <AddCircleIcon sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1 }} />
      {/* <input
        className=" bg-[#40414F] rounded S  focus:outline-none w-full h-[100%] overflow-hidden"
        type="text"
        placeholder="Escribe mensaje a #general"
      /> */}

<textarea
  className="w-full min-h-[40px]  h-fit overflow-hidden bg-[#40414F] text-white p-2"
  placeholder="Escribe un mensaje..."
  // value={message}
  // onChange={(e) => setMessage(e.target.value)}
  // onKeyDown={handleKeyDown}

></textarea>

      <GifBoxIcon sx={{ fontSize: 25, cursor: "pointer", marginRight: 1 }} />
      <EmojiEmotionsIcon
        sx={{ fontSize: 25, cursor: "pointer", marginRight: 1 }}
      />
    </div>
  );
}
