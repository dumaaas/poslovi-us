import Hero from "@/components/hero";
import JobFilters from "@/components/jobFilters";
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

export default function jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);

  useEffect(() => {
    if (!jobs.length) getJobsData();
  }, []);

  const getJobsData = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "jobs"),
        where("offer_type", "==", "offer"),
        orderBy("published_at", "asc")
      )
    );
    var tempData = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
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
    dispatch({ type: "SET_JOBS", payload: tempData });
  };
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
