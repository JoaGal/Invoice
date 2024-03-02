import React from "react";
import { InputAuthUser } from "./InputAuthUser";

export const FormAuthUser = ({ data, func, title }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {data.map((item) => (
        <InputAuthUser
          key={item.id}
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
        />
      ))}
      <button
        onClick={func}
        className="bg-[#7c5dfa] rounded-full text-white py-2 hover:scale-105 duration-300"
      >
        {title}
      </button>
    </div>
  );
};
