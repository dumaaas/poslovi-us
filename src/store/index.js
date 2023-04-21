const reducerFn = (
  state = {
    latestJobs: [],
    featuredLatestJobs: [],
    demandLatestJobs: [],
    allJobs: [],
    jobs: [],
    clients: [],
    featuredJobs: [],
    demandJobs: [],
    blogs: [],
    isJobLoading: false,
    isFeaturedJobLoading: false,
    isLoggedIn: false,
    showLogOutMsg: false,
    logOutMsg: "",
    cities: [],
    categories: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_LATEST_JOBS":
      return {
        ...state,
        latestJobs: action.payload,
      };
    case "SET_FEATURED_LATEST_JOBS":
      return {
        ...state,
        featuredLatestJobs: action.payload,
      };
    case "SET_DEMAND_LATEST_JOBS":
      return {
        ...state,
        demandLatestJobs: action.payload,
      };
    case "SET_CLIENTS":
      return {
        ...state,
        clients: action.payload,
      };
    case "SET_JOBS":
      return {
        ...state,
        jobs: action.payload,
      };
    case "SET_ALL_JOBS":
      return {
        ...state,
        allJobs: action.payload,
      };
    case "SET_FEATURED_JOBS":
      return {
        ...state,
        featuredJobs: action.payload,
      };
    case "SET_DEMAND_JOBS":
      return {
        ...state,
        demandJobs: action.payload,
      };
    case "SET_BLOGS":
      return {
        ...state,
        blogs: action.payload,
      };
    case "SET_IS_JOB_LOADING":
      return {
        ...state,
        isJobLoading: action.payload,
      };
    case "SET_IS_FEATURED_JOB_LOADING":
      return {
        ...state,
        isFeaturedJobLoading: action.payload,
      };
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_SHOW_LOGOUT_MSG":
      return {
        ...state,
        showLogOutMsg: action.payload,
      };
    case "SET_LOGOUT_MSG":
      return {
        ...state,
        logOutMsg: action.payload,
      };
    case "SET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default reducerFn;
