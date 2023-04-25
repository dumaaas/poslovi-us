import Hero from "@/components/hero";
import JobFilters from "@/components/jobFilters";
import Subscription from "@/components/subscription";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getJobsData } from "@/helpers/functions";

export default function jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);

  useEffect(() => {
    if (!jobs.length) getJobsData(dispatch);
  }, []);

  return (
    <div>
      <Hero
        title="Spojite se sa najboljim poslodavcima u Americi!"
        description="Pretražite listu aktivnih poslova i aplicirajte!"
        isBig="false"
      />
      <JobFilters isFeatured={true} jobs={jobs} />
      <Subscription />
    </div>
  );
}
