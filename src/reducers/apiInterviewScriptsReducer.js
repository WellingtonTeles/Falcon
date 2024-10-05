import {  GET_API_INTERVIEW_SCRIPTS, DELETE_API_INTERVIEW_SCRIPT, GET_API_INTERVIEW_SESSIONS, GET_API_INCENTIVE } from "../action/type";

const initialState = {
    interview_script_page: 1,
    interview_script_total: 0,
    interview_script_limit: 10,
    interview_script_order: "asc",
    interview_script_list: [],
    interview_session_list: [],
    interview_session_page: 1,
    interview_session_total: 0,
    interview_session_limit: 10,
    incentive_list: [],
};

function apiInterviewScriptsReducer(apis = initialState, action) {
  const { type, payload, pages } = action;
  switch (type) {
    case GET_API_INTERVIEW_SCRIPTS:
        if(payload.objects)
            return {
            ...apis,
            interview_script_page: pages,
            interview_script_total: payload.total,
            interview_script_list: [...payload.objects]
        };
        return apis;
    case GET_API_INTERVIEW_SESSIONS:
      if(payload) 
        return {
          ...apis,
          interview_session_page: pages,
          interview_session_total: payload.total,
          intreview_session_list: [...payload]
          }
        return apis;
    case DELETE_API_INTERVIEW_SCRIPT:
        if(payload.objects)
          return {
          ...apis,
          interview_script_list: [...payload.objects]
      };
        return apis;
    case GET_API_INCENTIVE:
      if(payload.objects)
          return {
          ...apis,
          incentive_list: [...payload.objects]
      };
      return apis;
    default:
      return apis;
  }
}

export default apiInterviewScriptsReducer;
