import logoPic from "../../public/logo1.png";
import usPic from "../../public/us.svg";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function JobCard(props) {
  const shortDescFormater = (str) => {
    if (str.length > 135) {
      return str.slice(0, 135) + "...";
    } else {
      return str;
    }
  };
  const takeInitials = (name) => {
    let result = "";
    for (let i = 0; i < name.length; i++) {
      const currentChar = name.charAt(i);

      if (
        currentChar === currentChar.toUpperCase() &&
        currentChar.match(/[A-Z]/)
      ) {
        result += currentChar;

        if (result.length === 2) {
          break;
        }
      }
    }
    return result;
  };
  return (
    <Link
      href={`/singleJob/${props.job.id}`}
      className={`${
        props.job.featured_plus ? "bg-[#FEF08A]" : "bg-white"
      } lg:flex-[30%] md:flex-[45%] flex-[100%] flex flex-col border rounded-xl overflow-hidden p-4 hover:ring-2 ring-red-500 transition-all group duration-200 ease-in-out border-[#6b7280] hover:border-l-8 hover:border-red-500 cursor-pointer relative`}
    >
      <div className="flex justify-between gap-[20px] flex-wrap">
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
          {props.job.offer_type === "offering" && (
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

          <div className="flex flex-col">
            <h3 className="text-[#334155] text-[16px] leading-[24px] font-bold">
              {props.job.name}
            </h3>
            <p className="text-[#6b7280] leading-[20px] text-[14px]">
              {props.job.job_type}
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

      <div className="my-[15px] flex flex-row gap-[10px] flex-wrap items-center">
        <div
          className={`${
            props.job.featured_plus ? "bg-[#F3F4F6]" : "bg-white border"
          }  text-[#334155] gap-[6px] items-center text-[12px] leading-[16px] font-bold rounded-lg px-1.5 py-0.5 inline-flex`}
        >
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
      </div>
      <div className="flex flex-col gap-[12px] justify-between flex-1">
        <h4 className="font-bold text-[18px] leading-[28px] text-[#334155]">
          {props.job.position}
        </h4>
        <p className="text-[14px] leading-[20px] text-[#6b7280]">
          {shortDescFormater(props.job.short_desc)}
        </p>
        <div className="flex items-center justify-between mt-[3px]">
          <Link
            href="/"
            className=" bg-[#F1F5F9] flex items-center gap-[10px] font-bold text-[#334155] px-3 rounded-[8px] h-[28px] text-[12px] leading-[16px]"
          >
            Saznaj više
            <FontAwesomeIcon className=" text-[#334155]" icon="arrow-right" />
          </Link>
          <p className="text-[12px] leading-[16px] text-[#6b7280]">
            {props.job.job_type}
          </p>
        </div>
      </div>
    </Link>
  );
}
