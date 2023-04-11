import ClientBanner from "@/components/clientBanner";
import Hero from "@/components/hero";
import JobsHero from "@/components/jobsHero";
import Subscription from "@/components/subscription";

export default function Home() {
  return (
    <div>
      <Hero
        title="Vodeći poslovni priručnik na SAD prostorima."
        description="Pronađite kompanije koje traže zaposlene i povežite se sa njima."
        label="#1 SAD poslovni priručnik"
        isBig="true"
      />
      <ClientBanner />
      <JobsHero link="/jobs" buttonText="Svi poslovi" title="Pronađi posao iz snova" description="Pretraži najnovije mogućnosti za zapošljavanje" background="#fff"/>
      <JobsHero link="/featured" buttonText="Pogledaj izdvojene" title="Izdvajamo za Vas" description="Pretraži izdvojene oglase za posao" background="#FEE2E2"/>
      <JobsHero link="/offers" buttonText="Pogledaj potražnju" title="Pronađi radnika" description="Pretraži najnovije oglase potražnje" background="#fff"/>
      <Subscription />
    </div>
  );
}
