import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import leftArrow from "../assets/icon-arrow-left.svg";
import { AnimatePresence } from "framer-motion";
import { PaidStatus } from "../components/PaidStatus";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../functions/formatDate";
import { DeleteModal } from "../components/DeleteModal";
import { FormCreateInvoice } from "../components/FormCreateInvoice";
import { editInvoice } from "../redux/slice/invoiceSlice";
import { useControlInvoice } from "../hooks/useControlInvoice";
import { useControlUser } from "../hooks/useControlUser";
import { ItemsCard } from "../components/ItemsCard";
import totalPrice from "../functions/totalPrice";
import { Container } from "../components/Container";

function InvoiceInfo() {
  const navigate = useNavigate();
  const { getInvoice, updateStatusInvoice } = useControlInvoice();
  const { getUser } = useControlUser();
  const { idInvoice } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allInvoices = useSelector((state) => state.invoices.allInvoices);
  const filteredInvoice = allInvoices.find(
    (invoice) => invoice.id === parseInt(idInvoice)
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.id !== "" && allInvoices[0]?.id === undefined) {
      getInvoice();
    }
  }, [user]);

  const handleEditInvoice = () => {
    dispatch(editInvoice(filteredInvoice));
    setIsEditOpen(true);
  };

  const changeStatus = () => {
    updateStatusInvoice(idInvoice, filteredInvoice?.status);
  };

  return (
    <>
      <Container>
        <button
          onClick={() => navigate(-1)}
          className=" flex items-center space-x-4  group  dark:text-white font-thin "
        >
          <img className="" src={leftArrow} />
          <p className=" group-hover:opacity-80">Go back</p>
        </button>
        {/*Status Invoice */}
        <div className=" mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#1e2139]">
          <div className=" flex space-x-2 md:w-auto w-full items-center">
            <h1 className=" text-gray-600 dark:text-gray-400">Status</h1>
            <PaidStatus type={filteredInvoice?.status} />
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleEditInvoice}
              className=" text-[#7e88c3]  dark:bg-[#252945] hover:opacity-80 max-md:text-sm  bg-slate-100 p-2 md:p-3 md:px-7 rounded-xl md:rounded-full "
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className=" md:ml-3 ml-2   text-white bg-red-500 hover:opacity-80 max-md:text-sm p-2 md:p-3 md:px-7 rounded-xl md:rounded-full"
            >
              Delete
            </button>

            <button
              onClick={changeStatus}
              className=" md:ml-3 ml-2 text-white bg-[#7c5dfa] hover:opacity-80 max-md:text-sm p-2 md:p-3 md:px-7 rounded-xl md:rounded-full"
            >
              {filteredInvoice?.status === "paid" ? "Pending" : "Paid"}
            </button>
          </div>
        </div>
        {/*Personal Infromation */}
        <div className=" mt-4 rounded-lg w-full  px-6 py-6 bg-white dark:bg-[#1e2139]">
          <div className=" flex flex-col md:flex-row items-start justify-between w-full ">
            <div>
              <h1 className=" font-semibold dark:text-white text-xl">
                <span className="text-[#7e88c3]">#</span>
                {filteredInvoice?.id}
              </h1>
              <p className=" text-sm text-gray-500">
                {filteredInvoice?.clientName}
              </p>
            </div>
            <div className=" mt-4 md:mt-0 text-left text-gray-400 text-sm md:text-right felx flex-col items-center">
              <p>{filteredInvoice?.street}</p>
              <p>{filteredInvoice?.city}</p>
              <p>{filteredInvoice?.postCode}</p>
              <p>{filteredInvoice?.country}</p>
            </div>
          </div>
          <div className=" mt-10 grid grid-cols-2 md:flex md:justify-between w-full  md:grid-cols-3">
            <div className=" flex flex-col justify-between">
              <div>
                <h3 className=" text-gray-400 font-thin ">Invoice Date</h3>
                <h1 className=" text-lg font-semibold dark:text-white">
                  {formatDate(filteredInvoice?.date)}
                </h1>
              </div>
              <div>
                <h3 className=" text-gray-400 font-thin ">Payment Due</h3>
                <h1 className=" dark:text-white text-lg font-semibold">
                  {filteredInvoice?.paymentTerm}
                </h1>
              </div>
            </div>

            <div className="">
              <p className=" text-gray-400 font-thin">Bill to</p>
              <h1 className=" dark:text-white text-lg font-semibold">
                {filteredInvoice?.clientName}
              </h1>
              <p className=" text-gray-400 font-thin">
                {filteredInvoice?.clientStreet}
              </p>
              <p className=" text-gray-400 font-thin">
                {filteredInvoice?.clientCity}
              </p>
              <p className=" text-gray-400 font-thin">
                {filteredInvoice?.clientPostCode}
              </p>
              <p className=" text-gray-400 font-thin">
                {filteredInvoice?.clientCountry}
              </p>
            </div>

            <div className=" mt-8 md:mt-0">
              <p className=" text-gray-400 font-thin">Sent to</p>
              <h1 className=" dark:text-white text-lg font-semibold">
                {filteredInvoice?.clientEmail}
              </h1>
            </div>
          </div>
          {/*Items invoice */}
          <div className="block mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4 p-4 sm:p-10">
            <ItemsCard items={filteredInvoice?.items} />
          </div>
          <div className=" p-10 font-semibold text-white rounded-lg rounded-t-none justify-between flex dark:bg-black bg-gray-700 ">
            <h3 className=" text-xl ">Amount Due</h3>

            <h1 className=" text-3xl">
              £{filteredInvoice && totalPrice(filteredInvoice)}
            </h1>
          </div>
        </div>
      </Container>

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          id={idInvoice}
        />
      )}
      <AnimatePresence>
        {isEditOpen && (
          <FormCreateInvoice
            id={idInvoice}
            type="edit"
            setOpenCreateInvoice={setIsEditOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default InvoiceInfo;
