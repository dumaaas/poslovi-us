import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import JobsCms from "@/components/jobsCms";
import ClientCms from "@/components/clientCms";
import BlogCms from "@/components/blogCms";

export default function dashboard() {
  const { asPath } = useRouter();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn && (
        <div className="container relative">
          <div
            className={`py-8 relative z-[99] lg:min-h-[calc(100vh-154px)] sm:min-h-[calc(100vh-135px)] min-h-[calc(100vh-129px)] w-full`}
          >
            {(asPath === "/dashboard/jobs" || asPath === "/dashboard") && <JobsCms />}
            {asPath === "/dashboard/clients" && <ClientCms />}
            {asPath === "/dashboard/blog" && <BlogCms />}
          </div>
        </div>
      )}
    </div>
  );
}
