import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Godown from "../Components/Godown";
import useFetchDataPostAxios from "../cu/index4.js";
import { setToggle } from "../AppStore/appSlice";
import axios from "axios";

function Sidebar() {
  const { toggle } = useSelector((state) => state.AppSlice);
  const dispatch = useDispatch();
  const {data} = useFetchDataPostAxios("/godown/allgodown");
  const [godownData, setGodownData] = useState([]);
  const [godown_id, setGodown_id] = useState();
  const [item_id,setItem_id] = useState();
  useEffect(() => {
    if (data) {
      setGodownData(data.godownData);
      console.log(data.godownData)
    }
  }, [data]);

    //  useEffect(()=>
    //   {
    //     const func = async () =>{
    //       try{
    //         const response = await axios.post('https://interiit13-0-3.onrender.com/api/v1/item/changeGodown',{godown_id,item_id})
    //         console.log(response.data)
    //       }
    //       catch(error){
    //         console.log(error)
    //       }
    //     }
    //     func()
      
    //  },[item_id,godown_id])

  const handleItemDrop = (draggedItem, targetGodownId) => {
    console.log("Item dropped:", draggedItem);
    console.log("Dropped on godown ID:", targetGodownId);
    setGodown_id(targetGodownId)
    setItem_id(draggedItem.id)
  };

  return (
    <div className={`lg:w-[23%] bg-white absolute lg:static text-black overflow-scroll h-[100vh] sidebar-transition transition-transform ${toggle ? "-translate-x-[120%]" : "translate-x-0"}`}>
      <div className="mt-[20%] mx-auto gap-1 h-[100vh] flex flex-col">
        {data
          ? godownData.map((item, index) => (
              <Godown key={index} depth={0} godownData={item} onItemDrop={handleItemDrop} />
            ))
          : <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>}
      </div>
    </div>
  );
}

export default Sidebar;
