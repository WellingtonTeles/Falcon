import http from "../config/http-common";
import { getCookie } from "../config/common";
import { Buffer } from "buffer";

const createAccount = (email, company, password) => {
  return http.post(`/v1/users/external`, {
    email: email,
    company_name: company,
    password: password,
  });
};

const sendResetPassword = (email) => {
  return http.get(`/v1/users/verification/password?email=${email}`);
};

const resendVerifyEmail = (code) => {
  return http.get(`/v1/users/verification/resend/` + code);
};

const setNewPassword = (code, email, password) => {
  return http.put(`/v1/users/verification/password/${code}`, {
    email: email,
    password: password,
  });
};

const authUrl = "http://localhost:6001/";

const getToken = (email, password) => {
  const credentials = Buffer.from(`${email}:${password}`).toString("base64");
  const authorizationHeader = `Basic ` + credentials;
  const accessKID = "54bb2165-71e1-41a6-af3e-7da4a0e1e2c1";
  http.defaults.baseURL = authUrl;

  return http.post(
    `/v1/auth/login/${accessKID}`,
    {},
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const getAuthRefreshToken = () => {
  const refresh_token = getCookie("refresh_token");

  if (!refresh_token || refresh_token === null)
    window.location.href = "/creator-dashboard/login";

  const authorizationHeader = `Bearer ` + refresh_token;
  const refreshKID = "28B48444-F87E-487E-A504-61FB68A19149";
  http.defaults.baseURL = authUrl;

  return http.post(
    `/v1/auth/refresh/${refreshKID}`,
    {},
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const putWelcome = (obj, user_id, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  obj.is_onboarded = true;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.put(`/v1/users/` + user_id, obj, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

// =============== Slates ===============

const getSlates = (page, rows, query, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.get(`/v1/slates?page=${page}&rows=${rows}${query}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const getSlate = (id, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.get(`/v1/slates/${id}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const getSlateUrlCode = (id, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.get(`/v1/slates/${id}/url`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const updateSlate = (id, name, status, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.put(
    `/v1/slates/${id}`,
    {
      name: name,
      status: status,
      // end_at: "21/09/23 03:11:04",
      // start_at: "21/09/23 03:11:04",
    },
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const addSlate = (name, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.post(
    `/v1/slates`,
    { name: name },
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const deleteSlate = (id, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.delete(`/v1/slates/${id}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const getInterview = (sId, interviewId, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.get(`/v1/slates/${sId}/interviews/${interviewId}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const saveInterview = (sId, interviewId, obj, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.put(`/v1/slates/${sId}/interviews/${interviewId}`, obj, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const startTestDrive = (url_code, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.get(`/v1/urls/${url_code}/transcripts/start-test-drive`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const advanceTestDrive = (url_code, obj, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.post(`/v1/urls/${url_code}/transcripts/advance-test-drive`, obj, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const getTranscripts = (interview_id, query, session_token) => {
  const authorizationHeader = `Bearer ` + session_token;
  http.defaults.baseURL = "http://localhost:3000/";
  const page = 0;
  const rows = 10;

  return http.get(
    `/v1/interviews/${interview_id}/transcripts?page=${page}&rows=${rows}${query}`,
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const postTranscript = (url_code, obj, session_token) => {
  const authorizationHeader = `Bearer ` + session_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.post(`/v1/urls/${url_code}/transcripts`, obj, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const updateTranscript = (url_code, obj, transcript_id, session_token) => {
  const authorizationHeader = `Bearer ` + session_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.put(`/v1/urls/${url_code}/transcripts/${transcript_id}`, obj, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const createProspectSession = (url_code, access_token) => {
  const sessionKID = "58E64391-93E0-4D24-8698-2B83703ABA03";
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = authUrl;

  return http.post(
    `/v1/auth/${url_code}/create-prospect-session/${sessionKID}`,
    {},
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const updateSlateActivate = (sId, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.put(
    `/v1/slates/${sId}/url`,
    {},
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const getQuestion = (interviewId, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.get(`/v1/interviews/${interviewId}/questions`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const getQuestionQuery = (interviewId, questionId, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.get(`/v1/interviews/${interviewId}/questions/${questionId}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const addQuestion = (interviewId, obj, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.post(`/v1/interviews/${interviewId}/questions`, obj, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const updateQuestion = (interviewId, questionId, obj, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.put(
    `/v1/interviews/${interviewId}/questions/${questionId}`,
    obj,
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const deleteQuestion = (interviewId, questionId, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;
  http.defaults.baseURL = "http://localhost:3000/";

  return http.delete(`/v1/interviews/${interviewId}/questions/${questionId}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

// =============== Accounts ===============

const getAccountsData = (page = 0, rows = 10) => {
  return http.get(`/v1/accounts?page=${page}&rows=${rows}`);
};

const getAccount = (id) => {
  return http.get(`/v1/accounts/${id}`);
};

const postAccount = (obj) => {
  console.log("-post");
  return http.post(`/v1/accounts`, {
    ...obj,
  });
};

const putAccount = (id, obj) => {
  return http.put(`/v1/accounts/${id}`, {
    ...obj,
  });
};

// =============== Users ===============

const getUsers = (page = 0, rows = 10, company) => {
  if (company)
    return http.get(
      `/v1/users?page=${page}&rows=${rows}&query={"$eq": {"account_id": "${localStorage.getItem("account_id") || "53aa35c8-e659-44b2-882f-f6056e443c99"}"}}`
    );
  return http.get(`/v1/users?page=${page}&rows=${rows}`);
};

const getUser = (id, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;

  return http.get(`/v1/users/${id}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const postUser = (obj) => {
  return http.post(`/v1/users`, {
    ...obj,
  });
};

const putUser = (id, obj, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;

  return http.put(
    `/v1/users/${id}`,
    {
      ...obj,
    },
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
};

const deleteUser = (id) => {
  return http.delete(`/v1/users/${id}`);
};

// =============== Interview Sessions ===============

const getInterviewSessions = (id, page = 0, rows = 10) => {
  return http.get(
    `/v1/interview-scripts/${id}/interview-sessions?page=${page}&rows=${rows}`
  );
};
const postInterviewSessions = (id, obj) => {
  return http.post(`/v1/interview-scripts/${id}/interview-sessions`, {
    ...obj,
  });
};
const getInterviewSession = (id, id2) => {
  return http.get(`/v1/interview-scripts/${id}/interview-sessions/${id2}`);
};
const deleteInterviewSession = (id) => {
  return http.delete(`/v1/interview-sessions/${id}`);
};

// =============== Fitness Criteria ===============

const getFitnessCriteriaList = (page = 0, rows = 10, company) => {
  if (company)
    return http.get(
      `/v1/fitness-criteria?page=${page}&rows=${rows}&query={"$eq": {"account_id": "${localStorage.getItem("account_id") || "53aa35c8-e659-44b2-882f-f6056e443c99"}"}}`
    );
  return http.get(`/v1/fitness-criteria?page=${page}&rows=${rows}`);
};
const getFitnessCriteria = (id, page = 0, rows = 10) => {
  return http.get(
    `/v1/fitness-criteria/${id}/criterion?page=${page}&rows=${rows}`
  );
};
const postFitnessCriteria = (obj) => {
  return http.post(`/v1/fitness-criteria`, {
    ...obj,
  });
};
const postCriteria = (id, obj) => {
  return http.post(`/v1/fitness-criteria/${id}/criterion`, {
    ...obj,
  });
};
const putCriteria = (id, id2, obj) => {
  return http.put(`/v1/fitness-criteria/${id}/criterion/${id2}`, {
    ...obj,
  });
};
const putFitnessCriteria = (id, obj) => {
  return http.put(`/v1/fitness-criteria/${id}`, {
    ...obj,
  });
};
const deleteFitnessCriteria = (id) => {
  return http.delete(`/v1/fitness-criteria/${id}`);
};
const deleteCriteria = (id, id2) => {
  return http.delete(`/v1/fitness-criteria/${id}/criterion/${id2}`);
};

// =============== Interview Scripts ===============

const getInterviewScripts = (page = 0, rows = 10, company) => {
  if (company)
    return http.get(
      `/v1/interview-scripts?page=${page}&rows=${rows}&query={"$eq": {"account_id": "${localStorage.getItem("account_id") || "53aa35c8-e659-44b2-882f-f6056e443c99"}"}}`
    );
  return http.get(`/v1/interview-scripts?page=${page}&rows=${rows}`);
};
const getInterviewScriptDesign = (id, page = 0, rows = 10) => {
  return http.get(
    `/v1/interview-scripts/${id}/designs?page=${page}&rows=${rows}`
  );
};
const getInterviewScriptQuestions = (id, page = 0, rows = 10) => {
  return http.get(
    `/v1/interview-scripts/${id}/questions?page=${page}&rows=${rows}`
  );
};
const getInterviewScriptOption = (id, id2) => {
  return http.get(`/v1/interview-scripts/${id}/options/${id2}`);
};
const getInterviewScriptOptions = (id, page = 0, rows = 10) => {
  return http.get(
    `/v1/interview-scripts/${id}/options?page=${page}&rows=${rows}`
  );
};
const postInterviewScriptOption = (id, obj) => {
  return http.post(`/v1/interview-scripts/${id}/options`, {
    ...obj,
  });
};
const putInterviewScriptOptions = (id, id2, obj) => {
  return http.put(`/v1/interview-scripts/${id}/options/${id2}`, {
    has_conversation_page: obj.has_conversation_page,
    has_fitness_score: obj.has_fitness_score,
    has_follow_up: obj.has_follow_up,
    has_instant_scheduling: obj.has_instant_scheduling,
    has_live_takeover: obj.has_live_takeover,
  });
};
const postInterviewScripts = (obj) => {
  return http.post(`/v1/interview-scripts`, {
    ...obj,
  });
};
const postInterviewScriptDesign = (id, obj) => {
  return http.post(`/v1/interview-scripts/${id}/designs`, {
    ...obj,
  });
};
const putInterviewScriptDesign = (id, id2, obj) => {
  return http.put(`/v1/interview-scripts/${id}/designs/${id2}`, {
    ...obj,
  });
};
const postInterviewScriptQuestions = (id, obj) => {
  return http.post(`/v1/interview-scripts/${id}/questions`, {
    ...obj,
  });
};
const putInterviewScriptQuestions = (id, id2, obj) => {
  return http.put(`/v1/interview-scripts/${id}/questions/${id2}`, {
    ...obj,
  });
};
const deleteInterviewScriptQuestion = (id, id2) => {
  return http.delete(`/v1/interview-scripts/${id}/questions/${id2}`);
};
const deleteInterviewScripts = (id) => {
  return http.delete(`/v1/interview-scripts/${id}`);
};

// =============== Incentive ===============

const postIncentive = (obj) => {
  return http.post(`/v1/incentives`, {
    ...obj,
  });
};
const getIncentiveList = (pages = 0, rows = 10) => {
  return http.get(`/v1/incentives?page=${pages}&rows=${rows}`);
};
const getIncentive = (id) => {
  return http.get(`/v1/incentives/${id}`);
};
const putIncentive = (id, obj) => {
  return http.put(`/v1/incentives/${id}`, {
    ...obj,
  });
};
const deleteIncentive = (id) => {
  return http.delete(`/v1/incentives/${id}`);
};

// =============== GeoTime ===============

const getCountries = (access_token) => {
  const authorizationHeader = `Bearer ` + access_token;

  return http.get(`/v1/countries`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const getTimezones = (access_token) => {
  const authorizationHeader = `Bearer ` + access_token;

  return http.get(`/v1/time-zones`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

// =============== Company ===============

const getOneCompany = (id, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;

  return http.get(`/v1/companies/${id}`, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const putOneCompany = (id, obj, access_token) => {
  const authorizationHeader = `Bearer ` + access_token;

  return http.put(`/v1/companies/${id}`, obj, {
    headers: {
      Authorization: authorizationHeader,
    },
  });
};

const ApiServices = {
  createAccount,
  putWelcome,
  resendVerifyEmail,
  sendResetPassword,
  setNewPassword,
  getToken,
  getAuthRefreshToken,
  getSlate,
  getSlateUrlCode,
  getSlates,
  addSlate,
  deleteSlate,
  getAccountsData,
  getAccount,
  postAccount,
  putAccount,
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  getFitnessCriteria,
  getFitnessCriteriaList,
  postFitnessCriteria,
  postCriteria,
  putCriteria,
  putFitnessCriteria,
  deleteFitnessCriteria,
  deleteCriteria,
  getInterviewScriptDesign,
  getInterviewScriptOption,
  getInterviewScriptOptions,
  postInterviewScriptOption,
  putInterviewScriptOptions,
  getInterviewScriptQuestions,
  getInterviewScripts,
  postInterviewScripts,
  deleteInterviewScripts,
  postInterviewScriptDesign,
  putInterviewScriptDesign,
  postInterviewScriptQuestions,
  putInterviewScriptQuestions,
  deleteInterviewScriptQuestion,
  getInterviewSessions,
  getInterviewSession,
  deleteInterviewSession,
  postInterviewSessions,
  postIncentive,
  putIncentive,
  getIncentive,
  deleteIncentive,
  getIncentiveList,
  getInterview,
  saveInterview,
  updateSlate,
  getQuestion,
  getQuestionQuery,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  updateSlateActivate,
  startTestDrive,
  advanceTestDrive,
  postTranscript,
  getTranscripts,
  updateTranscript,
  createProspectSession,
  getCountries,
  getTimezones,
  getOneCompany,
  putOneCompany,
};

export default ApiServices;
