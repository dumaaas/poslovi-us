import Footer from "./footer";
import Header from "./header";
import LogoutToast from "./logoutToast";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/router";

import Cookies from "js-cookie";

import { Urbanist } from "next/font/google";

import { signOutToastHandler, showHeaderAndFooter } from "@/helpers/functions";
require("@/helpers/fontawesomeHandler");

const urbanist = Urbanist({ subsets: ["latin"] });

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { asPath } = useRouter();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (Cookies.get("accessTokenPosloviLogin")) {
      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
    } else {
      if (isLoggedIn) {
        signOutToastHandler(
          "Vaša sesija je istekla. Molimo vas ulogujte se ponovo.",
          dispatch
        );
      }
      dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
    }
  });

  return (
    <>
      <div className={urbanist.className + " bg-white overflow-hidden relative"}>
        <LogoutToast />
        {showHeaderAndFooter(asPath) && <Header />}
        <main>{children}</main>
        {showHeaderAndFooter(asPath) && <Footer />}
      </div>
    </>
  );
}
