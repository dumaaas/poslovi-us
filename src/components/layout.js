import Footer from "./footer";
import Header from "./header";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cookies from "js-cookie";

import { Outfit } from "next/font/google";

const { library } = require("@fortawesome/fontawesome-svg-core");

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
  const [isUserSignedOut, setIsUserSignedOut] = useState(false);
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
        setIsUserSignedOut(true);
        setTimeout(() => {
          setIsUserSignedOut(false);
        }, 3000);
      }
      dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
    }
  });

  return (
    <>
      <div className={outfit.className + " bg-white overflow-hidden relative"}>
        <div
          className={`${
            isUserSignedOut
              ? "opacity-1 scale-100 z-[99999999]"
              : "z-[-1] opacity-0 scale-75"
          } transform sca transition-all ease-out duration-300 absolute top-4 right-4  bg-green-500 text-green-100 px-[12px] py-[8px] rounded-lg`}
        >
          Vaša sesija je istekla. Molimo vas ulogujte se ponovo.
        </div>
        {showHeaderAndFooter() && <Header />}
        <main>{children}</main>
        {showHeaderAndFooter() && <Footer />}
      </div>
    </>
  );
}
