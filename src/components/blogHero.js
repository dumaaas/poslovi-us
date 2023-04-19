import BlogCard from "./blogCard";
import PlaceholderBlogCard from "./placeholderBlogCard";
import FeaturedSection from "./featuredSection";

import Link from "next/link";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getBlogData } from "@/helpers/functions";

export default function blogHero(props) {
  const dispatch = useDispatch();

  const isJobLoading = useSelector((state) => state.isJobLoading);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (!blogs.length) getBlogData(dispatch);
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
        <div className="lg:col-span-2">
          <FeaturedSection isFeatured={props.isFeatured} />
        </div>
      </div>
    </div>
  );
}
