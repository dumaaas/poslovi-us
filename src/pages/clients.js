import Hero from "@/components/hero";
import ClientsHero from "@/components/clientsHero";
import Subscription from "@/components/subscription";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

export default function clients() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  useEffect(() => {
    if (!clients.length) getClientData();
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

  return (
    <div>
      <Hero
        title="Klijenti"
        description="Klijenti koji su nam dali povjerenje"
        isBig="false"
      />
      <ClientsHero clients={clients} />
      <Subscription />
    </div>
  );
}
