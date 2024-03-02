import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slice/userSlice";

export const InputAuthUser = ({ type, name, placeholder, value }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUser({ name, value }));
  };

  return (
    <input
      className="p-2 dark:bg-[#1e2139] dark:text-white border-[.2px] border-gray-300 dark:border-gray-800 focus:outline-none  rounded-lg  focus:outline-purple-400"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
};
