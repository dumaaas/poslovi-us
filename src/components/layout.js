import Footer from "./footer";
import Header from "./header";
import { Outfit } from "next/font/google";
import { library } from "@fortawesome/fontawesome-svg-core";
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
  faXmark
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
  faXmark
);
const outfit = Outfit({ subsets: ["latin"] });
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { asPath } = useRouter();
  const showHeaderAndFooter = () => {
    if (asPath !== "/login" && asPath !== "/dashboard") return true;
    else return false;
  };

  return (
    <>
      <div className={outfit.className + " bg-white"}>
        {showHeaderAndFooter() && <Header />}
        <main>{children}</main>
        {showHeaderAndFooter() && <Footer />}
      </div>
    </>
  );
}
