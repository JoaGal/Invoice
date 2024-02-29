import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "pending",
  street: "",
  city: "",
  postCode: "",
  country: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  date: "",
  paymentTerm: "",
  description: "",
  items: [
    {
      idInvoice: "",
      idUser: "",
      name: "",
      quantity: "",
      price: "",
    },
  ],
  idUser: null,
};

const invoiceSlice = createSlice({
  name: "invoces",

  initialState: {
    allInvoices: [],
    newInvoice: initialState,
    filteredInvoice: [],
    invoiceById: null,
  },

  reducers: {
    inputInvoice: (state, action) => {
      const { name, value } = action.payload;
      state.newInvoice[name] = value;
    },
    inputItems: (state, action) => {
      const {index, name, value } = action.payload;
      if (index >= 0 && index < state.newInvoice.items.length ) {
        state.newInvoice.items[index][name] = value;
      }
    },
    newItem: (state, action) => {
      state.newInvoice.items.push({
        idInvoice: '',
        idUser: '',
        name: '',
        quantity: '',
        price: '',
      });
    },
    deleteItem: (state, action) => {
      const {index} = action.payload;
      if (index !== -1) {
        state.newInvoice.items.splice(index, 1);
      }
    },
    resetNewInvoice: (state) => {
      state.newInvoice = initialState
    },
    setAllInvoices: (state, action)=> {
      state.allInvoices = action.payload;
    },
    editInvoice: (state, action)=> {
      state.newInvoice = action.payload;
    },
    // updateInvoiceStatus: (state, action)=> {
    //   const {status} = action.payload;
    //   if (status === "pending"){
    //     state.newInvoice.status = "paid"
    //   }else{
    //     state.newInvoice.status = "pending"
    //   }
    // },
  },
});

export const {
  inputInvoice,
  inputItems,
  newItem,
  deleteItem,
  resetNewInvoice,
  setAllInvoices,
  editInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
