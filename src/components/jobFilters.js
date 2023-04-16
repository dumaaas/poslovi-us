import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobCardSecondary from "./jobCardSecondary";
import { cities, jobType } from "@/helpers/staticData";
import PlaceholderSecondaryCard from "./placeholderSecondaryCard";
import facebookIcon from "../../public/facebook-header-icon.svg";
import instagramIcon from "../../public/instagram-header-icon.svg";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function jobFilters(props) {
  const dispatch = useDispatch();
  const featuredJobs = useSelector((state) => state.featuredJobs);
  const isJobLoading = useSelector((state) => state.isJobLoading);
  const isFeaturedJobLoading = useSelector(
    (state) => state.isFeaturedJobLoading
  );
  const [jobsTemp, setJobsTemp] = useState([]);
  const [positionSearch, setPositionSearch] = useState("");
  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [showJobTypeSelect, setShowJobTypeSelect] = useState(false);
  const [jobTypeSearch, setJobTypeSearch] = useState("");
  const [featuredSearch, setFeaturedSearch] = useState(null);
  const locationSearchRef = useRef();
  const jobTypeSearchRef = useRef();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!featuredJobs.length) getFeaturedJobs();
    // Dodaj event listener na document element
    document.addEventListener("mousedown", handleClickOutside);

    // Očisti event listener kada se komponenta unmount-uje
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setJobsTemp(props.jobs);
  }, [props.jobs]);

  useEffect(() => {
    console.log("HEJ MALA", isFirstRender.current);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    filterJobs();
  }, [positionSearch, featuredSearch, jobTypeSearch, locationSearch]);

  const resetFilters = () => {
    setPositionSearch("");
    setLocationSearch("");
    setJobTypeSearch("");
    setFeaturedSearch(false);
  };

  const handleClickOutside = (event) => {
    // Provjeri da li se kliknulo izvan div1 i div2
    if (
      locationSearchRef.current &&
      !locationSearchRef.current.contains(event.target) &&
      jobTypeSearchRef.current &&
      !jobTypeSearchRef.current.contains(event.target)
    ) {
      setShowLocationSelect(false);
      setShowJobTypeSelect(false);
    }
  };

  const filterJobs = () => {
    const filteredJobs = [];
    var jobsToFilter = [...props.jobs];
    console.log(props.jobs, "PROPS JOBS");
    for (const job of jobsToFilter) {
      if (
        (!locationSearch || job.location === locationSearch) &&
        (!jobTypeSearch || job.job_type === jobTypeSearch) &&
        (!featuredSearch || job.featured_plus === featuredSearch) &&
        job.position.toLowerCase().includes(positionSearch.toLowerCase())
      ) {
        filteredJobs.push(job);
      }
    }
    setJobsTemp(filteredJobs);
  };

  const getFeaturedJobs = async () => {
    dispatch({ type: "SET_IS_FEATURED_JOB_LOADING", payload: true });
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
        offer_type: doc.data().offer_type,
      });
    });
    dispatch({ type: "SET_FEATURED_JOBS", payload: tempData });
    dispatch({ type: "SET_IS_FEATURED_JOB_LOADING", payload: false });
  };
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-9">
        <div className=" lg:col-span-2 lg:sticky">
          <div className="lg:top-[20px] lg:sticky flex flex-col gap-4">
            <h5 className="text-[16px] leading-[24px] font-bold text-[#6b7280]">
              Filteri
            </h5>
            <div className="h-[38px] relative">
              <FontAwesomeIcon
                className="cursor-pointer text-[#334155] absolute left-[10px] top-[50%] transform translate-y-[-50%]"
                icon="search"
              />
              {positionSearch.length > 0 && (
                <FontAwesomeIcon
                  onClick={() => setPositionSearch("")}
                  className="text-red-500 absolute right-[10px] top-[50%] transform translate-y-[-50%]"
                  icon="xmark"
                />
              )}
              <input
                className="border w-full h-full text-[14px] pr-[14px] pl-[34px]  leading-[20px] text-[#334155] rounded-[8px]"
                placeholder="Filter po poziciji..."
                value={positionSearch}
                onChange={(e) => {
                  setPositionSearch(e.target.value);
                }}
              />
            </div>

            <div className="h-[38px] relative cursor-pointer">
              <FontAwesomeIcon
                className="text-[#334155] absolute right-[10px] top-[50%] transform translate-y-[-50%]"
                icon="angle-down"
              />
              {locationSearch.length > 0 && (
                <FontAwesomeIcon
                  onClick={() => setLocationSearch("")}
                  className="text-red-500 absolute right-[30px] top-[50%] transform translate-y-[-50%]"
                  icon="xmark"
                />
              )}
              <input
                readOnly
                className="cursor-pointer border w-full h-full text-[14px] pl-[14px] pr-[34px]  leading-[20px] text-[#334155] rounded-[8px]"
                placeholder="Filter po gradu..."
                onClick={() => setShowLocationSelect(!showLocationSelect)}
                value={locationSearch}
              />

              <div
                ref={locationSearchRef}
                className={`${
                  showLocationSelect
                    ? "scale-100 opacity-1 z-[99999]"
                    : "scale-75 opacity-0 z-[-1]"
                } absolute transform scale transition-all ease-in-out duration-200 border w-full max-h-[180px] overflow-auto bg-white rounded-[8px] mt-[2px]`}
              >
                {cities.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => setLocationSearch(item.name)}
                      className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]"
                    >
                      {item.name}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="h-[38px] relative cursor-pointer">
              <FontAwesomeIcon
                className="text-[#334155] absolute right-[10px] top-[50%] transform translate-y-[-50%]"
                icon="angle-down"
              />
              {jobTypeSearch.length > 0 && (
                <FontAwesomeIcon
                  onClick={() => setJobTypeSearch("")}
                  className="text-red-500 absolute right-[30px] top-[50%] transform translate-y-[-50%]"
                  icon="xmark"
                />
              )}
              <input
                readOnly
                className="cursor-pointer border w-full h-full text-[14px] pl-[14px] pr-[34px]  leading-[20px] text-[#334155] rounded-[8px]"
                placeholder="Filter po tipu posla..."
                onClick={() => setShowJobTypeSelect(!showJobTypeSelect)}
                value={jobTypeSearch}
              />

              <div
                ref={jobTypeSearchRef}
                className={`${
                  showJobTypeSelect
                    ? "scale-100 opacity-1 z-[99998]"
                    : "scale-75 opacity-0 z-[-1]"
                } transform scale absolute transition-all ease-in-out duration-200 border w-full max-h-[180px] overflow-auto bg-white rounded-[8px] mt-[2px]`}
              >
                {jobType.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => setJobTypeSearch(item.name)}
                      className="text-[14px] leading-[20px] hover:bg-red-100 text-[#334155]  px-[14px] py-[4px]"
                    >
                      {item.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <div
                onClick={() => setFeaturedSearch(!featuredSearch)}
                className="h-[24px] relative cursor-pointer border w-[24px] flex items-center justify-center rounded-[4px]"
              >
                <FontAwesomeIcon
                  className={`${
                    featuredSearch
                      ? "scale-100 opacity-1"
                      : "scale-75 opacity-0"
                  } text-red-500 transition-all duration-200 ease-in-out`}
                  icon="check"
                />
              </div>
              <p className="text-[14px]  leading-[20px] text-[#334155]">
                Izdvojeni
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          {jobsTemp.length > 0 && (
            <p className="text-[#334155] text-xl font-bold mb-[20px]">
              {props.isOffering
                ? "Broj pronađenih ponuda: "
                : "Broj pronađenih poslova: "}{" "}
              {jobsTemp.length}
            </p>
          )}
          <div className="grid gap-y-4">
            {jobsTemp.length > 0 &&
              jobsTemp.map((item, index) => {
                return <JobCardSecondary job={item} key={index} />;
              })}
            {!isJobLoading && jobsTemp.length < 1 && (
              <div className="flex flex-col items-start">
                <p className="text-[16px] leading-[24px] text-[#334155]">
                  Nije pronađen nijedan rezultat.
                </p>
                <button
                  onClick={() => resetFilters()}
                  className="font-bold mt-4 u-btn px-4 rounded-[8px] h-[38px] text-sm bg-gray-100"
                >
                  Poništi filtere
                </button>
              </div>
            )}
            {isJobLoading && jobsTemp.length < 1 && (
              <>
                {Array.from({ length: 6 }).map((_, index) => {
                  return <PlaceholderSecondaryCard key={index} />;
                })}
              </>
            )}
          </div>
        </div>
        {props.isFeatured && (
          <div className="lg:col-span-2">
            <p className="text-[#334155] text-xl font-bold mb-[20px]">
              Izdvajamo
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
