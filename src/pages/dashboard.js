import logoPic from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import JobsCms from "@/components/jobsCms";
import ClientCms from "@/components/clientCms";
import BlogCms from "@/components/blogCms";

export default function dashboard() {
  const [isOpened, setIsOpened] = useState(true);
  const [activeMenu, setActiveMenu] = useState("jobs");

  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full p-4 z-[999] shadow-[0_5px_5px_-5px_rgba(0,0,0,0.75)] bg-white">
        <div className="flex items-center justify-between ">
          <div className="flex flex-row gap-[20px] items-center">
            <Link href="/" className="mr-[40px]">
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
          <div className="gap-[20px] items-center md:flex hidden">
            <p className="text-[20px] leading-[26px] text-[#334155]">
              Dobrodošli, Stefane!
            </p>
          </div>
        </div>
      </div>

      <div
        className={` px-4 mt-[112px] pb-8 relative z-[99]`}
      >
        {activeMenu === "jobs" && <JobsCms />}
        {activeMenu === "clients" && <ClientCms />}
        {activeMenu === "blog" && <BlogCms />}
      </div>
    </div>
  );
}
