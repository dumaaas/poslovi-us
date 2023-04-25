import JobCardSecondary from "./jobCardSecondary";
import PlaceholderSecondaryCard from "./placeholderSecondaryCard";

import { useSelector } from "react-redux";

export default function jobList(props) {
  const isJobLoading = useSelector((state) => state.isJobLoading);

  return (
    <div>
      {props.jobs.length > 0 && (
        <p className="text-[#334155] text-xl font-bold mb-[20px]">
          {props.isOffering
            ? "Broj pronađenih ponuda: "
            : "Broj pronađenih poslova: "}{" "}
          {props.jobs.length}
        </p>
      )}
      {isJobLoading && props.jobs.length < 1 && (
        <div className="w-[200px] h-[28px] bg-white shine-anim mb-[20px] rounded-[8px]"></div>
      )}
      <div className="grid gap-y-4">
        {props.jobs.length > 0 &&
          props.jobs.map((item, index) => {
            return <JobCardSecondary job={item} key={index} />;
          })}
        {!isJobLoading && props.jobs.length < 1 && (
          <div className="flex flex-col items-start">
            <p className="text-[16px] leading-[24px] text-[#334155]">
              Nije pronađen nijedan rezultat.
            </p>
            {props.showResetButton() && (
              <button
                onClick={() => props.resetFilters()}
                className="font-bold mt-4 u-btn px-4 rounded-[8px] h-[38px] text-sm bg-gray-100"
              >
                Poništi filtere
              </button>
            )}
          </div>
        )}
        {isJobLoading && props.jobs.length < 1 && (
          <>
            {Array.from({ length: 6 }).map((_, index) => {
              return <PlaceholderSecondaryCard key={index} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}
