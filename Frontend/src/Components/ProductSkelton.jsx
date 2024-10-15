import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse z-[-3] relative w-full mt-5 flex flex-col md:flex-row justify-between items-start p-4 md:p-8 bg-white">
   
      <div className="flex flex-col items-center md:w-1/3 xl:w-[1/2]">
        <div className="h-[500px] max-w-[700px] w-[90vw] bg-gray-300 rounded-md"></div>
        <div className="flex mt-4 space-x-2">
          
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-gray-300 rounded border border-gray-300"
              ></div>
            ))}
        </div>
      </div>

       
      <div className="mt-6 md:mt-0 md:ml-8 md:w-1/3 lg:w-1/3 xl:w-1/2">
         <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="ml-2 w-24 h-6 bg-gray-300"></div>
        </div>

         <div className="w-2/3 h-8 bg-gray-300 mb-4"></div>

         <div className="flex items-center mt-2">
          <div className="text-lg bg-gray-300 w-16 h-6"></div>
          <div className="ml-2 w-12 h-4 bg-gray-300"></div>
        </div>

         <div className="w-1/2 h-12 bg-gray-300 mt-4"></div>

         <div className="mt-9">
          <h1 className="mb-2">Category</h1>
          <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
        </div>

         <div className="mt-4 flex gap-2 border-2 border-gray-300 w-fit px-4 items-center rounded-full py-1">
          <h1>Quantity: </h1>
          <div className="w-8 h-4 bg-gray-300"></div>
        </div>

         <div className="mt-6">
          <h2 className="text-lg font-semibold">Size</h2>
          <div className="grid w-[90vw] md:w-[100%] mx-auto grid-cols-3 gap-2 mt-2">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="p-2 border-2 border-gray-300 rounded-full bg-gray-300"
                ></div>
              ))}
          </div>
        </div>

         <div className="mt-6">
          <div className="w-full bg-gray-300 h-12 rounded-full"></div>
        </div>

         <div className="text-sm mt-4 bg-gray-300 h-4 w-3/4"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
