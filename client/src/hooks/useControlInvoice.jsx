import Axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetNewInvoice, setAllInvoices } from "../redux/slice/invoiceSlice";
import sortData from "../functions/sortData";
import { useNavigate } from "react-router-dom";
import forwardDate from "../functions/forwardDate";

export const useControlInvoice = () => {
  const dispatch = useDispatch();
  const newInvoice = useSelector((state) => state.invoices.newInvoice);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const createInvoice = () => {
    Axios.post("http://localhost:3306/invoices/create", {
      idUser: user?.id,
      street: newInvoice?.street,
      city: newInvoice?.city,
      postCode: newInvoice?.postCode,
      country: newInvoice?.country,
      description: newInvoice?.description,
      clientEmail: newInvoice?.clientEmail,
      clientName: newInvoice?.clientName,
      clientStreet: newInvoice?.clientStreet,
      clientCity: newInvoice?.clientCity,
      clientPostCode: newInvoice?.clientPostCode,
      clientCountry: newInvoice?.clientCountry,
      status: "pending",
      date: newInvoice?.date,
      paymentTerm: newInvoice?.paymentTerm,
      items: newInvoice?.items,
    })
      .then(() => {
        dispatch(resetNewInvoice());
        getInvoice();
      })
      .catch((err) => {
        console.log("Error creating invoice", err);
      });
  };

  const updateInvoice = (id) => {
    Axios.put("http://localhost:3306/invoices/update", {
      id: id,
      street: newInvoice?.street,
      city: newInvoice?.city,
      postCode: newInvoice?.postCode,
      country: newInvoice?.country,
      description: newInvoice?.description,
      clientEmail: newInvoice?.clientEmail,
      clientName: newInvoice?.clientName,
      clientStreet: newInvoice?.clientStreet,
      clientCity: newInvoice?.clientCity,
      clientPostCode: newInvoice?.clientPostCode,
      clientCountry: newInvoice?.clientCountry,
      status: newInvoice?.status,
      date: newInvoice?.date,
      paymentTerm: newInvoice?.paymentTerm,
      items: newInvoice?.items,
    })
      .then(() => {
        dispatch(resetNewInvoice());
        getInvoice();
      })
      .catch((err) => {
        console.log("Error updating invoice", err);
      });
  };

  const getInvoice = () => {
    if (user?.id !== "") {
      Axios.get(`http://localhost:3306/invoices/get/${user?.id}`)
        .then((res) => {
          const allInvoices = res.data.invoices.map(invoice => ({
            ...invoice,
            // Assuming your date field is named 'date'. Adjust if it's named differently.
            date: forwardDate(invoice.date) 
          }));
          const invoices = sortData(allInvoices, res.data.items);
          dispatch(setAllInvoices(invoices));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteInvoice = (id) => {
    Axios.delete(
      `http://localhost:3306/invoices/delete/${id}`
    ).then(() => {
      navigate("/")
    })
    .catch((err) => {
      console.log("Error delete invoice", err);
    });
  };

  const updateStatusInvoice = (id, status) => {
    Axios.put("http://localhost:3306/invoices/update/status", {
      id: id,
      status: `${status === "paid" ? "pending" : "paid"}`,
    })
      .then(() => {
        dispatch(resetNewInvoice());
        getInvoice();
      })
      .catch((err) => {
        console.log("Error updating invoice", err);
      });
  }

  return { createInvoice, getInvoice, deleteInvoice, updateInvoice, updateStatusInvoice };
};
