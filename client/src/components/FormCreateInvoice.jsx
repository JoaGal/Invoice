import React from "react";
import { motion } from "framer-motion";
import { AddItem } from "./AddItem";
import { useDispatch, useSelector } from "react-redux";
import { newItem, resetNewInvoice } from "../redux/slice/invoiceSlice";
import { InputCreateInvoice } from "./InputCreateInvoice";
import { SelectPaymentTerm } from "./SelectPaymentTerm";
import { useControlInvoice } from "../hooks/useControlInvoice";

export const FormCreateInvoice = ({ setOpenCreateInvoice, type, id }) => {
  const dispatch = useDispatch();
  const newInvoice = useSelector((state) => state.invoices.newInvoice);
  const {
    street,
    city,
    postCode,
    country,
    clientName,
    clientEmail,
    clientStreet,
    clientCity,
    clientPostCode,
    clientCountry,
    date,
    paymentTerm,
    description,
    items,
  } = newInvoice;
  const { createInvoice, updateInvoice } = useControlInvoice();

  const handleSubmitInvoice = () => {
    if (type === "edit") {
      updateInvoice(id);
    } else {
      createInvoice();
    }
    setOpenCreateInvoice(false);
  };

  const closeCreateInvoice = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setOpenCreateInvoice(false);
    if (type === "edit") {
      dispatch(resetNewInvoice());
    }
  };

  return (
    <>
      <h1 className=" font-semibold dark:text-white text-3xl">
        {type == "edit" ? "Edit" : "Create"} Invoice
      </h1>

      <div className=" overflow-y-scroll scrollbar-hide my-14">
        <h1 className=" text-[#7c5dfa] mb-4 font-medium">Bill From</h1>

        <div className=" grid grid-cols-3 mx-1  space-y-4 ">
          <div className=" flex flex-col col-span-3">
            <InputCreateInvoice
              name="Street Address"
              value={street}
              nameInput="street"
            />
          </div>

          <div className=" flex flex-col mr-4 col-span-1">
            <InputCreateInvoice name="City" value={city} nameInput="city" />
          </div>
          <div className=" flex flex-col mr-4 col-span-1">
            <InputCreateInvoice
              name="Post Code"
              value={postCode}
              nameInput="postCode"
            />
          </div>
          <div className=" flex flex-col col-span-1">
            <InputCreateInvoice
              name="Country"
              value={country}
              nameInput="country"
            />
          </div>
        </div>

        {/* Bill to Section */}

        <h1 className=" text-[#7c5dfa] my-4 mt-10 font-medium">Bill To</h1>

        <div className=" grid grid-cols-3 mx-1   space-y-4 ">
          <div className=" flex flex-col col-span-3">
            <InputCreateInvoice
              name="Client Name"
              value={clientName}
              nameInput="clientName"
            />
          </div>
          <div className=" flex flex-col   col-span-3">
            <InputCreateInvoice
              name="Client Email"
              value={clientEmail}
              nameInput="clientEmail"
            />
          </div>
          <div className=" flex flex-col col-span-3">
            <InputCreateInvoice
              name="Street Address"
              value={clientStreet}
              nameInput="clientStreet"
            />
          </div>
          <div className=" flex flex-col mr-4 col-span-1">
            <InputCreateInvoice
              name="City"
              value={clientCity}
              nameInput="clientCity"
            />
          </div>
          <div className=" flex flex-col mr-4 col-span-1">
            <InputCreateInvoice
              name="Post Code"
              value={clientPostCode}
              nameInput="clientPostCode"
            />
          </div>
          <div className=" flex flex-col col-span-1">
            <InputCreateInvoice
              name="Country"
              value={clientCountry}
              nameInput="clientCountry"
            />
          </div>
        </div>
        <div className=" grid mx-1 grid-cols-2 mt-8 ">
          <div className=" flex flex-col mr-4">
            <InputCreateInvoice
              name="Date"
              value={date}
              nameInput="date"
              type="date"
            />
          </div>
          <div className=" mx-auto w-full">
            <SelectPaymentTerm value={paymentTerm} />
          </div>
        </div>

        <div className=" mx-1 mt-4 flex flex-col ">
          <InputCreateInvoice
            name="description"
            value={description}
            nameInput="description"
          />
        </div>

        {/* Item List Section */}

        <h2 className=" text-2xl text-gray-500 mt-10 ">Item List</h2>
        {items.map((item, i) => (
          <div className=" border-b pb-2 border-gray-300 mb-4 ">
            <AddItem key={i} item={item} index={i} />
          </div>
        ))}

        <button
          onClick={() => {
            dispatch(newItem());
          }}
          className=" bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl  w-full mt-6"
        >
          + Add New Item
        </button>
      </div>

      <div className=" flex  justify-between">
        <div>
          <button
            onClick={closeCreateInvoice}
            className=" bg-gray-200  hover:opacity-80 mx-auto py-4 items-center dark:text-white  dark:bg-[#252945] justify-center  px-8 rounded-full "
          >
            Discard
          </button>
        </div>

        <div>
          <button
            className=" text-white  hover:opacity-80 mx-auto py-4 items-center bg-[#7c5dfa] justify-center  px-8 rounded-full "
            onClick={handleSubmitInvoice}
          >
            Save & Send
          </button>
        </div>
      </div>
    </>
  );
};
