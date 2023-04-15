import Hero from "@/components/hero";
import JobFilters from "@/components/jobFilters";
import Subscription from "@/components/subscription";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function jobs() {
  const dispatch = useDispatch();
  const demandJobs = useSelector((state) => state.demandJobs);

  useEffect(() => {
    if (!demandJobs.length) getDemandJobs();
  }, []);

  const getDemandJobs = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "jobs"),
        where("offer_type", "==", "offering"),
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
        offer_type: doc.data().offer_type
      });
    });
    dispatch({ type: "SET_DEMAND_JOBS", payload: tempData });
  };
  return (
    <div>
      <Hero
        title="Odaberite pravog čovjeka za Vaš posao"
        description="Pretražite listu ljudi, nađite savršeni spoj i zaposlite ga!"
        isBig="false"
      />
      <JobFilters isFeatured={true} jobs={demandJobs} isOffering={true}/>
      <Subscription />
    </div>
  );
}
