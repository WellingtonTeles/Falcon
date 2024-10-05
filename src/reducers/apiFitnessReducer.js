import { GET_API_FITNEWSS_CRITERIA, GET_API_FITNEWSS_CRITERIA_LIST,DELETE_API_CRITERIA ,DELETE_API_FITNEWSS_CRITERIA, POST_API_CRITERIA, PUT_API_CRITERIA } from "../action/type";

const initialState = {
    fitness_page: 1,
    fitness_total: 0,
    fitness_limit: 10,
    fitness_order: "asc",
    fitness_critera_list: []
};

function apiFitnessReducer(apis = initialState, action) {
  const { type, payload, pages } = action;

  switch (type) {
    case GET_API_FITNEWSS_CRITERIA_LIST:
        if(payload.objects)
            return {
            ...apis,
            fitness_page: pages,
            fitness_total: payload.total,
            fitness_critera_list: [...payload.objects]
        };
        return apis;
    case GET_API_FITNEWSS_CRITERIA:
        if(payload.objects)
            return {
            ...apis,
            fitness_critera_list: [...payload.objects]
        };
        return apis;
    case DELETE_API_CRITERIA:
          if(payload.objects)
              return {
              ...apis,
              fitness_critera_list: [...payload.objects]
          };
          return apis;
      case DELETE_API_FITNEWSS_CRITERIA:
        if(payload.objects)
          return {
          ...apis,
          interview_script_list: [...payload.objects]
      };
    return apis;
    default:
      return apis;
  }
}

export default apiFitnessReducer;
