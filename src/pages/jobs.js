import Hero from "@/components/hero";
import JobFilters from "@/components/jobFilters";
import Subscription from "@/components/subscription";

export default function jobs() {
  return (
    <div>
      <Hero
        title="Pronađite najbolje poslove u Americi"
        description="Pretražite listu poslova, nađite savršeni spoj i aplicirajte!"
        isBig="false"
      />
      <JobFilters isFeatured={true}/>
      <Subscription />
    </div>
  );
}
