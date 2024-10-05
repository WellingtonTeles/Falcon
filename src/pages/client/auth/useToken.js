import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    // localStorage.clear();
    const tokenString = localStorage.getItem("token");
    return tokenString;
    // return tokenString
  };
  const getAccountId = () => {
    const accountId = localStorage.getItem("account_id");
    return accountId;
  };
  const getUserId = () => {
    const user = localStorage.getItem("user_id");
    return user;
  };
  const getOnboarded = () => {
    const user = localStorage.getItem("user_onboard");
    return user;
  };
  const [token, setToken] = useState(getToken());
  const [accountId, setAccountId] = useState(getAccountId());
  const [userId, setUserId] = useState(getUserId());
  const [is_onboarded, setOnboarded] = useState(getOnboarded());

  const saveToken = (userToken, user) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("account_id", user.account_id);
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("user_onboard", user.is_onboarded);
    // setToken(userToken.token);

    setToken(userToken);
    setAccountId(user.account_id);
    setUserId(user.id);
    setOnboarded(user.is_onboarded);
  };
  const saveOnboarded = () => {
    localStorage.setItem("user_onboard", true);
    setOnboarded(true);
  };
  return {
    setToken: saveToken,
    saveOnboarded,
    token,
    accountId,
    userId,
    is_onboarded,
  };
}
