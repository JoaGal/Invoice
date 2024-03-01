import React from "react";
import PaidStatus from "./PaidStatus";
import rightArrow from "../assets/icon-arrow-right.svg";
import { Link } from "react-router-dom";
import formatDate from "../functions/formatDate";
import totalPrice from "../functions/totalPrice";

function InvoiceCard({ invoice }) {
  

  return (
    <Link to={`/${invoice.example === true ? "login" : invoice.id}`}>
      <div className="flex cursor-pointer duration-100  ease-in-out  hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg  items-center justify-between">
        <div className=" flex max-md:flex-col items-start md:items-center ">
          <h2 className=" dark:text-white ">
            <span className=" text-[#7e88c3]">#</span>
            {invoice.id}
          </h2>
          <h2 className=" text-sm  text-gray-400 font-light md:ml-6 ">
            Due {formatDate(invoice.date)}
          </h2>
          <h2 className=" text-sm text-gray-400 font-weigth md:font-light md:ml-10">
            {invoice.clientName}
          </h2>
        </div>
        <div className="  flex max-md:flex-col-reverse items-center max-md:w-[100px]">
          <h1 className="text-lg md:text-xl md:mr-8 max-md:mt-1 dark:text-white">
            £ {totalPrice(invoice)}
          </h1>
          <PaidStatus type={invoice.status} />
          <img src={rightArrow} className="max-md:hidden ml-4" />
        </div>
      </div>
    </Link>
  );
}

export default InvoiceCard;
