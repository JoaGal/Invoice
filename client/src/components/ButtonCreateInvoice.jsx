import React from "react";
import plus from "../assets/plus.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ButtonCreateInvoice = ({ setOpenCreateInvoice }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleOnClick = () => {
    if (user.id !== "") {
      setOpenCreateInvoice(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className=" hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 px-2 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full"
    >
      <img src={plus} alt="" />
      <p className=" md:block hidden text-white font-semibold text-lg">
        New invoice
      </p>
      <p className=" md:hidden block text-white font-semibold text-base">New</p>
    </button>
  );
};
