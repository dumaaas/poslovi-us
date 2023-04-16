const reducerFn = (
  state = {
    latestJobs: [],
    featuredLatestJobs: [],
    demandLatestJobs: [],
    jobs: [],
    clients: [],
    featuredJobs: [],
    demandJobs: [],
    blogs: [],
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
    default:
      break;
  }
  return state;
};

export default reducerFn;