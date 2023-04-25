import ClientBanner from "@/components/clientBanner";
import Hero from "@/components/hero";
import JobsHero from "@/components/jobsHero";
import Subscription from "@/components/subscription";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getFeaturedJobs,
  getClientData,
  getLatestDemandJobs,
  getLatestFeaturedJobs,
  getLatestJobData,
} from "@/helpers/functions";

export default function Home() {
  const dispatch = useDispatch();
  const latestJobs = useSelector((state) => state.latestJobs);
  const clients = useSelector((state) => state.clients);
  const featuredLatestJobs = useSelector((state) => state.featuredLatestJobs);
  const demandLatestJobs = useSelector((state) => state.demandLatestJobs);
  const featuredJobs = useSelector((state) => state.featuredJobs);

  useEffect(() => {
    if (!clients.length) getClientData(dispatch);
    if (!latestJobs.length) getLatestJobData(dispatch);
    if (!demandLatestJobs.length) getLatestDemandJobs(dispatch);
    if (!featuredLatestJobs.length) getLatestFeaturedJobs(dispatch);
    if (!featuredJobs.length) getFeaturedJobs(dispatch);
  }, []);

  return (
    <div>
      <Hero
        title="Spajamo kompanije i kandidate za uspešnu budućnost!"
        description="Pronađite kompanije koje traže zaposlene i povežite se sa njima."
        label="#1 SAD poslovni priručnik"
        isBig="true"
      />
      <ClientBanner clients={clients} />

      <JobsHero
        link="/jobs"
        buttonText="Svi poslovi"
        title="Pronađi posao iz snova"
        description="Pretraži najnovije mogućnosti za zapošljavanje"
        background="#fff"
        jobs={latestJobs}
      />

      <JobsHero
        link="/featured"
        buttonText="Svi premium oglasi"
        title="Izdvajamo za Vas"
        description="Pretraži premium oglase za posao"
        background="#FEE2E2"
        jobs={featuredLatestJobs}
      />

      <JobsHero
        link="/offers"
        buttonText="Svi kandidati"
        title="Pronađi radnika"
        description="Pretraži najnovije oglase potražnje"
        background="#fff"
        jobs={demandLatestJobs}
      />
      <Subscription />
    </div>
  );
}
