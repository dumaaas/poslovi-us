import Hero from "@/components/hero";
import ClientsHero from "@/components/ClientsHero";
import Subscription from "@/components/subscription";
import { useSelector } from "react-redux";

export default function clients() {
  const clients = useSelector((state) => state.clients);

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
