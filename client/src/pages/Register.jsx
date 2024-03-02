import React from "react";
import Img from "../assets/login.jpg";
import { RegisterData } from "../Data/RegisterData";
import { useControlUser } from "../hooks/useControlUser";
import { FormAuthUser } from "../components/FormAuthUser";
import { ContactBar } from "../components/ContactBar";
import { Container } from "../components/Container";

function Register() {
  const { registerUser } = useControlUser();

  return (
    <Container auth={true}>
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
    </Container>
  );
}

export default Register;
