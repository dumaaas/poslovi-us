import usPic from "../../public/us.svg";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { takeInitials } from "@/helpers/functions";

export default function jobCardSecondary(props) {
  return (
    <Link
      href={`/singleJob/${props.job.id}`}
      className={`${
        props.job.featured_plus ? "bg-[#FEF08A]" : "bg-white"
      } flex-[30%] block border rounded-xl overflow-hidden p-4 hover:ring-2 ring-red-500 transition-all group duration-200 ease-in-out border-[#6b7280] hover:border-l-8 hover:border-red-500 cursor-pointer relative`}
    >
      <div className="flex justify-between items-start gap-[10px] flex-wrap">
        <div className="flex gap-[15px] items-center">
          {props.job.offer_type === "offer" && (
            <div
              className={`${
                props.job.featured_plus ? "border-[#6b7280]" : "border-white"
              } rounded-[8px] w-[60px] h-[60px] p-2 bg-red-100 flex items-center justify-center border `}
            >
              <img
                src={props.job.url}
                alt="prologs-logo"
                className="h-auto w-auto rounded-[8px]"
              />
            </div>
          )}
          {props.job.offer_type === "offering" && props.job.url.length < 1 && (
            <div
              className={`${
                props.job.featured_plus ? "border-[#6b7280]" : "border-white"
              } rounded-[8px] w-[60px] h-[60px] p-2 bg-red-100 flex items-center justify-center border `}
            >
              <p className="text-[20px] font-bold text-[#334155]">
                {takeInitials(props.job.name)}
              </p>
            </div>
          )}
          {props.job.offer_type === "offering" && props.job.url.length > 0 && (
            <div
              className={`${
                props.job.featured_plus ? "border-[#6b7280]" : "border-white"
              } rounded-[8px] w-[60px] h-[60px] bg-red-100 flex items-center justify-center border `}
            >
              <img
                src={props.job.url}
                alt="prologs-logo"
                className="h-auto w-auto rounded-[8px]"
              />
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-[#334155] text-[16px] leading-[24px] font-bold">
              {props.job.position}
            </h3>

            <p className="text-[#6b7280] leading-[20px] text-[14px]">
              {props.job.job_type} - {props.job.name}
            </p>
          </div>
        </div>
        {props.job.featured_plus && (
          <div className="text-[#854d0e] text-sm flex items-center gap-[4px] font-bold">
            <FontAwesomeIcon className=" text-[#854d0e]" icon="star" />
            Izdvojeno
          </div>
        )}
      </div>
      <div className=" mt-[15px] flex flex-row gap-[10px] flex-wrap items-center">
        <div className="bg-[#F3F4F6] text-[#334155] gap-[6px] items-center text-[12px] leading-[16px] font-bold rounded-lg px-1.5 py-0.5 inline-flex">
          <div className="w-[12px] h-[12px]">
            <Image src={usPic} alt="us-logo" className="w-full h-full" />
          </div>
          {props.job.location}
        </div>
        <div
          className={` text-purple-500 gap-[5px] bg-purple-100 items-center text-[12px] leading-[16px] font-bold rounded-lg px-1.5 py-0.5 inline-flex`}
        >
          <FontAwesomeIcon className="text-purple-500 " icon="dollar-sign" />
          {props.job.salary}
        </div>
        <div
          className={` text-blue-500 gap-[5px] bg-blue-100 items-center text-[12px] leading-[16px] font-bold rounded-lg px-1.5 py-0.5 inline-flex`}
        >
          {props.job.category}
        </div>
      </div>
      <div className="absolute transition-all duration-200 ease-in-out opacity-0 xl:group-hover:opacity-100 bottom-4 right-4">
        <div className=" bg-red-500 flex items-center gap-[10px] font-bold text-white px-3 rounded-[8px] h-[28px] text-[12px] leading-[16px]">
          Detaljnije
          <FontAwesomeIcon className="text-white" icon="arrow-right" />
        </div>
      </div>
    </Link>
  );
}
