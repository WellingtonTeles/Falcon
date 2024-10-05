import {
  GET_API_ACCOUNTS,
  POST_API_ACCOUNT,
  PUT_API_ACCOUNT,
  GET_API_USERS,
  GET_API_USER,
  POST_API_USER,
  PUT_API_USER,
  DELETE_API_USER,
  GET_API_INTERVIEW_SESSIONS,
  GET_API_INTERVIEW_SESSION,
  DELETE_API_INTERVIEW_SESSION,
  GET_API_FITNEWSS_CRITERIA_LIST,
  GET_API_FITNEWSS_CRITERIA,
  POST_API_FITNEWSS_CRITERIA,
  PUT_API_FITNEWSS_CRITERIA,
  DELETE_API_FITNEWSS_CRITERIA,
  DELETE_API_CRITERIA,
  POST_API_CRITERIA,
  GET_API_INTERVIEW_SCRIPTS,
  GET_API_INTERVIEW_SCRIPT_DESIGN,
  GET_API_INTERVIEW_SCRIPT_QUESTIONS,
  DELETE_API_INTERVIEW_SCRIPT,
  POST_API_INTERVIEW_SCRIPT,
  PUT_API_INTERVIEW_SCRIPT_DESIGN,
  PUT_API_INTERVIEW_SCRIPT_QUESTION,
  PUT_API_CRITERIA,
  GET_API_INCENTIVE_LIST,
  PUT_API_INCENTIVE,
  POST_API_INTERVIEW_SCRIPT_DESIGN,
  POST_API_INTERVIEW_SCRIPT_QUESTION,
  GET_API_INTERVIEW_SCRIPT_OPTION,
  GET_API_INTERVIEW_SCRIPT_OPTIONS,
  POST_API_INTERVIEW_SCRIPT_OPTION,
  DELETE_API_INTERVIEW_SCRIPT_OPTION,
  PUT_API_INTERVIEW_SCRIPT_OPTION,
  DELETE_API_INTERVIEW_SCRIPT_QUESTION,
  POST_API_INCENTIVE,
  GET_API_TOKEN,
  REFRESH_TOKEN,
  // UPDATE_SLATE_ACTIVATE,
  START_TEST_DRIVE,
  ADVANCE_TEST_DRIVE,
  GET_TRANSCRIPTS,
  GET_TRANSCRIPT,
  POST_TRANSCRIPT,
  CREATE_PROSPECT_SESSION,
  UDPATE_TRANSCRIPT,
  CREATE_ACCOUNT,
  SEND_RESET_PASSWORD,
  SET_NEWPASSWORD,
  RESEND_VERIFY_EMAIL,
  PUT_WELCOME,
  // GET_SLATES,
  // GET_SLATE,
  // GET_SLATE_URL_CODE,
  ADD_SLATE,
  DELETE_SLATE,
  UPDATE_SLATE,
  GET_INTERVIEW,
  SAVE_INTERVIEW,
  // GET_QUESTION,
  // GET_QUESTION_QUERY,
  // ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  GET_TIMEZONE,
  GET_COUNTRY,
  PUT_ONE_COMPANY,
  GET_ONE_COMPANY,
} from "./type";

import ApiServices from "../services/apiServices";
import { deleteCookie, getCookie, setCookie } from "../config/common";

export const createAccount = (email, company, password) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.createAccount(email, company, password);
      dispatch({
        type: CREATE_ACCOUNT,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err.response;
    }
  };
};

export const resendVerifyEmail = (code) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.resendVerifyEmail(code);
      dispatch({
        type: RESEND_VERIFY_EMAIL,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      if (err.status != 400) return err.response;
    }
  };
};

export const getTokenData = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getToken(email, password);
      dispatch({
        type: GET_API_TOKEN,
        payload: res.data,
      });

      setCookie("access_token", res.data.access_token, 40);
      setCookie("refresh_token", res.data.refresh_token, 60);

      return res.data;
    } catch (err) {
      if (err.status != 400) return err.response;
    }
  };
};

export const refreshToken = () => {
  if (!getCookie("refresh_token") || getCookie("refresh_token") === null) {
    window.location.href = "/401";
    return;
  }
  if (getCookie("access_token") || getCookie("access_token") !== null) {
    console.log("456");
  }
  // return;

  return async (dispatch) => {
    console.log("123");
    try {
      const res = await ApiServices.getAuthRefreshToken();

      setCookie("access_token", res.data.access_token, 40);
      if (res.data.refresh_token)
        setCookie("refresh_token", res.data.refresh_token, 60);
      dispatch({
        type: REFRESH_TOKEN,
        payload: res.data,
      });

      return res.data.access_token;
    } catch (err) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      window.location.href = "/creator-dashboard/login";
    }
  };
};

export const putWelcome = (obj, user_id) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.putWelcome(obj, user_id, access_token);
      dispatch({
        type: PUT_WELCOME,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      refreshToken(putWelcome(obj, user_id));
    }
  };
};

export const setNewPassword = (code, email, password) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.setNewPassword(code, email, password);
      dispatch({
        type: SET_NEWPASSWORD,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      if (err.status != 400) return err.response;
    }
  };
};

export const sendResetPassword = (email) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.sendResetPassword(email);
      dispatch({
        type: SEND_RESET_PASSWORD,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      if (err.status != 400) return err.response;
    }
  };
};

// ===========  Slates =============
export const getSlate = (id) => {
  let access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      if (access_token !== null) {
        const res = await ApiServices.getSlate(id, access_token);
        dispatch({
          type: SET_NEWPASSWORD,
          payload: res.data,
        });

        return res.data;
      }
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const getSlateUrlCode = (id) => {
  let access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      if (access_token !== null) {
        const res = await ApiServices.getSlateUrlCode(id, access_token);
        dispatch({
          type: GET_API_ACCOUNTS,
          payload: res.data,
        });

        return res.data;
      }
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const getSlates = (page = 0, rows = 10, query = "") => {
  let access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      if (access_token !== null) {
        const res = await ApiServices.getSlates(
          page,
          rows,
          query,
          access_token
        );
        dispatch({
          type: SET_NEWPASSWORD,
          payload: res.data,
        });

        return res.data;
      } else {
        access_token = await refreshToken();

        if (access_token) return getSlates(page, rows, query)(dispatch); // Call the function again with the updated token
      }
    } catch (err) {
      access_token = await refreshToken();

      if (access_token) return getSlates(page, rows, query)(dispatch); // Call the function again with the updated token
    }
  };
};

export const addSlate = (name) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.addSlate(name, access_token);
      dispatch({
        type: ADD_SLATE,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const updateSlate = (id, name, status) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.updateSlate(id, name, status, access_token);
      dispatch({
        type: UPDATE_SLATE,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const getQuestion = (interviewId) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.getQuestion(interviewId, access_token);
      dispatch({
        type: GET_INTERVIEW,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const getQuestionQuery = (interviewId, questionId) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.getQuestionQuery(
        interviewId,
        questionId,
        access_token
      );
      dispatch({
        type: GET_INTERVIEW,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const addQuestion = (interviewId, obj) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.addQuestion(interviewId, obj, access_token);
      dispatch({
        type: GET_INTERVIEW,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const updateSlateActivate = (slateId) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.updateSlateActivate(slateId, access_token);
      dispatch({
        type: PUT_WELCOME,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const startTestDrive = (url_code) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.startTestDrive(url_code, access_token);
      dispatch({
        type: START_TEST_DRIVE,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const advanceTestDrive = (url_code, obj) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.advanceTestDrive(
        url_code,
        obj,
        access_token
      );
      dispatch({
        type: ADVANCE_TEST_DRIVE,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const postTranscript = (url_code, obj) => {
  const session_token = getCookie("session_token");

  // if (session_token === null) {
  //   window.location.reload();

  //   return null;
  // }

  return async (dispatch) => {
    try {
      const res = await ApiServices.postTranscript(
        url_code,
        obj,
        session_token
      );
      dispatch({
        type: POST_TRANSCRIPT,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const getTranscripts = (interview_id, query = "") => {
  const session_token = getCookie("access_token") || getCookie("refresh_token");

  if (session_token === null) {
    window.location.reload();

    return null;
  }

  return async (dispatch) => {
    try {
      const res = await ApiServices.getTranscripts(
        interview_id,
        query,
        session_token
      );
      dispatch({
        type: GET_TRANSCRIPTS,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const updateTranscript = (url_code, obj, transcript_id) => {
  const session_token = getCookie("session_token");

  if (session_token === null) {
    window.location.reload();

    return null;
  }

  return async (dispatch) => {
    try {
      const res = await ApiServices.updateTranscript(
        url_code,
        obj,
        transcript_id,
        session_token
      );
      dispatch({
        type: UDPATE_TRANSCRIPT,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const createProspectSession = (url_code) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.createProspectSession(
        url_code,
        access_token
      );

      setCookie("session_token", res.data.session_token, 40);
      dispatch({
        type: CREATE_PROSPECT_SESSION,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const updateQuestion = (interviewId, questionId, obj) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.updateQuestion(
        interviewId,
        questionId,
        obj,
        access_token
      );
      dispatch({
        type: UPDATE_QUESTION,
        payload: res.data,
      });
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const deleteQuestion = (interviewId, questionId) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteQuestion(
        interviewId,
        questionId,
        access_token
      );
      dispatch({
        type: DELETE_QUESTION,
        payload: res.data,
      });
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const deleteSlate = (id) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteSlate(id, access_token);
      dispatch({
        type: DELETE_SLATE,
        payload: res.data,
      });
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const getInterview = (sId, interviewId) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.getInterview(
        sId,
        interviewId,
        access_token
      );
      dispatch({
        type: GET_INTERVIEW,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;

      //refreshToken(getSlates(page, rows));
    }
  };
};

export async function getInterviewFunc(sId, interviewId) {
  const access_token = getCookie("access_token");

  const res = await ApiServices.getInterview(sId, interviewId, access_token);

  return res.data;
}

export const saveInterview = (sId, interviewId, obj) => {
  const access_token = getCookie("access_token");
  return async (dispatch) => {
    try {
      const res = await ApiServices.saveInterview(
        sId,
        interviewId,
        obj,
        access_token
      );
      dispatch({
        type: SAVE_INTERVIEW,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      // return err.response.data;
      if (err.status != 400) return err;
    }
  };
};

// ===========  Accounts =============

export const receiveAccountsData = (pages = 1, rows = 10) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getAccountsData(pages - 1, rows);
      dispatch({
        type: GET_API_ACCOUNTS,
        payload: res.data,
        pages: pages - 1,
        rows: rows,
      });

      return res.data;
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const getAccountData = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getAccount(id);
      dispatch({
        type: GET_API_USER,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
      // return err.response !== undefined ? err.response.data.error : {};
    }
  };
};

export const addAccountData = (obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postAccount(obj);
      dispatch({
        type: POST_API_ACCOUNT,
        payload: res,
      });
    } catch (err) {
      if (err.status != 400) return err;
      // console.log("err", err);
      // return err.response.data.error;
    }
  };
};

export const updateAccountData = (id, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putAccount(id, obj);
      dispatch({
        type: PUT_API_ACCOUNT,
        payload: res,
      });
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

// ===========  Users =============

export const getUsersData = (pages = 1, rows = 10, company = false) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getUsers(pages - 1, rows, company);
      dispatch({
        type: GET_API_USERS,
        payload: res.data,
        pages: pages - 1,
      });

      return res.data;
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const getUserData = (id) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.getUser(id, access_token);
      dispatch({
        type: GET_API_USER,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      //      return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const addUserData = (obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postUser(obj);
      dispatch({
        type: POST_API_USER,
        payload: res,
      });

      return res.data;
    } catch (err) {
      // return err.response.data.error;

      if (err.status != 400) return err;
    }
  };
};

export const updateUserData = (id, obj) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.putUser(id, obj, access_token);
      dispatch({
        type: PUT_API_USER,
        payload: res,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;

      //return err.response.data.error;
    }
  };
};

export const deleteUserData = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteUser(id);
      dispatch({
        type: DELETE_API_USER,
        payload: res,
      });
    } catch (err) {
      if (err.status != 400) return err;

      //return err.response.data.error;
    }
  };
};

// ===========  Interview Sessions =============

export const getInterviewSessionsData = (
  page = 1,
  rows = 10,
  company = false
) => {
  return async (dispatch) => {
    try {
      const resParent = await ApiServices.getInterviewScripts(0, 999, company);
      let tempArr = [];
      if (resParent && resParent.data && resParent.data.objects) {
        for (let i = 0; i < resParent.data.objects.length; i++) {
          const res = await ApiServices.getInterviewSessions(
            resParent.data.objects[i].id,
            page - 1,
            rows
          );
          if (res.data && res.data.objects) {
            for (let j = 0; j < res.data.objects.length; j++) {
              tempArr.push({
                ...res.data.objects[j],
                parent_id: resParent.data.objects[i].id,
              });
            }
          }
        }
        dispatch({
          type: GET_API_INTERVIEW_SESSIONS,
          payload: tempArr || [],
        });

        return tempArr;
      }
      return tempArr;
    } catch (err) {
      // console.log("err", err);
      if (err.status != 400) return err;

      //return err.response.data.error;
    }
  };
};

export const getInterviewSessionData = (id, id2) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getInterviewSession(id, id2);
      dispatch({
        type: GET_API_INTERVIEW_SESSION,
        payload: res.data,
      });
      return res;
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const deleteInterviewSessionData = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteInterviewSession(id);
      dispatch({
        type: DELETE_API_INTERVIEW_SESSION,
        payload: res,
      });
    } catch (err) {
      return err.response.data.error;
    }
  };
};

// ===========  Fitness Criteria =============

export const getFitnessCriteriaListData = (
  pages = 1,
  rows = 10,
  company = false
) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getFitnessCriteriaList(
        pages - 1,
        rows,
        company
      );
      dispatch({
        type: GET_API_FITNEWSS_CRITERIA_LIST,
        payload: res.data,
        pages: pages - 1,
      });

      return res.data;
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const getFitnessCriteriaData = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getFitnessCriteria(id);
      dispatch({
        type: GET_API_FITNEWSS_CRITERIA,
        payload: res.data,
      });
      return res;
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const addFitnessCriteriaData = (obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postFitnessCriteria(obj);
      dispatch({
        type: POST_API_FITNEWSS_CRITERIA,
        payload: res,
      });
    } catch (err) {
      // return err.response.
      if (err.status != 400) return err;
    }
  };
};

export const updateFitnessCriteriaData = (id, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putFitnessCriteria(id, obj);
      dispatch({
        type: PUT_API_FITNEWSS_CRITERIA,
        payload: res,
      });

      return res;
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const deleteFitnessCriteriaData = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteFitnessCriteria(id);
      dispatch({
        type: DELETE_API_FITNEWSS_CRITERIA,
        payload: res,
      });
      return res;
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const deleteCriteriaData = (id, id2) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteCriteria(id, id2);
      dispatch({
        type: DELETE_API_CRITERIA,
        payload: res,
      });
      return res;
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const addCriteriaData = (id, obj) => {
  return async (dispatch) => {
    try {
      console.log("-addcriteria--'", id, obj);
      const res = await ApiServices.postCriteria(id, obj);
      dispatch({
        type: POST_API_CRITERIA,
        payload: res,
      });

      return res;
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const addIncentive = (obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postIncentive(obj);
      dispatch({
        type: POST_API_INCENTIVE,
        payload: res,
      });

      return res;
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const updateIncentive = (id, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putIncentive(id, obj);
      dispatch({
        type: PUT_API_INCENTIVE,
        payload: res,
      });
      return res;
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const updateCriteriaData = (id, id2, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putCriteria(id, id2, obj);
      dispatch({
        type: PUT_API_CRITERIA,
        payload: res,
      });
      return res;
    } catch (err) {
      // return err.response.data;
      if (err.status != 400) return err;
    }
  };
};

// ===========  Interview Script =============

export const getInterviewScriptsData = (
  pages = 1,
  rows = 10,
  company = false
) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getInterviewScripts(
        pages - 1,
        rows,
        company
      );
      dispatch({
        type: GET_API_INTERVIEW_SCRIPTS,
        payload: res.data,
        pages: pages - 1,
      });

      return res;
    } catch (err) {
      // console.log("err", err);
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const getIncentiveList = (pages = 0) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getIncentiveList(pages);
      dispatch({
        type: GET_API_INCENTIVE_LIST,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      // console.log("err", err);
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const getInterviewScriptDesign = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getInterviewScriptDesign(id);
      dispatch({
        type: GET_API_INTERVIEW_SCRIPT_DESIGN,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      // console.log("err", err);
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const getInterviewScriptQuestions = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getInterviewScriptQuestions(id);
      dispatch({
        type: GET_API_INTERVIEW_SCRIPT_QUESTIONS,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      // console.log("err", err);
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const deleteInterviewScriptQuestion = (id, id2) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteInterviewScriptQuestion(id, id2);
      dispatch({
        type: DELETE_API_INTERVIEW_SCRIPT_QUESTION,
        payload: res,
      });
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const getInterviewScriptOptions = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getInterviewScriptOptions(id);
      dispatch({
        type: GET_API_INTERVIEW_SCRIPT_OPTIONS,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const getInterviewScriptOption = (id, id2) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.getInterviewScriptOption(id, id2);
      dispatch({
        type: GET_API_INTERVIEW_SCRIPT_OPTION,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const addInterviewScriptOption = (id, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postInterviewScriptOption(id, obj);
      dispatch({
        type: POST_API_INTERVIEW_SCRIPT,
        payload: res,
      });
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

export const addInterviewScriptData = (obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postInterviewScripts(obj);
      dispatch({
        type: POST_API_INTERVIEW_SCRIPT,
        payload: res,
      });
    } catch (err) {
      return err.response.data.error;
    }
  };
};

export const postInterviewScriptDesign = (id, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postInterviewScriptDesign(id, obj);
      dispatch({
        type: POST_API_INTERVIEW_SCRIPT_DESIGN,
        payload: res,
      });

      return res;
    } catch (err) {
      // return err.response.data;
      if (err.status != 400) return err;
    }
  };
};

export const updateInterviewScriptDesign = (id, id2, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putInterviewScriptDesign(id, id2, obj);
      dispatch({
        type: PUT_API_INTERVIEW_SCRIPT_DESIGN,
        payload: res,
      });

      return res;
    } catch (err) {
      // return err.response.data;
      if (err.status != 400) return err;
    }
  };
};

export const postInterviewScriptQuestions = (id, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.postInterviewScriptQuestions(id, obj);
      dispatch({
        type: POST_API_INTERVIEW_SCRIPT_QUESTION,
        payload: res,
      });

      return res;
    } catch (err) {
      if (err.status != 400) return err.response.data;
    }
  };
};

export const updateInterviewScriptQuestion = (id, id2, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putInterviewScriptQuestions(id, id2, obj);
      dispatch({
        type: PUT_API_INTERVIEW_SCRIPT_QUESTION,
        payload: res,
      });

      return res;
    } catch (err) {
      if (err.status != 400) return err.response.data;
    }
  };
};

export const updateInterviewScriptOptions = (id, id2, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putInterviewScriptOptions(id, id2, obj);
      dispatch({
        type: PUT_API_INTERVIEW_SCRIPT_OPTION,
        payload: res,
      });
    } catch (err) {
      console.log("err", err);
      if (err.status != 400) return err;
    }
  };
};

export const updateInterviewScriptQuestions = (id, obj) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.putInterviewScriptQuestions(id, obj);
      dispatch({
        type: PUT_API_INTERVIEW_SCRIPT_QUESTION,
        payload: res,
      });
    } catch (err) {
      // return err.response.data;
      if (err.status != 400) return err;
    }
  };
};

export const deleteInterviewScriptsData = (id) => {
  return async (dispatch) => {
    try {
      const res = await ApiServices.deleteInterviewScripts(id);
      dispatch({
        type: DELETE_API_INTERVIEW_SCRIPT,
        payload: res,
      });
      return res;
    } catch (err) {
      // return err.response.data.error;
      if (err.status != 400) return err;
    }
  };
};

// ===========  GeoTime =============

export const getTimezones = () => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.getTimezones(access_token);
      dispatch({
        type: GET_TIMEZONE,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const getCountries = () => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.getCountries(access_token);
      dispatch({
        type: GET_COUNTRY,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

// ===========  Company =============

export const getOneCompany = (id) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.getOneCompany(id, access_token);
      dispatch({
        type: GET_ONE_COMPANY,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};

export const putOneCompany = (id, obj) => {
  const access_token = getCookie("access_token");

  return async (dispatch) => {
    try {
      const res = await ApiServices.putOneCompany(id, obj, access_token);
      dispatch({
        type: PUT_ONE_COMPANY,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      if (err.status != 400) return err;
    }
  };
};
