import Hero from "@/components/hero";
import JobFilters from "@/components/jobFilters";
import Subscription from "@/components/subscription";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getFeaturedJobs } from "@/helpers/functions";

export default function jobs() {
  const dispatch = useDispatch();
  const featuredJobs = useSelector((state) => state.featuredJobs);

  useEffect(() => {
    if (!featuredJobs.length) getFeaturedJobs(dispatch);
  }, []);

  return (
    <div>
      <Hero
        title="Premium poslovi"
        description="Postanite dio renomiranih kompanija!"
        isBig="false"
      />
      <JobFilters isFeatured={false} jobs={featuredJobs} />
      <Subscription />
    </div>
  );
}
