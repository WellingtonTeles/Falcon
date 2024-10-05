import { GET_API_ACCOUNTS, GET_API_USERS, POST_API_ACCOUNT, PUT_API_ACCOUNT } from "../action/type";

const initialState = {
  account_page: 1,
  account_total: 0,
  account_limit: 10,
  account_order: "asc",
  accounts: [],
  user_page: 1,
  user_total: 0,
  user_limit: 10,
  user: [],
};

function apiReducer(apis = initialState, action) {
  const { type, payload, pages } = action;
  switch (type) {
    case GET_API_ACCOUNTS:
      return {
        ...apis,
        account_page: pages,
        account_total: payload.total,
        accounts: [...payload.objects]
      };
    case POST_API_ACCOUNT:
      return {
        ...apis,
        accounts: [...apis.accounts, payload.data.objects[0]]
    }
    case PUT_API_ACCOUNT:
      let temp_accounts = [...apis.accounts];
      for(let i = 0; i< temp_accounts.length; i++){
        if(temp_accounts[i].id === payload.data.objects[0].id){
          temp_accounts[i] = {...payload.data.objects[0]}
          break;
        }
      }
      return {
        ...apis,
        accounts: [...temp_accounts]

    }
    case GET_API_USERS:
      return {
        ...apis,
        user_page: pages,
        user_total: payload.total,
        users: [...payload.objects]
      };
    default:
      return apis;
  }
}

export default apiReducer;
