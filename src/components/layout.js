import Footer from "./footer";
import Header from "./header";
import LogoutToast from "./logoutToast";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cookies from "js-cookie";

import { Outfit } from "next/font/google";

const { library } = require("@fortawesome/fontawesome-svg-core");

import { signOutToastHandler } from "@/helpers/functions";

import {
  faSearch,
  faArrowRight,
  faAngleDown,
  faStar,
  faClock,
  faEnvelope,
  faPhone,
  faCalendar,
  faDollarSign,
  faBars,
  faXmark,
  faCheck,
  faSpinner,
  faPenToSquare,
  faTrash,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faArrowRight,
  faSearch,
  faAngleDown,
  faStar,
  faClock,
  faEnvelope,
  faPhone,
  faCalendar,
  faDollarSign,
  faBars,
  faXmark,
  faCheck,
  faSpinner,
  faPenToSquare,
  faTrash,
  faExpand
);

const outfit = Outfit({ subsets: ["latin"] });

export default function Layout({ children }) {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const showHeaderAndFooter = () => {
    if (asPath !== "/login" && asPath !== "/dashboard") return true;
    else return false;
  };

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
      <div className={outfit.className + " bg-white overflow-hidden relative"}>
        <LogoutToast />
        {showHeaderAndFooter() && <Header />}
        <main>{children}</main>
        {showHeaderAndFooter() && <Footer />}
      </div>
    </>
  );
}
