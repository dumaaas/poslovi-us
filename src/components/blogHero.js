import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogCard from "./blogCard";
import JobCardSecondary from "./jobCardSecondary";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function blogHero(props) {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    console.log("use effect");
    getData();
  }, []);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    var tempData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempData.push({
        id: doc.id,
        title: doc.data().title,
        short_desc: doc.data().short_desc,
        url: doc.data().url,
        published_at: doc.data().published_at
      });
    });
    setBlogs(tempData);
  };
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-9">
        <div className="lg:col-span-7">
          <div className="grid gap-y-4">
            {blogs.map((item) => {
              return <BlogCard key={item.id} blog={item}/>
            })}
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
