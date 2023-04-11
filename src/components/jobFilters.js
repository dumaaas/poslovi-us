import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobCardSecondary from "./jobCardSecondary";

export default function jobFilters(props) {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-9">
        <div className=" lg:col-span-2 lg:sticky">
          <div className="lg:top-[20px] lg:sticky flex flex-col gap-4">
            <h5 className="text-[16px] leading-[24px] font-bold text-[#6b7280]">
              Filteri
            </h5>
            <div className="h-[38px] relative">
              <FontAwesomeIcon
                className="text-[#334155] absolute left-[10px] top-[50%] transform translate-y-[-50%]"
                icon="search"
              />
              <input
                className="border w-full h-full text-[14px] pr-[14px] pl-[34px]  leading-[20px] text-[#334155] rounded-[8px]"
                placeholder="Filter po poziciji..."
              />
            </div>

            <div className="h-[38px] relative cursor-pointer">
              <FontAwesomeIcon
                className="text-[#334155] absolute right-[10px] top-[50%] transform translate-y-[-50%]"
                icon="angle-down"
              />
              <input
                className="cursor-pointer border w-full h-full text-[14px] pl-[14px] pr-[34px]  leading-[20px] text-[#334155] rounded-[8px]"
                placeholder="Filter po gradu..."
              />
              <div className="border w-full max-h-[180px] overflow-auto bg-white rounded-[8px] mt-[2px]">
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
                <p className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]">
                  Niksic
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="grid gap-y-4">
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary isFeatured={true} />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary isFeatured={true} />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
            <JobCardSecondary />
          </div>
        </div>
        {props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="text-[#334155] text-xl font-bold mb-[20px]">
              Izdvajamo
            </p>
            <div className="grid gap-y-4">
              <JobCardSecondary />
              <JobCardSecondary isFeatured={true} />
              <JobCardSecondary />
              <JobCardSecondary />
              <JobCardSecondary />
              <JobCardSecondary />
              <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] mb-[20px] bg-red-500 text-white">
                Želite da izdvojite vaš oglas od ostalih? Kontaktirajte nas.
              </p>
            </div>
          </div>
        )}
        {!props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] mb-[20px] bg-red-500 text-white">
              Želite da izdvojite vaš oglas od ostalih? Kontaktirajte nas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
