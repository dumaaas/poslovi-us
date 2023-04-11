import logoPic from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Router from "next/router";
import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { UserContext } from "@/context/userContext";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setIsLoggedIn(true);
        Router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage("Neispravni pristupni podaci.");
        setEmail("");
        setPassword("");
        setIsLoggedIn(false);
      });
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(user, "HEJ USER");
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="flex flex-col gap-[15px] justify-center items-center w-screen h-screen px-2 py-12">
      <div className="max-w-[420px] w-[420px]">
        <Link href="/">
          <Image
            src={logoPic}
            alt="prologs-logo"
            className="lg:w-[210px] w-[180px] mx-auto"
            placeholder="blur"
          />
        </Link>
        <h2 className="mt-[20px] mb-[40px] text-center text-[36px] leading-[40px] text-[#334155]">
          Ulogujte se na Vaš nalog
        </h2>
        <div className="mt-[15px] flex flex-col gap-[5px]">
          <label className="text-[14px] leading-[20px] font-bold text-[#334155]">
            Email
          </label>
          <input
            className="border h-[50px] px-[14px] text-[18px] leading-[28px] text-[#334155] rounded-[8px]"
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
            className="border h-[50px] px-[14px] text-[18px] leading-[28px] text-[#334155] rounded-[8px]"
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
          className="mt-[25px] px-6 rounded-[10px] h-[50px] text-lg text-white bg-red-500 hover:text-red-500 hover:bg-transparent transition-all ease-in-out duration-250 border-transparent hover:border-red-500 border w-full"
        >
          Ulogujte se
        </button>
      </div>
    </div>
  );
}
