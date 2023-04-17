import Image from "next/image";
import Subscription from "@/components/subscription";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

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
        <div>
          <div style={{backgroundImage: `url(${blog.url})`}} className="relative bg-center bg-no-repeat bg-cover py-44">
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-75">

            </div>
            <div className="relative z-20 flex gap-[25px] items-center container">
              <div className="flex flex-col gap-[8px]">
                <h3 className="text-white text-[40px] leading-[44px] font-bold">
                  {blog.title}
                </h3>
                <p className="leading-[28px] text-[20px] text-red-500">
                  {blog.published_at.toDate().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="container py-12">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      )}
      {!blog && (
        <div className="h-[calc(100vh-100px)] w-full bg-red-100 flex items-center justify-center text-[40px] leading-[50px] text-red-500">
          Loading...
        </div>
      )}
      <Subscription />
    </div>
  );
}
