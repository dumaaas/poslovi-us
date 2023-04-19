import PlaceholderSecondaryCard from "./placeholderSecondaryCard";
import BlogCard from "./blogCard";
import JobCardSecondary from "./jobCardSecondary";
import PlaceholderBlogCard from "./placeholderBlogCard";

import instagramIcon from "../../public/instagram-header-icon.svg";
import facebookIcon from "../../public/facebook-header-icon.svg";

import Link from "next/link";
import Image from "next/image";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getFeaturedJobs, getBlogData } from "@/helpers/functions";

export default function blogHero(props) {
  const dispatch = useDispatch();
  const featuredJobs = useSelector((state) => state.featuredJobs);
  const isFeaturedJobLoading = useSelector(
    (state) => state.isFeaturedJobLoading
  );
  const isJobLoading = useSelector((state) => state.isJobLoading);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (!blogs.length) getBlogData(dispatch);
    if (!featuredJobs.length) getFeaturedJobs(dispatch);
  }, []);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-9">
        <div className="lg:col-span-7">
          {blogs.length > 0 && (
            <div className="grid gap-y-4">
              {blogs.map((item) => {
                return <BlogCard key={item.id} blog={item} />;
              })}
            </div>
          )}
          {!isJobLoading && blogs.length < 1 && (
            <div className="inline-flex flex flex-col gap-[20px]">
              <p>Nije pronađen nijedan rezultat.</p>
              <div className="px-[12px] py-[8px] rounded-[8px] bg-red-100">
                <p>
                  Pogledajte našu{" "}
                  <Link href={"/jobs"} className="text-red-500 underline">
                    ponudu poslova.
                  </Link>
                </p>
              </div>
            </div>
          )}
          {isJobLoading && blogs.length < 1 && (
            <div className="grid gap-y-4">
              {Array.from({ length: 4 }).map((_, index) => {
                return <PlaceholderBlogCard key={index} />;
              })}
            </div>
          )}
        </div>
        {props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="text-[#334155] text-xl font-bold mb-[20px]">
              Izdvojeni poslovi
            </p>
            <div className="grid gap-y-4">
              {!isFeaturedJobLoading &&
                featuredJobs.length > 0 &&
                featuredJobs.map((item, index) => {
                  return <JobCardSecondary job={item} key={index} />;
                })}

              {isFeaturedJobLoading && featuredJobs.length < 1 && (
                <>
                  {Array.from({ length: 6 }).map((_, index) => {
                    return <PlaceholderSecondaryCard key={index} />;
                  })}
                </>
              )}
              <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] bg-red-500 text-white">
                Želite da izdvojite vaš oglas od ostalih?{" "}
                <a href="mailto:markodumnic8@gmail.com" className="underline">
                  Kontaktirajte nas.
                </a>
              </p>
              <div className="flex flex-col gap-[20px]">
                <a
                  href="https://www.instagram.com/vibecreative.digital/"
                  target="_blank"
                  className="rounded-[8px] transition-all ease-in-out duration-200 bg-[#F8FAFC] hover:bg-gray-200 p-4 relative cursor-pointer flex"
                >
                  <div className="">
                    <p className="text-[14px] leading-[20px] font-bold text-[#334155]">
                      Follow us on Instagram!
                    </p>
                    <span className="text-[14px] leading-[20px] text-[#6b7280]">
                      @poslovius
                    </span>
                  </div>
                  <Image
                    className="w-[70px] h-[70px] absolute top-[50%] transform translate-y-[-50%] right-4 opacity-10"
                    src={instagramIcon}
                    alt="instagram-icon"
                  />
                </a>
                <a
                  href="https://www.instagram.com/vibecreative.digital/"
                  target="_blank"
                  className="rounded-[8px] transition-all ease-in-out duration-200 bg-[#F8FAFC] hover:bg-gray-200 p-4 relative cursor-pointer flex"
                >
                  <div className="">
                    <p className="text-[14px] leading-[20px] font-bold text-[#334155]">
                      Add us on Facebook!
                    </p>
                    <span className="text-[14px] leading-[20px] text-[#6b7280]">
                      @poslovius
                    </span>
                  </div>
                  <Image
                    className="w-[70px] h-[70px] absolute top-[50%] transform translate-y-[-50%] right-4 opacity-10"
                    src={facebookIcon}
                    alt="instagram-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
        {!props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] bg-red-500 text-white">
              Želite da izdvojite vaš oglas od ostalih?{" "}
              <a href="mailto:markodumnic8@gmail.com" className="underline">
                Kontaktirajte nas.
              </a>
            </p>
            <div className="flex flex-col gap-[20px]">
              <a
                href="https://www.instagram.com/vibecreative.digital/"
                target="_blank"
                className="rounded-[8px] transition-all ease-in-out duration-200 bg-[#F8FAFC] hover:bg-gray-200 p-4 relative cursor-pointer flex"
              >
                <div className="">
                  <p className="text-[14px] leading-[20px] font-bold text-[#334155]">
                    Follow us on Instagram!
                  </p>
                  <span className="text-[14px] leading-[20px] text-[#6b7280]">
                    @poslovius
                  </span>
                </div>
                <Image
                  className="w-[70px] h-[70px] absolute top-[50%] transform translate-y-[-50%] right-4 opacity-10"
                  src={instagramIcon}
                  alt="instagram-icon"
                />
              </a>
              <a
                href="https://www.instagram.com/vibecreative.digital/"
                target="_blank"
                className="rounded-[8px] transition-all ease-in-out duration-200 bg-[#F8FAFC] hover:bg-gray-200 p-4 relative cursor-pointer flex"
              >
                <div className="">
                  <p className="text-[14px] leading-[20px] font-bold text-[#334155]">
                    Add us on Facebook!
                  </p>
                  <span className="text-[14px] leading-[20px] text-[#6b7280]">
                    @poslovius
                  </span>
                </div>
                <Image
                  className="w-[70px] h-[70px] absolute top-[50%] transform translate-y-[-50%] right-4 opacity-10"
                  src={facebookIcon}
                  alt="instagram-icon"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
