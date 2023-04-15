import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogCard from "./blogCard";
import JobCardSecondary from "./jobCardSecondary";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import facebookIcon from "../../public/facebook-header-icon.svg";
import instagramIcon from "../../public/instagram-header-icon.svg";
import Image from "next/image";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
export default function blogHero(props) {
  const dispatch = useDispatch();
  const featuredJobs = useSelector((state) => state.featuredJobs);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    if (!blogs.length) getBlogData();
    if (!featuredJobs.length) getFeaturedJobs();
  }, []);

  const getFeaturedJobs = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "jobs"),
        where("featured", "==", true),
        where("offer_type", "==", "offer"),
        orderBy("published_at", "asc")
      )
    );
    var tempData = [];

    querySnapshot.forEach((doc) => {
      tempData.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        published_at: doc.data().published_at,
        content: doc.data().content,
        email: doc.data().email,
        featured: doc.data().featured,
        featured_plus: doc.data().featured_plus,
        job_type: doc.data().job_type,
        location: doc.data().location,
        position: doc.data().position,
        salary: doc.data().salary,
        short_desc: doc.data().short_desc,
      });
    });
    dispatch({ type: "SET_FEATURED_JOBS", payload: tempData });
  };

  const getBlogData = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    var tempData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempData.push({
        id: doc.id,
        title: doc.data().title,
        short_desc: doc.data().short_desc,
        url: doc.data().url,
        published_at: doc.data().published_at,
      });
    });
    dispatch({ type: "SET_BLOGS", payload: tempData });
  };
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
          {blogs.length < 1 && (
            <div>
              <p>Nije pronađen nijedan rezultat.</p>
            </div>
          )}
        </div>
        {props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="text-[#334155] text-xl font-bold mb-[20px]">
              Izdvojeni poslovi
            </p>
            <div className="grid gap-y-4">
              {featuredJobs.map((item, index) => {
                return <JobCardSecondary job={item} key={index} />;
              })}
              <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] bg-red-500 text-white">
                Želite da izdvojite vaš oglas od ostalih? Kontaktirajte nas.
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
            <p className="px-[8px] py-[4px] rounded-[8px] text-[14px] leading-[20px] mb-[20px] bg-red-500 text-white">
              Želite da izdvojite vaš oglas od ostalih? Kontaktirajte nas.
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
