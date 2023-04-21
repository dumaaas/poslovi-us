import FeaturedSection from "./featuredSection";
import JobList from "./jobList";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { jobTypeData } from "@/helpers/staticData";
import { getCityData, getCategoryData } from "@/helpers/functions";

export default function jobFilters(props) {
  const dispatch = useDispatch();

  const [jobsTemp, setJobsTemp] = useState([]);
  const [positionSearch, setPositionSearch] = useState("");
  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategorySelect, setShowCategorySelect] = useState("");
  const [showJobTypeSelect, setShowJobTypeSelect] = useState(false);
  const [jobTypeSearch, setJobTypeSearch] = useState("");
  const [featuredSearch, setFeaturedSearch] = useState(null);

  const cities = useSelector((state) => state.cities);
  const categories = useSelector((state) => state.categories);

  const locationSearchRef = useRef();
  const jobTypeSearchRef = useRef();
  const categorySearchRef = useRef();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!cities.length) {
      getCityData(dispatch);
    }
    if (!categories.length) {
      getCategoryData(dispatch);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setJobsTemp(props.jobs);
  }, [props.jobs]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    filterJobs();
  }, [positionSearch, featuredSearch, jobTypeSearch, locationSearch, categorySearch]);

  const resetFilters = () => {
    setPositionSearch("");
    setLocationSearch("");
    setJobTypeSearch("");
    setCategorySearch("");
    setFeaturedSearch(false);
  };

  const handleClickOutside = (event) => {
    if (
      locationSearchRef.current &&
      !locationSearchRef.current.contains(event.target) &&
      jobTypeSearchRef.current &&
      !jobTypeSearchRef.current.contains(event.target) && 
      categorySearchRef.current &&
      !categorySearchRef.current.contains(event.target)
    ) {
      setShowLocationSelect(false);
      setShowJobTypeSelect(false);
      setShowCategorySelect(false);
    }
  };

  const filterJobs = () => {
    const filteredJobs = [];
    var jobsToFilter = [...props.jobs];
    for (const job of jobsToFilter) {
      if (
        (!locationSearch || job.location === locationSearch) &&
        (!jobTypeSearch || job.job_type === jobTypeSearch) &&
        (!featuredSearch || job.featured_plus === featuredSearch) &&
        (!categorySearch || job.category === categorySearch) &&
        job.position.toLowerCase().includes(positionSearch.toLowerCase())
      ) {
        filteredJobs.push(job);
      }
    }
    setJobsTemp(filteredJobs);
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
              {categorySearch.length > 0 && (
                <FontAwesomeIcon
                  onClick={() => setCategorySearch("")}
                  className="text-red-500 absolute right-[30px] top-[50%] transform translate-y-[-50%]"
                  icon="xmark"
                />
              )}
              <input
                readOnly
                className="cursor-pointer border w-full h-full text-[14px] pl-[14px] pr-[34px]  leading-[20px] text-[#334155] rounded-[8px]"
                placeholder="Filter po kategoriji..."
                onClick={() => setShowCategorySelect(!showCategorySelect)}
                value={categorySearch}
              />

              <div
                ref={categorySearchRef}
                className={`${
                  showCategorySelect
                    ? "scale-100 opacity-1 z-[99999]"
                    : "scale-75 opacity-0 z-[-1]"
                } absolute transform scale transition-all ease-in-out duration-200 border w-full max-h-[180px] overflow-auto bg-white rounded-[8px] mt-[2px]`}
              >
                {categories.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => {
                        setCategorySearch(item.name);
                        setShowCategorySelect(false);
                      }}
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
                      onClick={() => {
                        setLocationSearch(item.name);
                        setShowLocationSelect(false);
                      }}
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
                {jobTypeData.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => {
                        setJobTypeSearch(item.name);
                        setShowJobTypeSelect(false);
                      }}
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
          <JobList
            isFeatured={props.isFeatured}
            jobs={jobsTemp}
            resetFilters={resetFilters}
          />
        </div>
        <div className="lg:col-span-2">
          <FeaturedSection isFeatured={props.isFeatured} />
        </div>
      </div>
    </div>
  );
}
