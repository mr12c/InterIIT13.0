import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDrag } from "react-dnd"; 
import { setToggle } from "../AppStore/appSlice";

function Item({ item }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM", 
    item: { id: item?._id, name: item?.name,currentGodownId:item?.godown_id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleOnClick = () => {
    if (window.innerWidth < 640) {
      dispatch(setToggle(true));
    }
  };

  return (
    <div
      ref={drag}  
      draggable={true}
      className={`pl-6 my-1 text-[1rem] bg-violet-50 hover:bg-violet-100 py-1 rounded-lg ${isDragging ? "opacity-100" : "opacity-100"}`}
    >
      <NavLink to={`/${item._id}`} onClick={handleOnClick}>
        <i className="ri-file-3-line"></i> {item.name}
      </NavLink>
    </div>
  );
}

export default Item;
