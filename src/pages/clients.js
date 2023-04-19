import Hero from "@/components/hero";
import ClientsHero from "@/components/clientsHero";
import Subscription from "@/components/subscription";

import { useEffect } from "react";

import { getClientData } from "@/helpers/functions";

import { useDispatch, useSelector } from "react-redux";

export default function clients() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  useEffect(() => {
    if (!clients.length) getClientData(dispatch);
  }, []);

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
