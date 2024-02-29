import React from "react";
import { Link } from "react-router-dom";

export const ContactBar = () => {
  return (
    <>
      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">Contact</p>
        <hr className="border-gray-400" />
      </div>
      <div className="flex items-center justify-center space-x-14 text-gray-400 text-4xl mb-2 mt-1">
        <Link
          className="fa-brands fa-linkedin cursor-pointer"
          to="https://www.linkedin.com/in/joaquingaldeano/"
          target="_blank"
        />
        <Link
          className="fa-brands fa-github cursor-pointer"
          to="https://github.com/JoaGal"
          target="_blank"
        />
        <Link
          className="fa-solid fa-image-portrait cursor-pointer"
          to="https://portfolio-joagal.vercel.app/"
          target="_blank"
        />
      </div>
      <hr className="border-gray-400" />
    </>
  );
};
