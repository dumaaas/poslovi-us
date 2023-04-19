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
        title="Pronađite najbolje poslove u Americi"
        description="Pretražite listu poslova, nađite savršeni spoj i aplicirajte!"
        isBig="false"
      />
      <JobFilters isFeatured={true} jobs={jobs} />
      <Subscription />
    </div>
  );
}
