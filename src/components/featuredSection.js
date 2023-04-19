import SocialCard from "./socialCard";
import AdvertOfferCard from "./advertOfferCard";
import JobCardSecondary from "./jobCardSecondary";
import PlaceholderSecondaryCard from "./placeholderSecondaryCard";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { socialCards } from "@/helpers/staticData";
import { getFeaturedJobs } from "@/helpers/functions";

export default function featuredSection(props) {
  const dispatch = useDispatch();
  
  const isFeaturedJobLoading = useSelector(
    (state) => state.isFeaturedJobLoading
  );
  const featuredJobs = useSelector((state) => state.featuredJobs);

  useEffect(() => {
    if (!featuredJobs.length) getFeaturedJobs(dispatch);
  }, []);

  return (
    <div>
      {props.isFeatured && (
        <p className="text-[#334155] text-xl font-bold mb-[20px]">Izdvajamo</p>
      )}
      <div className="grid gap-y-4">
        {props.isFeatured && (
          <>
            {!isFeaturedJobLoading &&
              featuredJobs.length > 0 &&
              featuredJobs.map((item, index) => {
                return <JobCardSecondary job={item} key={index} />;
              })}

            {isFeaturedJobLoading && featuredJobs.length < 1 && (
              <>
                {Array.from({ length: 3 }).map((_, index) => {
                  return <PlaceholderSecondaryCard key={index} />;
                })}
              </>
            )}
          </>
        )}
        <AdvertOfferCard />
        <div className="flex flex-col gap-[20px]">
          {socialCards.map((item, index) => {
            return <SocialCard key={index} card={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
