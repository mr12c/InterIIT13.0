import React, { useState } from "react";
import Godown from "./Godown";
function SubGodown() {
  const [isActive,setIsActive] = useState(false);
  const depth = 2
  return (
    <div className=" text-[1.2rem] bg-slate-200   px-2 py-1">
      <div onClick={()=>setIsActive(prev=>!prev)} className="cursor-pointer flex  justify-between items-center">
        <div className="flex gap-3 items-center ">
          <i className=" text-[1.2rem] ri-home-6-fill "></i>{" "}
          <span>{"kolkata highway main sub "}</span>
        </div>
        <span>{!isActive? <i class="ri-arrow-down-s-line"></i> : <i class="ri-arrow-up-s-line"></i>}</span>
      </div>
      <div className={`${isActive? "block":"hidden"}`}>
      {depth < 3 && <Godown depth={depth + 1} />}
      </div>
    </div>
  );
}

export default SubGodown;
