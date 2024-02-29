import React from "react";

export const ItemsCard = ({ items }) => {
  return (
    <>
      {items?.map((item) => (
        <div key={item.name} className=" flex justify-around">
          <div className=" space-y-4">
            <p className=" text-gray-400 font-thin">Item name</p>

            <h1 className=" dark:text-white text-base font-semibold">
              {item.name}
            </h1>
          </div>
          <div className=" space-y-4">
            <p className=" text-gray-400 font-thin">Qty.</p>

            <h1 className=" dark:text-white text-base font-semibold">
              {item.quantity}
            </h1>
          </div>
          <div className=" space-y-4">
            <p className=" text-gray-400 font-thin">Item price</p>

            <h1 className=" dark:text-white text-base font-semibold">
              £{item.price}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
};
