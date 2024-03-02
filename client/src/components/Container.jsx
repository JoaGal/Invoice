import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Container = ({ children, auth }) => {
  const location = useLocation();

  return (
    <div
      className={`dark:bg-[#141625] flex ${
        auth && "md:items-center"
      } justify-center scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]`}
    >
      <motion.div
        key={location.pathname}
        initial={{ x: "0" }}
        animate={{ x: 0 }}
        exit={{ x: "-150%" }}
        transition={{ duration: 0.5 }}
        className=" max-w-3xl flex flex-col w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
