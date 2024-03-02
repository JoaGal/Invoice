import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Img from "../assets/login.jpg";
import { useControlUser } from "../hooks/useControlUser";
import InputAuthUser from "../components/InputAuthUser";
import { LoginData } from "../Data/LoginData";
import { ContactBar } from "../components/ContactBar";
import { FormAuthUser } from "../components/FormAuthUser";

function Login() {
  const location = useLocation();
  const { loginUser, logoutUser } = useControlUser();

  return (
    <div>
      <div className="dark:bg-[#141625] flex md:items-center justify-center scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]  ">
        <motion.div
          key={location.pathname}
          initial={{ x: "0" }}
          animate={{ x: 0 }}
          exit={{ x: "-150%" }}
          transition={{ duration: 0.5 }}
          className=" max-w-3xl flex flex-col w-full"
        >
          {/* Center Header */}
          <div className="flex md:items-center  duration-10 rounded-lg w-full">
            <div className="md:w-1/2 px-8 w-full">
              {!localStorage.getItem("token") ? (
                <>
                  <h2 className="font-semibold lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide">
                    Sing in
                  </h2>
                  <p className="text-gray-500 font-ligh">
                    If you are a member, sing in!
                  </p>
                  <FormAuthUser
                    data={LoginData}
                    func={loginUser}
                    title="Sing in"
                  />
                </>
              ) : (
                <button
                  onClick={logoutUser}
                  className="bg-[#7c5dfa] w-full rounded-full text-white py-2 hover:scale-105 duration-300"
                >
                  Logout
                </button>
              )}
              <ContactBar />
              {!localStorage.getItem("token") && (
                <div className="mt-3 text-xs flex justify-between items-center text-[#7c5dfa]">
                  <p>Don't have an account?</p>
                  <Link
                    to="/register"
                    className="py-2 md:px-5 px-3 bg-white border rounded-full hover:scale-110 duration-300"
                  >
                    Sing up
                  </Link>
                </div>
              )}
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

export default Login;
