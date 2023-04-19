import logoPic from "../../public/logo.png";

import Image from "next/image";
import Link from "next/link";

import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import Router from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveAuthTokens } from "@/helpers/functions";

export default function login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) Router.push("/dashboard/jobs");
  });

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
        saveAuthTokens(user.accessToken, user.expirationTime);
        Router.push("/dashboard/jobs");
      })
      .catch((error) => {
        console.error(error.message);
        setErrorMessage("Neispravni pristupni podaci.");
        setEmail("");
        setPassword("");
        dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
      });
  };

  return (
    <div className="flex flex-col gap-[15px] justify-center items-center w-screen h-screen px-2 py-12">
      <div className="sm:w-[420px] w-[90%]">
        <Link href="/">
          <Image
            src={logoPic}
            alt="prologs-logo"
            className="lg:w-[210px] w-[180px] mx-auto"
            placeholder="blur"
          />
        </Link>
        <h2 className="mt-[20px] md:mb-[40px] sm:mb-[34px] mb-[28px] text-center lg:text-[36px] lg:leading-[40px] md:text-[32px] md:leading-[38px] sm:text-[28px] sm:leading-[36px] text-[24px] leading-[30px] text-[#334155]">
          Ulogujte se na Vaš nalog
        </h2>
        <div className="mt-[15px] flex flex-col gap-[5px]">
          <label className="text-[14px] leading-[20px] font-bold text-[#334155]">
            Email
          </label>
          <input
            className="border h-[50px] px-[14px] lg:text-[18px] lg:leading-[28px] text-[16px] leading-[24px] text-[#334155] rounded-[8px]"
            type="text"
            placeholder="Vaš email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
          ></input>
        </div>
        <div className="mt-[15px] flex flex-col gap-[5px]">
          <label className="text-[14px] leading-[20px] font-bold text-[#334155]">
            Lozinka
          </label>
          <input
            className="border h-[50px] px-[14px] lg:text-[18px] lg:leading-[28px] text-[16px] leading-[24px] text-[#334155] rounded-[8px]"
            type="password"
            placeholder="Vaša lozinka"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
          ></input>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-[14px] leading-[20px] mt-[5px]">
            {errorMessage}
          </p>
        )}
        <button
          onClick={() => login()}
          className="mt-[25px] px-6 rounded-[10px] lg:h-[50px] h-[44px] lg:text-lg text-base text-white bg-red-500 hover:text-red-500 hover:bg-transparent transition-all ease-in-out duration-250 border-transparent hover:border-red-500 border w-full"
        >
          Ulogujte se
        </button>
      </div>
    </div>
  );
}
