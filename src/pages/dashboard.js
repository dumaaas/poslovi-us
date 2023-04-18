import logoPic from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import JobsCms from "@/components/jobsCms";
import ClientCms from "@/components/clientCms";
import BlogCms from "@/components/blogCms";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function dashboard() {
  const [activeMenu, setActiveMenu] = useState("jobs");
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const router = useRouter();

  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn && (
        <div className="relative w-screen h-screen overflow-x-hidden">
          <div className="fixed top-0 left-0 w-full p-4 z-[999] shadow-[0_5px_5px_-5px_rgba(0,0,0,0.75)] bg-white">
            <div className="flex items-center justify-between ">
              <div className="flex flex-row md:gap-[20px] gap-[10px] items-center">
                <Link href="/" className="md:mr-[40px] mr-[10px] sm:block hidden">
                  <Image
                    src={logoPic}
                    alt="prologs-logo"
                    className="lg:w-[180px] w-[120px]"
                    placeholder="blur"
                  />
                </Link>
                <p
                  onClick={() => setActiveMenu("jobs")}
                  className={`cursor-pointer ${
                    activeMenu === "jobs" ? "text-red-500" : "text-[#334115]"
                  }`}
                >
                  Oglasi
                </p>
                <p
                  onClick={() => setActiveMenu("clients")}
                  className={`cursor-pointer ${
                    activeMenu === "clients" ? "text-red-500" : "text-[#334115]"
                  }`}
                >
                  Klijenti
                </p>
                <p
                  onClick={() => setActiveMenu("blog")}
                  className={`cursor-pointer ${
                    activeMenu === "blog" ? "text-red-500" : "text-[#334115]"
                  }`}
                >
                  Vesti
                </p>
              </div>
              <div className="gap-[20px] items-center flex">
                <p className="text-[18px] leading-[24px] text-[#334155] hidden md:block">
                  Dobrodošli, Stefane!
                </p>
                <div className="h-[25px] w-[1px] bg-[#334155] md:block hidden"></div>
                <button
                  href="/login"
                  onClick={() => signOutFunc()}
                  className="cursor-pointer flex items-center text-sm bg-red-500 rounded-[8px] md:px-4 px-2 md:h-[38px] h-[34px] font-bold text-white border border-transparent hover:text-red-500 hover:bg-transparent hover:border-red-500 transition-all ease-out duration-250"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className={` px-4 mt-[112px] pb-8 relative z-[99]`}>
            {activeMenu === "jobs" && <JobsCms />}
            {activeMenu === "clients" && <ClientCms />}
            {activeMenu === "blog" && <BlogCms />}
          </div>
        </div>
      )}
    </div>
  );
}
