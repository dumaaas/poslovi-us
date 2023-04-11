import Hero from "@/components/hero";
import JobFilters from "@/components/jobFilters";
import Subscription from "@/components/subscription";

export default function jobs() {
  return (
    <div>
      <Hero
        title="Odaberite pravog čovjeka za Vaš posao"
        description="Pretražite listu ljudi, nađite savršeni spoj i zaposlite ga!"
        isBig="false"
      />
      <JobFilters isFeatured={true}/>
      <Subscription />
    </div>
  );
}
