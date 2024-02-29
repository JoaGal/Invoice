import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import InvoiceInfo from "./pages/InvoiceInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();

  return (
    <div className=" dark:bg-[#141625] duration-300 min-h-screen bg-[#f8f8fb]">
      <Navbar />
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<Home />} path="/" />
            <Route element={<InvoiceInfo />} path="/:idInvoice" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
