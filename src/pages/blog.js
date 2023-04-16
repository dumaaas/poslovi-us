import Hero from "@/components/hero";
import BlogHero from "@/components/blogHero";
import Subscription from "@/components/subscription";

export default function blog() {
  return (
    <div>
      <Hero
        title="Vesti"
        description="Pročitajte naše najnovije vesti"
        isBig="false"
      />
      <BlogHero isFeatured={true}/>
      <Subscription />
    </div>
  );
}
