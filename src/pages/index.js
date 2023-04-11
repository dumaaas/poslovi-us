import ClientBanner from "@/components/clientBanner";
import Hero from "@/components/hero";
import JobsHero from "@/components/jobsHero";
import Subscription from "@/components/subscription";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Home() {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    const querySnapshot = await getDocs(collection(db, "clients"));
    var tempData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempData.push({
        id: doc.id,
        name: doc.data().title,
        url: doc.data().url,
        published_at: doc.data().published_at,
      });
    });
    setClients(tempData);
  };
  return (
    <div>
      <Hero
        title="Vodeći poslovni priručnik na SAD prostorima."
        description="Pronađite kompanije koje traže zaposlene i povežite se sa njima."
        label="#1 SAD poslovni priručnik"
        isBig="true"
      />
      <ClientBanner clients={clients}/>
      <JobsHero
        link="/jobs"
        buttonText="Svi poslovi"
        title="Pronađi posao iz snova"
        description="Pretraži najnovije mogućnosti za zapošljavanje"
        background="#fff"
      />
      <JobsHero
        link="/featured"
        buttonText="Pogledaj izdvojene"
        title="Izdvajamo za Vas"
        description="Pretraži izdvojene oglase za posao"
        background="#FEE2E2"
      />
      <JobsHero
        link="/offers"
        buttonText="Pogledaj potražnju"
        title="Pronađi radnika"
        description="Pretraži najnovije oglase potražnje"
        background="#fff"
      />
      <Subscription />
    </div>
  );
}
