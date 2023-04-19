import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";

import { db, auth } from "../../firebase";
import { signOut } from "firebase/auth";

import Cookies from "js-cookie";

export const signOutToastHandler = (msg, dispatch) => {
  dispatch({ type: "SET_SHOW_LOGOUT_MSG", payload: true });
  dispatch({
    type: "SET_LOGOUT_MSG",
    payload: msg,
  });
  setTimeout(() => {
    dispatch({ type: "SET_SHOW_LOGOUT_MSG", payload: false });
  }, 3000);
};

export const signOutFunc = (dispatch) => {
  signOut(auth)
    .then(() => {
      Cookies.remove("accessTokenPosloviLogin");
      dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
      signOutToastHandler("Uspješno ste se odjavili", dispatch);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const saveAuthTokens = (accessToken, expirationTime) => {
  Cookies.set("accessTokenPosloviLogin", accessToken, {
    expires: new Date(expirationTime),
  });
};

export const getFeaturedJobs = async (dispatch) => {
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

export const getBlogData = async (dispatch, setBlogsTemp) => {
  dispatch({ type: "SET_IS_JOB_LOADING", payload: true });

  const querySnapshot = await getDocs(collection(db, "blogs"));
  var tempData = [];
  querySnapshot.forEach((doc) => {
    tempData.push({
      id: doc.id,
      title: doc.data().title,
      short_desc: doc.data().short_desc,
      url: doc.data().url,
      published_at: doc.data().published_at,
    });
  });
  dispatch({ type: "SET_BLOGS", payload: tempData });
  dispatch({ type: "SET_IS_JOB_LOADING", payload: false });

  if (setBlogsTemp) {
    setBlogsTemp(tempData);
  }
};

export const getClientData = async (dispatch, setClientsTemp) => {
  const querySnapshot = await getDocs(collection(db, "clients"));
  var tempData = [];

  querySnapshot.forEach((doc) => {
    tempData.push({
      id: doc.id,
      name: doc.data().title,
      url: doc.data().url,
      link: doc.data().link,
      published_at: doc.data().published_at,
    });
  });
  dispatch({ type: "SET_CLIENTS", payload: tempData });

  if (setClientsTemp) {
    setClientsTemp(tempData);
  }
};

export const getLatestJobData = async (dispatch) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "jobs"),
      where("offer_type", "==", "offer"),
      orderBy("published_at", "asc"),
      limit(6)
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
  dispatch({ type: "SET_LATEST_JOBS", payload: tempData });
};

export const getLatestFeaturedJobs = async (dispatch) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "jobs"),
      where("featured", "==", true),
      where("offer_type", "==", "offer"),
      orderBy("published_at", "asc"),
      limit(6)
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
  dispatch({ type: "SET_FEATURED_LATEST_JOBS", payload: tempData });
};

export const getDemandJobs = async (dispatch) => {
  dispatch({ type: "SET_IS_JOB_LOADING", payload: true });
  const querySnapshot = await getDocs(
    query(
      collection(db, "jobs"),
      where("offer_type", "==", "offering"),
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
  dispatch({ type: "SET_DEMAND_JOBS", payload: tempData });
  dispatch({ type: "SET_IS_JOB_LOADING", payload: false });
};

export const getLatestDemandJobs = async (dispatch) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "jobs"),
      where("offer_type", "==", "offering"),
      orderBy("published_at", "asc"),
      limit(6)
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
  dispatch({ type: "SET_DEMAND_LATEST_JOBS", payload: tempData });
};

export const getJobsData = async (dispatch) => {
  dispatch({ type: "SET_IS_JOB_LOADING", payload: true });
  const querySnapshot = await getDocs(
    query(
      collection(db, "jobs"),
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

  dispatch({ type: "SET_JOBS", payload: tempData });
  dispatch({ type: "SET_IS_JOB_LOADING", payload: false });
};

export const getAllJobs = async (dispatch, setJobsTemp) => {
  dispatch({ type: "SET_IS_JOB_LOADING", payload: true });
  const querySnapshot = await getDocs(collection(db, "jobs"));
  var tempData = [];

  querySnapshot.forEach((doc) => {
    tempData.push({
      id: doc.id,
      name: doc.data().name,
      url: doc.data().url,
      content: doc.data().content,
      short_desc: doc.data().shortDesc,
      published_at: doc.data().published_at,
      email: doc.data().email,
      position: doc.data().position,
      salary: doc.data().salary,
      location: doc.data().location,
      offer_type: doc.data().offer_type,
      job_type: doc.data().jobType,
      featured: doc.data().featured,
      featured_plus: doc.data().featured_plus,
    });
  });
  dispatch({ type: "SET_IS_JOB_LOADING", payload: false });
  dispatch({ type: "SET_ALL_JOBS", payload: tempData });
  setJobsTemp(tempData);
};

export const takeInitials = (name) => {
  let result = "";
  for (let i = 0; i < name.length; i++) {
    const currentChar = name.charAt(i);

    if (
      currentChar === currentChar.toUpperCase() &&
      currentChar.match(/[A-Z]/)
    ) {
      result += currentChar;

      if (result.length === 2) {
        break;
      }
    }
  }
  return result;
};

export const shortDescFormater = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  } else {
    return str;
  }
};

export const checkEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const submitJobApplication = (
  e,
  offerType,
  position,
  emailOffer,
  name,
  email,
  letter
) => {
  e.preventDefault();
  const subject =
    offerType === "offer"
      ? `Aplikacija za poziciju: ${position}`
      : `Ponuda za posao: ${position}`;
  const content = `${
    offerType === "offer"
      ? "Poštovani, imate novu aplikaciju za posao:\n"
      : "Poštovani, imate novu ponudu za posao:\n"
  }\nIme i prezime: ${name}\n\nKontakt email: ${email}\n\nPropratno pismo: \n${letter}\n\n`;
  const mailtoLink = `mailto:${emailOffer}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(content)}`;
  window.location.href = mailtoLink;
};

export const showHeaderAndFooter = (asPath) => {
  if (asPath !== "/login") return true;
  else return false;
};
