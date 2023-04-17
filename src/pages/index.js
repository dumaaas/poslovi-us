import ClientBanner from "@/components/clientBanner";
import Hero from "@/components/hero";
import JobsHero from "@/components/jobsHero";
import Subscription from "@/components/subscription";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const latestJobs = useSelector((state) => state.latestJobs);
  const clients = useSelector((state) => state.clients);
  const featuredLatestJobs = useSelector((state) => state.featuredLatestJobs);
  const demandLatestJobs = useSelector((state) => state.demandLatestJobs);
  const featuredJobs = useSelector((state) => state.featuredJobs);

  useEffect(() => {
    if (!clients.length) getClientData();
    if (!latestJobs.length) getLatestJobData();
    if (!demandLatestJobs.length) getLatestDemandJobs();
    if (!featuredLatestJobs.length) getLatestFeaturedJobs();
    if (!featuredJobs.length) getFeaturedJobs();
  }, []);

  const getClientData = async () => {
    const querySnapshot = await getDocs(collection(db, "clients"));
    var tempData = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempData.push({
        id: doc.id,
        name: doc.data().title,
        url: doc.data().url,
        link: doc.data().link,
        published_at: doc.data().published_at,
      });
    });
    dispatch({ type: "SET_CLIENTS", payload: tempData });
  };

  const getLatestJobData = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "jobs"),
        where("offer_type", "==", "offer"),
        orderBy("published_at", "asc"),
        limit(6)
      )
    );
    var tempData = [];

    querySnapshot.forEach((doc) => {
      tempData.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        published_at: doc.data().published_at,
        content: doc.data().content,
        email: doc.data().email,
        featured: doc.data().featured,
        featured_plus: doc.data().featured_plus,
        job_type: doc.data().job_type,
        location: doc.data().location,
        position: doc.data().position,
        salary: doc.data().salary,
        short_desc: doc.data().short_desc,
        offer_type: doc.data().offer_type
      });
    });
    dispatch({ type: "SET_LATEST_JOBS", payload: tempData });
  };

  const getLatestFeaturedJobs = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "jobs"),
        where("featured", "==", true),
        where("offer_type", "==", "offer"),
        orderBy("published_at", "asc"),
        limit(6)
      )
    );
    var tempData = [];

    querySnapshot.forEach((doc) => {
      tempData.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        published_at: doc.data().published_at,
        content: doc.data().content,
        email: doc.data().email,
        featured: doc.data().featured,
        featured_plus: doc.data().featured_plus,
        job_type: doc.data().job_type,
        location: doc.data().location,
        position: doc.data().position,
        salary: doc.data().salary,
        short_desc: doc.data().short_desc,
        offer_type: doc.data().offer_type
      });
    });
    dispatch({ type: "SET_FEATURED_LATEST_JOBS", payload: tempData });
  };

  const getFeaturedJobs = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "jobs"),
        where("featured", "==", true),
        where("offer_type", "==", "offer"),
        orderBy("published_at", "asc")
      )
    );
    var tempData = [];

    querySnapshot.forEach((doc) => {
      tempData.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        published_at: doc.data().published_at,
        content: doc.data().content,
        email: doc.data().email,
        featured: doc.data().featured,
        featured_plus: doc.data().featured_plus,
        job_type: doc.data().job_type,
        location: doc.data().location,
        position: doc.data().position,
        salary: doc.data().salary,
        short_desc: doc.data().short_desc,
        offer_type: doc.data().offer_type,
      });
    });
    dispatch({ type: "SET_FEATURED_JOBS", payload: tempData });
  };

  const getLatestDemandJobs = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "jobs"),
        where("offer_type", "==", "offering"),
        orderBy("published_at", "asc"),
        limit(6)
      )
    );
    var tempData = [];

    querySnapshot.forEach((doc) => {
      tempData.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        published_at: doc.data().published_at,
        content: doc.data().content,
        email: doc.data().email,
        featured: doc.data().featured,
        featured_plus: doc.data().featured_plus,
        job_type: doc.data().job_type,
        location: doc.data().location,
        position: doc.data().position,
        salary: doc.data().salary,
        short_desc: doc.data().short_desc,
        offer_type: doc.data().offer_type
      });
    });
    dispatch({ type: "SET_DEMAND_LATEST_JOBS", payload: tempData });
  };

  return (
    <div>
      <Hero
        title="Vodeći poslovni priručnik na SAD prostorima."
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
        buttonText="Pogledaj izdvojene"
        title="Izdvajamo za Vas"
        description="Pretraži izdvojene oglase za posao"
        background="#FEE2E2"
        jobs={featuredLatestJobs}
      />

      <JobsHero
        link="/offers"
        buttonText="Pogledaj potražnju"
        title="Pronađi radnika"
        description="Pretraži najnovije oglase potražnje"
        background="#fff"
        jobs={demandLatestJobs}
      />
      <Subscription />
    </div>
  );
}
