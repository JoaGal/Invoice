import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import arrowDown from "../assets/icon-arrow-down.svg";
import InvoiceCard from "../components/InvoiceCard";
import { useSelector } from "react-redux";
import CreateInvoice from "../components/CreateInvoice";
import { useLocation } from "react-router-dom";
import { useControlUser } from "../hooks/useControlUser";
import { CreateInvoiceButton } from "../components/CreateInvoiceButton";
import { useControlInvoice } from "../hooks/useControlInvoice";
import invoiceData from "../Data/invoice.json";

function Home() {
  const location = useLocation();
  const controls = useAnimation();
  const user = useSelector((state) => state.user);
  const filter = ["paid", "pending"];
  const [isDropdown, setIsDropdown] = useState(false);
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);
  const { getUser } = useControlUser();
  const { getInvoice } = useControlInvoice();
  const [filterValue, setfilterValue] = useState("");
  const allInvoices = useSelector((state) => state.invoices.allInvoices);
  const token = localStorage.getItem("token");

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    });
    getUser();
  }, [controls]);

  useEffect(() => {
    if (user?.id !== "" && allInvoices[0]?.id === undefined) {
      getInvoice();
    }
  }, [user]);

  const transition = {
    stiffness: 200,
  };

  const varients = {
    open: { opacity: 1, x: -20, duration: 200, transition },
    close: { opacity: 0, x: -100, duration: 500, transition },
  };

  const handelFilter = (value) => {
    if (value === filterValue) {
      setfilterValue("");
      setIsDropdown(false);
    } else {
      setfilterValue(value);
      setIsDropdown(false);
    }
  };

  return (
    <div>
      <div className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]  ">
        <motion.div
          key={location.pathname}
          initial={{ x: "0" }}
          animate={{ x: 0 }}
          exit={{ x: "-150%" }}
          transition={{ duration: 0.5 }}
          className="   max-w-3xl flex flex-col   mx-auto my-auto"
        >
          {/* Center Header */}

          <div className=" min-w-full max-h-[64px] flex items-center justify-between">
            <div>
              <h1 className=" lg:text-4xl md:text-2xl  text-xl  dark:text-white tracking-wide font-semibold">
                Invoices
              </h1>
              <p className=" text-gray-500 font-light">
                There are {allInvoices.length} total invoices.
              </p>
            </div>

            <div className=" flex  max-h-full  items-center ">
              <div
                className=" flex items-center cursor-pointer"
                onClick={() => {
                  setIsDropdown((state) => !state);
                }}
              >
                <p className="block dark:text-white font-medium">Filter</p>
                <div className="ml-3 ">
                  {
                    <motion.img
                      src={arrowDown}
                      animate={
                        isDropdown
                          ? { transition, rotate: -180 }
                          : { transition, rotate: 0 }
                      }
                    />
                  }
                </div>
              </div>
              {isDropdown && (
                <motion.div
                  as="select"
                  variants={varients}
                  animate={isDropdown ? "open" : "close"}
                  className="  w-40 bg-white dark:bg-[#1E2139] dark:text-white flex px-6 py-4 flex-col  top-[160px] lg:top-[120px]  absolute  shadow-2xl rounded-xl space-y-2    "
                >
                  {filter.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handelFilter(item)}
                      className=" items-center cursor-pointer flex space-x-2 "
                    >
                      <input
                        value={item}
                        checked={filterValue === item ? true : false}
                        type="checkbox"
                        className=" accent-[#7c5dfa] hover:accent-[#7c5dfa] "
                      />
                      <p>{item}</p>
                    </div>
                  ))}
                </motion.div>
              )}
              <CreateInvoiceButton
                setOpenCreateInvoice={setOpenCreateInvoice}
              />
            </div>
          </div>
          {/* Invoice Cards */}

          <div className=" mt-10   space-y-4">
            {(token !== null ? allInvoices : invoiceData).map(
              (invoice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2 },
                  }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <InvoiceCard invoice={invoice} />
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {openCreateInvoice && (
          <CreateInvoice setOpenCreateInvoice={setOpenCreateInvoice} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
