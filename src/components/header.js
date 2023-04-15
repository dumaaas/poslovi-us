import logoPic from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header() {
  const { asPath } = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const signOutFunc = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <header className=" py-[16px]  shadow-[0_5px_5px_-5px_rgba(0,0,0,0.75)]">
      <div className="container flex items-center justify-between">
        <div className=" flex items-center gap-[80px]">
          <Link href="/">
            <Image
              src={logoPic}
              alt="prologs-logo"
              className="lg:w-[210px] w-[120px]"
              placeholder="blur"
            />
          </Link>

          <div className="flex items-center gap-[25px] font-bold text-[16px] leading-[24px]">
            <Link
              href="/"
              className={asPath === "/" ? "text-red-500" : "text-[#334155]"}
            >
              Početna
            </Link>
            <Link
              href="/jobs"
              className={asPath === "/jobs" ? "text-red-500" : "text-[#334155]"}
            >
              Ponuda
            </Link>
            <Link
              href="/offers"
              className={
                asPath === "/offers" ? "text-red-500" : "text-[#334155]"
              }
            >
              Potražnja
            </Link>
            <Link
              href="/featured"
              className={
                asPath === "/featured" ? "text-red-500" : "text-[#334155]"
              }
            >
              Izdvajamo
            </Link>
            <Link
              href="/clients"
              className={
                asPath === "/clients" ? "text-red-500" : "text-[#334155]"
              }
            >
              Klijenti
            </Link>
            <Link
              href="/blog"
              className={asPath === "/blog" ? "text-red-500" : "text-[#334155]"}
            >
              Vesti
            </Link>
            <Link
              href="/about"
              className={
                asPath === "/about" ? "text-red-500" : "text-[#334155]"
              }
            >
              O nama
            </Link>
          </div>
        </div>
        <div className="flex gap-[20px]">
          {isLoggedIn && (
            <div className="flex gap-[20px]">
              <Link
                href="/dashboard"
                className="flex items-center text-sm bg-red-500 rounded-[8px] px-4 h-[38px] font-bold text-white border border-transparent hover:text-red-500 hover:bg-transparent hover:border-red-500 transition-all ease-out duration-250"
              >
                Dashboard
              </Link>
              <button
                href="/login"
                onClick={() => signOutFunc()}
                className="cursor-pointer flex items-center text-sm bg-red-500 rounded-[8px] px-4 h-[38px] font-bold text-white border border-transparent hover:text-red-500 hover:bg-transparent hover:border-red-500 transition-all ease-out duration-250"
              >
                Logout
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <Link
              href="/login"
              className="flex items-center text-sm bg-red-500 rounded-[8px] px-4 h-[38px] font-bold text-white border border-transparent hover:text-red-500 hover:bg-transparent hover:border-red-500 transition-all ease-out duration-250"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
