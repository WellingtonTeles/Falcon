import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./../../../../assets/images/Perceptive_Panda_Logo_light.png";
import { useDispatch } from "react-redux";

import Button from "../../../../components/basics/button";
import { getUsersData, setNewPassword } from "../../../../action/api";
import { text_sm_regular } from "../../../../assets/variable/global";
import { useParams, useNavigate } from "react-router-dom";
import {
  globalColor,
  center_pos,
  font_dispaly_xs_Semibold,
  eye_style,
  font_text_sm_Regular,
  font_text_sm_Semibold,
} from "../../../../assets/variable/global";

export default function ResetPassword(props) {
  const { email, code } = useParams();
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(-1);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [errText, setErrText] = useState(
    "That’s so not your password—please try again"
  );
  const [eyeStatus, setEyeStatus] = useState(false);
  useEffect(() => {
    if (flag === 0) {
      setFlag(1);
    }
  }, [flag]);
  function submitFunc() {
    if (password.length >= 8) {
      setNewPassword(
        code,
        email,
        password
      )(dispatch).then((res) => {
        navigate("/creator-dashboard/login");
      });
    }
  }

  return (
    <ResetPasswordWrapper>
      <LeftSide>
        <img src={logo} alt="Sign Logo Img" style={center_pos} />
      </LeftSide>
      <RightSide>
        <form style={center_pos}>
          <h3 style={font_dispaly_xs_Semibold}>{"Enter your new password"}</h3>
          <div className="form-group">
            <label htmlFor={"modal_title"}>Email</label>
            <p style={{ paddingLeft: "10px", ...text_sm_regular }}>{email}</p>
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
            <Button
              title={"Set password"}
              disable={password.length < 8}
              width="full"
              onClickBtn={() => {
                submitFunc();
              }}
            />
            <div className="modal-footer-check">
              <div style={font_text_sm_Regular}>
                Go back to&nbsp;
                <a
                  href="/creator-dashboard/forgot-password"
                  style={font_text_sm_Semibold}
                  // onClick={() => {
                  //   window.location.href = "";
                  // }}
                >
                  Reset Password
                </a>
              </div>
            </div>
          </div>
        </form>
      </RightSide>
    </ResetPasswordWrapper>
  );
}

const ResetPasswordWrapper = styled.div`
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
