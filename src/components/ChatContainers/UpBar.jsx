import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from '@mui/icons-material/Search';
export default function UpBar() {
  return (
    <div className="flex justify-between items-center w-[98%] h-full">
      <div>
        <h1>#General</h1>
      </div>
      <div className="flex justify-between items-center gap-1 ">
        <AddCircleIcon
          sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1 }}
        />
        <AddCircleIcon
          sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1 }}
        />


        <div className=" flex justify-between items-center bg-[#40414F] rounded   ">
          <input
            type="text"
            className="bg-[#40414F] rounded py-1 pl-3 focus:outline-none "
          />
                <SearchIcon sx={{ fontSize: 25, marginRight:1, cursor: "pointer", marginLeft: 1}}/>
        </div>


        <AddCircleIcon
          sx={{ fontSize: 25, cursor: "pointer", marginLeft: 1 }}
        />
      </div>
    </div>
  );
}
