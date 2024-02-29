import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from './slice/invoiceSlice'
import userSlice from "./slice/userSlice";


const store = configureStore({
  reducer: {
    invoices: invoiceSlice,
    user: userSlice,
  }
})

export default store
