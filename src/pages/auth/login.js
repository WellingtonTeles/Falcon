import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./../../assets/images/Perceptive_Panda_Logo_light.png";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/basics/button";
import { getTokenData, getUsersData } from "../../action/api";

const primary_800 = "#0A5987";
const gray_900 = "#101828";
const gray_600 = "#475467";
const gray_200 = "#EAECF0";
const error_600 = "#D92D20";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(-1);
  const dispatch = useDispatch();
  // ========== style  =============
  const center_pos = {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  };
  const font_text_sm_Regular = {
    fontFamily: "Figtree",
    fontSize: "16px",
    lineHeight: "20px",
    color: gray_600,
    textAlign: "center",
    marginTop: "0",
  };
  const font_dispaly_xs_Semibold = {
    fontFamily: "Figtree",
    fontSize: "24px",
    lineHeight: "32px",
    textAlign: "center",
    fontWeight: "bold",
    color: gray_900,
  };
  const eye_style = {
    position: "absolute",
    right: "13px",
    top: "42px",
    cursor: "pointer",
  };
  // ========== style end =============
  const [users, setUsers] = useState([]);
  const [errText, setErrText] = useState("");
  const [eyeStatus, setEyeStatus] = useState(false);
  useEffect(() => {
    getUsersData(
      0,
      999
    )(dispatch).then((res) => {
      if (res && res.objects) setUsers([...res.objects]);
    });
  }, [dispatch]);
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
      window.location.href = "/verify";
    }
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <LoginWrapper>
      <LeftSide>
        <img src={logo} alt="Sign Logo Img" style={center_pos} />
      </LeftSide>
      <RightSide>
        <form style={center_pos}>
          <h3 style={font_dispaly_xs_Semibold}>MISSION CONTROL</h3>
          <p style={font_text_sm_Regular}>Administrator Account</p>
          <div className="form-group">
            <label htmlFor={"modal_title"}>Email</label>
            <input
              type="email"
              className={`form-control ${flag === 1 && !validateEmail(email) && "form-validation"}`}
              id="modal_title"
              aria-describedby="modal_title_input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {flag === 1 && !validateEmail(email) && (
              <p className="required-html">
                We don’t see an account with that email address?
              </p>
            )}
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor={"modal_title"}>Password</label>
            <input
              type={eyeStatus ? "text" : "password"}
              className={`form-control ${flag === 1 && password.length < 8 && "form-validation"}`}
              id="modal_title"
              aria-describedby="modal_title_input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {password.length > 0 && (
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
                This field required and over 8 letters.
              </p>
            )}
            {flag === 1 && errText !== "" && (
              <p className="required-html">{errText}</p>
            )}
          </div>
          <div className="modal-footer-btn">
            {/* <Button title="Cancel" outline onClickBtn={closeModal} /> */}
            <Button
              title={"Sign In"}
              disable={flag === 1 || flag === -1}
              width="full"
              onClickBtn={() => {
                submitFunc();
              }}
            />
          </div>
        </form>
      </RightSide>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
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
  background-color: ${primary_800};
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
  background-color: ${gray_200};
  min-height: 100vh;
  height: 100%;
  form {
    max-width: 400px;
    width: 100%;
    padding: 20px;
  }
  .required-html {
    color: ${error_600};
    font-size: 14px;
    line-height: 24px;
  }
`;
