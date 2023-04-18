import Image from "next/image";
import Subscription from "@/components/subscription";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function singleBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const docRef = doc(db, "blogs", id);
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDoc(docRef);
      setBlog(doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  return (
    <div className="">
      {blog && (
        <>
          <div>
            <div
              style={{ backgroundImage: `url(${blog.url})` }}
              className="relative bg-center bg-no-repeat bg-cover py-44"
            >
              <div className="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-75"></div>
              <div className="relative z-20 flex gap-[25px] items-center container">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-white lg:text-[40px] lg:leading-[44px] md:text-[36px] md:leading-[40px] text-[30px] leading-[36px] font-bold">
                    {blog.title}
                  </h3>
                  <p className="md:leading-[28px] md:text-[20px] text-[16px] leading-[24px] text-red-500">
                    {blog.published_at.toDate().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="container py-10 md:py-12">
              <div
                className="single-post"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
          <Subscription />
        </>
      )}
      {!blog && (
        <div className="lg:h-[calc(100vh-154px)] sm:h-[calc(100vh-135px)] h-[calc(100vh-129px)] w-full bg-red-100 flex items-center justify-center text-[40px] leading-[50px] text-red-500">
          <FontAwesomeIcon icon="fa-solid fa-spinner" className="spin-anim" />
        </div>
      )}
    </div>
  );
}
