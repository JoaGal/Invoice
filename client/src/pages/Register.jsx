import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Img from "../assets/login.jpg";
import { RegisterData } from "../Data/RegisterData";
import { useControlUser } from "../hooks/useControlUser";
import { FormAuthUser } from "../components/FormAuthUser";
import { ContactBar } from "../components/ContactBar";

function Register() {
  const location = useLocation();
  const { registerUser } = useControlUser();

  return (
    <div>
      <div className="dark:bg-[#141625] flex md:items-center justify-center scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]  ">
        <motion.div
          key={location.pathname}
          initial={{ x: "0" }}
          animate={{ x: 0 }}
          exit={{ x: "-150%" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl flex flex-col w-full"
        >
          {/* Center Header */}
          <div className="flex md:items-center  duration-10 rounded-lg w-full">
            <div className="md:w-1/2 px-8 w-full">
              <h2 className="font-semibold lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide">
                Sing up
              </h2>
              <p className="text-gray-500 font-ligh">
                If you are a member, sing up!
              </p>
              <FormAuthUser
                data={RegisterData}
                func={registerUser}
                title="Sing up"
              />
              <ContactBar />
              <p className="mt-3 text-xs flex justify-between items-center text-[#7c5dfa]">
                Sing up to have an unforgettable experience
              </p>
            </div>
            <div className="md:block hidden w-1/2">
              <img className="rounded-2xl" src={Img} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
