import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogCard from "./blogCard";
import JobCardSecondary from "./jobCardSecondary";

export default function blogHero(props) {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-9">
        <div className="lg:col-span-7">
          <div className="grid gap-y-4">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
        {props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="text-[#334155] text-xl font-bold mb-[20px]">
              Izdvojeni poslovi
            </p>
            <div className="grid gap-y-4">
              <JobCardSecondary />
              <JobCardSecondary isFeatured={true} />
              <JobCardSecondary />
              <JobCardSecondary />
              <JobCardSecondary />
              <JobCardSecondary />
              <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] mb-[20px] bg-red-500 text-white">
                Želite da izdvojite vaš oglas od ostalih? Kontaktirajte nas.
              </p>
            </div>
          </div>
        )}
        {!props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] mb-[20px] bg-red-500 text-white">
              Želite da izdvojite vaš oglas od ostalih? Kontaktirajte nas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
