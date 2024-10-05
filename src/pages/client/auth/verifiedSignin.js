import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginLogo from "./../../../assets/images/logo1.svg";
import logo from "./../../../assets/images/Perceptive_Panda_Logo_light.png";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Button from "../../../components/basics/button";
import { getTokenData, putWelcome } from "../../../action/api";
import useToken from "./useToken";
import {
  globalColor,
  center_pos,
  font_dispaly_xs_Semibold,
  eye_style,
  font_text_sm_Regular,
  font_text_sm_Semibold,
} from "../../../assets/variable/global";

export default function VerifiedSignin(props) {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(-1);
  const dispatch = useDispatch();
  const { token, setToken } = useToken();
  const [errText, setErrText] = useState("");
  const [eyeStatus, setEyeStatus] = useState(false);
  useEffect(() => {
    if (flag === 0) {
      if (password.length < 8 || !validateEmail(email)) setFlag(1);
    }
  }, [flag]);
  useEffect(() => {
    if (password.length > 0) {
      if (password.length < 8 || !validateEmail(email)) setFlag(1);
      else setFlag(0);
    }
  }, [password]);
  function submitFunc() {
    if (password.length >= 8 && validateEmail(email)) {
      getTokenData(
        email,
        password
      )(dispatch).then((res) => {
        if (res && res.access_token) {
          const user = res.user;
          //user.is_onboarded = true;
          setToken(res.access_token, user);
          putWelcome(user.id)(dispatch).then((res1) => {
            navigate("/creator-dashboard/smart-interviews");
          });
        } else {
          if (res.status !== 200) {
            if (res.data.message.includes("hashedPassword")) {
              setErrText("That's so not your password-please try again");
            } else setErrText(res.statusText);
            setFlag(1);
          }
          return;
        }
      });
      // window.location.href = "/creator-dashboard/smart-interviews";
    }
  }
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <VerifiedSigninWrapper>
      <LeftSide>
        <img src={logo} alt="Sign Logo Img" style={center_pos} />
      </LeftSide>
      <RightSide>
        <form style={center_pos}>
          <h3 style={font_dispaly_xs_Semibold}>
            Email address verified! <br />
            Please sign into your account
          </h3>
          <div className="form-group">
            <label htmlFor={"modal_title_email"}>Email</label>
            <input
              type="email"
              className={`form-control ${flag === 1 && !validateEmail(email) && "form-validation"}`}
              id="modal_title_email"
              aria-describedby="modal_title_email_input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {flag === 1 && !validateEmail(email) && (
              <p className="required-html">
                This address is bogus—please try again
              </p>
            )}
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor={"modal_title_password"}>Password</label>
            <input
              type={eyeStatus ? "text" : "password"}
              className={`form-control ${flag === 1 && (password.length < 8 || errText != "") && "form-validation"}`}
              id="modal_title_password"
              aria-describedby="modal_title_password_input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                if (e.target.value.length < 8) setErrText("");
                setPassword(e.target.value);
              }}
            />
            {password.length > 0 && !/Edg/.test(navigator.userAgent) && (
              <i
                className={eyeStatus ? "far fa-eye-slash" : "far fa-eye"}
                style={eye_style}
                onClick={() => {
                  setEyeStatus(!eyeStatus);
                }}
              ></i>
            )}
            {flag === 1 && password.length < 8 && (
              <p className="required-html">
                Our favorite passwords are 8 characters or more
              </p>
            )}
            {flag === 1 && errText !== "" && (
              <p className="required-html">{errText}</p>
            )}
          </div>
          <div className="modal-footer-btn">
            {/* <Button title="Cancel" outline onClickBtn={closeModal} /> */}
            <Button
              title={"Sign in"}
              disable={flag === 1 || flag === -1}
              width="full"
              onClickBtn={() => {
                submitFunc();
              }}
            />
            <div className="modal-footer-check">
              <div style={font_text_sm_Regular}>
                <a
                  href="/creator-dashboard/forgot-password"
                  style={font_text_sm_Semibold}
                >
                  Forgot password
                </a>
              </div>
            </div>
          </div>
        </form>
      </RightSide>
    </VerifiedSigninWrapper>
  );
}

const VerifiedSigninWrapper = styled.div`
  display: flex;
  width: 100%;
  form {
    width: 100%;
  }
  form .form-control.form-validation {
    border-color: red;
    margin-bottom: 3px;
  }
  form .form-group {
    label {
      color: #344054;
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
      margin-bottom: 6px;
    }
    input,
    textarea {
      border-radius: 8px;
      border: 1px solid #d0d5dd;
      background: #fff;
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      color: #667085;
      font-family: Figtree;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      margin-bottom: 16px;
    }
  }
`;
const LeftSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${globalColor.primary_800};
  min-height: 100vh;
  height: 100%;
  img {
    display: block;
    max-width: 400px;
  }
`;
const RightSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${globalColor.gray_200};
  min-height: 100vh;
  height: 100%;
  form {
    max-width: 400px;
    width: 100%;
    padding: 20px;
  }
  .required-html {
    color: #d92d20;
    font-size: 14px;
    line-height: 24px;
  }
`;
