import React from "react";
import { useDispatch } from "react-redux";
import { inputInvoice, inputItems } from "../redux/slice/invoiceSlice";

export const InputCreateInvoice = ({ name, value, nameInput, type, index }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (index === undefined) {
      const { name, value } = e.target;
      dispatch(inputInvoice({ name, value }));
    } else {
      const { name, value } = e.target;
      dispatch(inputItems({ index, name, value }));
    }
  };

  return (
    <>
      <label className=" text-gray-400 font-light">{name}</label>
      <input
        type={type || "text"}
        value={value}
        name={nameInput}
        onChange={handleChange}
        className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none  rounded-lg  focus:outline-purple-400 border-gray-300 dark:border-gray-800"
      />
    </>
  );
};
