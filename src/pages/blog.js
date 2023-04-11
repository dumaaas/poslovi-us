import Hero from "@/components/hero";
import BlogHero from "@/components/blogHero";
import Subscription from "@/components/subscription";

export default function blog() {
  return (
    <div>
      <Hero
        title="Blog"
        description="Pročitajte naše najnovije blogove"
        isBig="false"
      />
      <BlogHero isFeatured={true}/>
      <Subscription />
    </div>
  );
}
