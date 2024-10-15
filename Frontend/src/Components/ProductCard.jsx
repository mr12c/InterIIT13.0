import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({item}) => {
  return (
    <div className="bg-white border mx-auto rounded-lg p-4 w-[90%] gap-3 md:w-80 lg:w-66 shadow-sm hover:shadow-lg transition-shadow">
       
      <div className="flex justify-center">
        <img
          src={item?.image_url}  
          alt="Product"
          className="w-30 h-40 object-contain rounded-lg"
        />
      </div>

      
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {item?.name}
        </h2>
        <p className="text-gray-600">${item?.price}</p>
      </div>

      
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">★</span>
        <span className="ml-1 text-gray-800">4.9</span>
        <span className="text-gray-600 ml-2">{item?.quantity} Quantity</span>
      </div>

      
      <div className="flex items-center mt-2 text-gray-600">
       <NavLink onClick={()=> Window.scrollTo(0,0)} to={`/${item._id}`} className="bg-violet-500 px-4 py-1 text-white  rounded-full">view</NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
