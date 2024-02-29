import React, { useState } from "react";
import logo from "../assets/logo.png";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import useDarkMode from "../hooks/useDarkMode";
import profileUser from "../assets/profileUser.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  const [colorTheme, setTheme] = useDarkMode();

  const toggleDarkMode = () => {
    setTheme(colorTheme);
  };

  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 10,
  };

  return (
    <header>
      <div className=" z-50 block">
        <div className=" lg:fixed z-50  lg:w-[100px] w-full lg:h-screen lg:rounded-r-3xl  flex-col  top-0 left-0 dark:bg-[#1E2139]  bg-[#373b53]">
          <div className=" h-full w-full flex lg:flex-col justify-between items-center ">
            {/* Logo */}
            <Link to="/">
              <img src={logo} className="relative max-lg:h-20" />
            </Link>
            {/* Bottom Side */}
            <div className="flex lg:flex-col  items-center lg:mb-4 max-lg:mr-4">
              {colorTheme === "light" ? (
                <motion.img
                  onClick={toggleDarkMode}
                  initial={{ scale: 0.6, rotate: 90 }}
                  animate={{ scale: 1, rotate: 360, transition }}
                  whileTap={{ scale: 0.9, rotate: 15 }}
                  src={moon}
                  className="cursor-pointer h-10"
                />
              ) : (
                <motion.img
                  className="cursor-pointer h-10"
                  onClick={toggleDarkMode}
                  whileTap={{ scale: 0.9, rotate: 15 }}
                  initial={{ rotate: 45 }}
                  animate={{ rotate: 360, transition }}
                  src={sun}
                />
              )}
              <div className=" lg:w-[100px]  max-lg:h-16 border-dotted lg:border-t border-r  border-[#494e6e] max-lg:mx-4 lg:my-6"></div>
              <Link to="/login">
                <img src={profileUser} className="h-[50px] rounded-full " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
