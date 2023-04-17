import logoPic from "../../public/logo1.png";
import usPic from "../../public/us.svg";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function blogCard(props) {
  const shortDescFormater = (str) => {
    if (str.length > 400) {
      return str.slice(0, 400) + "...";
    } else {
      return str;
    }
  };

  return (
    <Link
      href={`/singleBlog/${props.blog.id}`}
      className={`flex-[30%] block border rounded-xl overflow-hidden  hover:ring-2 ring-red-500 transition-all group duration-200 ease-in-out border-[#6b7280] hover:border-l-8 hover:border-red-500 cursor-pointer relative`}
    >
      <div className="flex justify-between items-start gap-[10px] flex-wrap">
        <div className="flex gap-[15px] items-center lg:flex-row flex-col">
          <div style={{backgroundImage: `url(${props.blog.url})`}} className="lg:min-h-[220px] h-full lg:w-[250px] w-full min-w-full min-h-[200px]  lg:min-w-[250px] bg-center bg-no-repeat bg-cover">

          </div>

          <div className="flex flex-col gap-[10px] items-start p-4">
            <h3 className="text-[#334155] lg:text-[26px] lg:leading-[34px] text-[22px] leading-[28px] font-bold">
              {props.blog.title}
            </h3>
            <p className="text-[#6b7280] leading-[20px] text-[14px]">
              {shortDescFormater(props.blog.short_desc)}
            </p>
            {props.blog.published_at && (
              <div className="bg-[#F3F4F6] mt-[15px] text-[#334155] gap-[6px] items-center text-[12px] leading-[16px] font-bold rounded-lg px-2.5 py-1.5 inline-flex">
                <FontAwesomeIcon className="text-[#334155]" icon="calendar" />

                {props.blog.published_at.toDate().toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute transition-all duration-200 ease-in-out opacity-0 xl:group-hover:opacity-100 bottom-4 right-4">
        <Link
          href="/"
          className=" bg-red-500 flex items-center gap-[10px] font-bold text-white px-3 rounded-[8px] h-[28px] text-[12px] leading-[16px]"
        >
          Detaljnije
          <FontAwesomeIcon className="text-white" icon="arrow-right" />
        </Link>
      </div>
    </Link>
  );
}
