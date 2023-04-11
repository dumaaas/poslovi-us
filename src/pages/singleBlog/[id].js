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
          <div className="py-12 bg-red-100">
            <div className="flex gap-[25px] items-center container">
              <img
                src={blog.url}
                alt="prologs-logo"
                className="w-[96px] h-[96px] rounded-[8px]"
              />
              <div className="flex flex-col gap-[8px]">
                <h3 className="text-[#334155] text-[40px] leading-[44px] font-bold">
                  {blog.title}
                </h3>
                <p className="text-[#334155] leading-[28px] text-[20px]">
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
