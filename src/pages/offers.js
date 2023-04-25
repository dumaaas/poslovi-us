import Hero from "@/components/hero";
import JobFilters from "@/components/jobFilters";
import Subscription from "@/components/subscription";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getDemandJobs } from "@/helpers/functions";

export default function jobs() {
  const dispatch = useDispatch();
  const demandJobs = useSelector((state) => state.demandJobs);

  useEffect(() => {
    if (!demandJobs.length) getDemandJobs(dispatch);
  }, []);

  return (
    <div>
      <Hero
        title="Odaberite pravog kandidata za Vašu kompaniju"
        description="Pretražite listu i ponudite im saradnju!"
        isBig="false"
      />
      <JobFilters isFeatured={true} jobs={demandJobs} isOffering={true} />
      <Subscription />
    </div>
  );
}
