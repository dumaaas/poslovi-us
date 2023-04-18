import logoPic from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const { asPath } = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileNavRef]);

  useEffect(() => {
    document.querySelector("html").style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <header className="relative py-[16px] shadow-[0_5px_5px_-5px_rgba(0,0,0,0.75)]">
      <div className="container flex items-center justify-between ">
        <div className="flex items-center xl:gap-[80px] gap-[30px]">
          <Link href="/">
            <Image
              src={logoPic}
              alt="prologs-logo"
              className="lg:w-[210px] w-[150px]"
              placeholder="blur"
            />
          </Link>

          <div className="lg:flex hidden items-center xl:gap-[25px] gap-[20px] font-bold text-[16px] leading-[24px]">
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
        <div className="lg:flex hidden gap-[20px]">
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
        <div className="flex lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon
            className="w-[30px] h-[30px] cursor-pointer"
            color="#334155"
            icon="bars"
          />
        </div>
      </div>
      <div
        ref={mobileNavRef}
        className={`${
          menuOpen
            ? "lg:hidden translate-x-0 opacity-1"
            : "translate-x-[100%] opacity-0"
        } shadow-[-1px_0px_1px_rgba(239,68,68,1)] transition-all duration-200 ease-linear z-[999] flex flex-col px-[20px] absolute top-0 right-0 w-[300px] h-[100vh] transform  bg-white`}
      >
        <FontAwesomeIcon
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-[21px] h-[21px] cursor-pointer absolute right-[20px] top-[20px]"
          color="black"
          icon="xmark"
        />
        <div className="flex flex-col justify-start items-start gap-[20px] mt-[80px]">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`${
              asPath === "/" ? "text-red-500" : "text-[#334155]"
            }  text-[15px] sm:text-[16px] md:text-[18px] font-bold
            `}
          >
            POČETNA
          </Link>
          <Link
            href="/jobs"
            onClick={() => setMenuOpen(false)}
            className={`${
              asPath === "/jobs" ? "text-red-500" : "text-[#334155]"
            }  text-[15px] sm:text-[16px] md:text-[18px] font-bold
            `}
          >
            PONUDA
          </Link>
          <Link
            href="/offers"
            onClick={() => setMenuOpen(false)}
            className={`${
              asPath === "/offers" ? "text-red-500" : "text-[#334155]"
            }  text-[15px] sm:text-[16px] md:text-[18px] font-bold
            `}
          >
            POTRAŽNJA
          </Link>
          <Link
            href="/featured"
            onClick={() => setMenuOpen(false)}
            className={`${
              asPath === "/featured" ? "text-red-500" : "text-[#334155]"
            }  text-[15px] sm:text-[16px] md:text-[18px] font-bold
            `}
          >
            IZDVAJAMO
          </Link>
          <Link
            href="/clients"
            onClick={() => setMenuOpen(false)}
            className={`${
              asPath === "/clients" ? "text-red-500" : "text-[#334155]"
            }  text-[15px] sm:text-[16px] md:text-[18px] font-bold
            `}
          >
            KLIJENTI
          </Link>
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className={`${
              asPath === "/blog" ? "text-red-500" : "text-[#334155]"
            }  text-[15px] sm:text-[16px] md:text-[18px] font-bold
            `}
          >
            VESTI
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className={`${
              asPath === "/about" ? "text-red-500" : "text-[#334155]"
            }  text-[15px] sm:text-[16px] md:text-[18px] font-bold
            `}
          >
            O NAMA
          </Link>
          {isLoggedIn && (
            <div className="flex flex-col gap-[20px]">
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center text-sm bg-red-500 rounded-[8px] px-4 h-[38px] font-bold text-white border border-transparent hover:text-red-500 hover:bg-transparent hover:border-red-500 transition-all ease-out duration-250"
              >
                Dashboard
              </Link>
              <button
                href="/login"
                onClick={() => signOutFunc()}
                className="cursor-pointer flex items-center justify-center text-sm bg-red-500 rounded-[8px] px-4 h-[38px] font-bold text-white border border-transparent hover:text-red-500 hover:bg-transparent hover:border-red-500 transition-all ease-out duration-250"
              >
                Logout
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center text-sm bg-red-500 rounded-[8px] px-4 h-[38px] font-bold text-white border border-transparent hover:text-red-500 hover:bg-transparent hover:border-red-500 transition-all ease-out duration-250"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
