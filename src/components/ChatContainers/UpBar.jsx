import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

export default function UpBar({channelName}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-[98%] h-full">
      <div>
        <h1># {channelName || "???"}</h1>
      </div>
      <div className="flex justify-between items-center gap-1 ">



        {/* <div className=" flex justify-between items-center bg-[#40414F] rounded   ">
          <input
            type="text"
            className="bg-[#40414F] rounded py-1 pl-3 focus:outline-none "
          />
                <SearchIcon sx={{ fontSize: 25, marginRight:1, cursor: "pointer", marginLeft: 1}}/>
        </div> */}
                <HomeIcon         sx={{
          fontSize: 25,
          cursor: "pointer",
          marginLeft: 3,
          marginRight: 1,
          transition: "color 0.3s ease",
          "&:hover": {
            color: "grey",
            scale: "1.1",
          },
        }} onClick={() => navigate("/")}/>



      </div>
    </div>
  );
}
