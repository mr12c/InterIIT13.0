import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd"; 
import Item from "./Item";

function Godown({ depth, godownData, onItemDrop }) {
  const [isActive, setIsActive] = useState(false);

  // Define the drop behavior for godowns
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (draggedItem) => {
      if (godownData?.id !== draggedItem.currentGodownId) {
        onItemDrop(draggedItem, godownData?.id);  
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [godownData]);

  const handleItemDrop = (draggedItem, targetGodownId) => {
    console.log("Item dropped:", draggedItem);
    console.log("Dropped on godown ID:", targetGodownId);
   
  };


  useEffect(() => {
    // Activate only if the godown is hovered over and it can accept the drop
    if (isOver && canDrop) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isOver, canDrop]);

  return (
    <div
      ref={drop}
      className={`pl-4 text-[1.2rem] ${
        isActive ? "border-violet-600" : ""
      } border-2 border-violet-100 bottom-1 rounded-lg px-2 py-1 transition-colors`}
    >
      <div
        onClick={() => setIsActive((prev) => !prev)}
        className="cursor-pointer flex justify-between items-center"
      >
        <div className="flex gap-3 items-center">
          <i className="ri-home-6-fill"></i>{" "}
          <span>{godownData.name}</span>
        </div>
        <span>
          {!isActive ? (
            <i className="ri-arrow-down-s-line"></i>
          ) : (
            <i className="ri-arrow-up-s-line"></i>
          )}
        </span>
      </div>

      <div className={`${isActive ? "block" : "hidden"} transition-all pl-4`}>
        {/* Render items in the godown */}
        {godownData.items &&
          godownData.items.map((item, index) => (
            <Item key={index} item={item} />
          ))}

        {/* Render subGodowns */}
        {godownData.subGodowns &&
          godownData.subGodowns.map((subGodown, index) => (
            <Godown
              key={index}
              depth={depth + 1}
              godownData={subGodown}
              onItemDrop={handleItemDrop}
            />
          ))}
      </div>
    </div>
  );
}

export default Godown;
