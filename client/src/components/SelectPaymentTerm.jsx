import React from "react";
import { inputInvoice } from "../redux/slice/invoiceSlice";
import { useDispatch } from "react-redux";

export const SelectPaymentTerm = ({ value }) => {
  const dispatch = useDispatch();
  const paymentTerms = [
    { text: "Next 1 day" },
    { text: "Next 7 day" },
    { text: "Next 14 day" },
    { text: "Next 30 day" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(inputInvoice({ name, value }));
  };

  return (
    <>
      <label className=" text-gray-400 font-light">Payment Terms</label>
      <select
        value={value}
        onChange={handleChange}
        className=" appearance-none w-full py-2 px-4 border-[.2px] rounded-lg focus:outline-none  dark:bg-[#1e2139] dark:text-white dark:border-gray-800  focus:outline-purple-400 border-gray-300 select-status"
        name="paymentTerm"
      >
        {paymentTerms.map((term, index) => (
          <option key={index} value={term.text}>
            {term.text}
          </option>
        ))}
      </select>
    </>
  );
};
