import JobCard from "./jobCard";
import PlaceholderCard from "./placeholderCard";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function JobsHero(props) {
  return (
    <div style={{ backgroundColor: props.background }} className="">
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-red-500">
              {props.title}
            </span>
            <h2 className="text-[#334155] font-semibold md:mt-4 mt-2 text-xl lg:text-3xl">
              {props.description}
            </h2>
          </div>
          <Link
            href={props.link}
            className="md:flex hidden transition-all ease-in-out duration-250 bg-red-500 hover:bg-transparent group hover:text-red-500 border border-transparent hover:border-red-500 items-center gap-[10px] font-bold text-white px-4 rounded-[8px] h-[38px] text-sm"
          >
            {props.buttonText}
            <FontAwesomeIcon
              className="text-white transition-all ease-in-out group-hover:text-red-500 duration-250"
              icon="arrow-right"
            />
          </Link>
        </div>
        <div className="flex justify-between gap-[20px] md:gap-[25px] py-[30px] md:py-[40px] flex-wrap">
          {props.jobs.length > 0 &&
            props.jobs.map((item) => {
              return <JobCard key={item.id} job={item} />;
            })}
          {props.jobs.length < 1 && (
            <>
              {Array.from({ length: 6 }).map((_, index) => {
                return <PlaceholderCard key={index} />;
              })}
            </>
          )}
        </div>
        <div className="flex items-center justify-center w-full mx-auto md:hidden">
          <Link
            href={props.link}
            className=" transition-all ease-in-out duration-250 bg-red-500 hover:bg-transparent group hover:text-red-500 border border-transparent hover:border-red-500 inline-flex items-center gap-[10px] font-bold text-white px-4 rounded-[8px] h-[38px] text-sm"
          >
            {props.buttonText}
            <FontAwesomeIcon
              className="text-white transition-all ease-in-out group-hover:text-red-500 duration-250"
              icon="arrow-right"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
