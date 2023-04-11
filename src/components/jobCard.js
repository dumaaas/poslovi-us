import logoPic from "../../public/logo1.png";
import usPic from "../../public/us.svg";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function JobCard(props) {
  return (
    <Link
      href="/singleJob"
      className={`${
        props.isFeatured ? "bg-[#FEF08A]" : "bg-white"
      } flex-[30%] block border rounded-xl overflow-hidden p-4 hover:ring-2 ring-red-500 transition-all group duration-200 ease-in-out border-[#6b7280] hover:border-l-8 hover:border-red-500 cursor-pointer relative`}
    >
      <div className="flex justify-between gap-[20px] flex-wrap">
        <div className="flex gap-[15px] items-center">
          <Image
            src={logoPic}
            alt="prologs-logo"
            className="w-[48px] h-[48px] rounded-[8px]"
            placeholder="blur"
          />
          <div className="flex flex-col">
            <h3 className="text-[#334155] text-[16px] leading-[24px] font-bold">
              Quantify
            </h3>
            <p className="text-[#6b7280] leading-[20px] text-[14px]">
              Full-time / Senior
            </p>
          </div>
        </div>
        {props.isFeatured && (
          <div className="text-[#854d0e] text-sm flex items-center gap-[4px] font-bold">
            <FontAwesomeIcon className=" text-[#854d0e]" icon="star" />
            Izdvojeno
          </div>
        )}
      </div>

      <div className="my-[15px] flex flex-row gap-[10px] flex-wrap items-center">
        <div
          className={`${
            props.isFeatured ? "bg-[#F3F4F6]" : "bg-white border"
          }  text-[#334155] gap-[6px] items-center text-[12px] leading-[16px] font-bold rounded-lg px-1.5 py-0.5 inline-flex`}
        >
          <div className="w-[12px] h-[12px]">
            <Image src={usPic} alt="us-logo" className="w-full h-full" />
          </div>
          Chicago, USA
        </div>
        <div
          className={` text-purple-500 gap-[5px] bg-purple-100 items-center text-[12px] leading-[16px] font-bold rounded-lg px-1.5 py-0.5 inline-flex`}
        >
          <FontAwesomeIcon className="text-purple-500 " icon="dollar-sign" />
          USD80000~/yr
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <h4 className="font-bold text-[18px] leading-[28px] text-[#334155]">
          Senior Full Stack Engineer (TypeScript, Python)
        </h4>
        <p className="text-[14px] leading-[20px] text-[#6b7280]">
          Colabra's mission is to increase the world's scientific output through
          the power of AI. We're backed by top investors including Village
          Global...
        </p>
      </div>
      <div className="flex items-center justify-between mt-[15px]">
        <Link
          href="/"
          className=" bg-[#F1F5F9] flex items-center gap-[10px] font-bold text-[#334155] px-3 rounded-[8px] h-[28px] text-[12px] leading-[16px]"
        >
          Saznaj više
          <FontAwesomeIcon className=" text-[#334155]" icon="arrow-right" />
        </Link>
        <p className="text-[12px] leading-[16px] text-[#6b7280]">Full-time</p>
      </div>
    </Link>
  );
}
