import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function PrivateChannels() {
  const [openChannels, setOpenChannels] = useState(true)

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
        <h1>Canales Privados</h1>
      </div>

      {openChannels && <div className="mt-2 overflow-y-auto overflow-x-hidden scrollbar w-[100%] h-fit">
        <p className="ml-5"># General</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo A</p>
        <p className="ml-5"># Grupo B</p>

 
      </div>}
    </>
  );
}
