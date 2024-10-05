import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./../../../assets/images/Perceptive_Panda_Logo_light.png";
import { useDispatch } from "react-redux";

import Button from "../../../components/basics/button";
import { sendResetPassword } from "../../../action/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { deleteCookie } from "../../../config/common";
import {
  globalColor,
  center_pos,
  font_dispaly_xs_Semibold,
  font_text_sm_Regular,
  font_text_sm_Semibold,
  font_text_md_Regular,
} from "../../../assets/variable/global";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(-1);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const isExpired = searchParams.get("bool");
  const [state, setState] = useState(isExpired ? isExpired : "0");
  const [step, setStep] = useState(isExpired ? 2 : 0);
  const [users, setUsers] = useState([]);
  const [errText, setErrText] = useState("");
  const [eyeStatus, setEyeStatus] = useState(false);

  useEffect(() => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  }, []);

  useEffect(() => {
    if (flag === 0) {
      if (!validateEmail(email)) setFlag(1);
    }
  }, [flag]);
  useEffect(() => {
    if (step === 2) {
      if (state === "0") {
        navigate(
          `/creator-dashboard/reset-password/${searchParams.get("email")}/${searchParams.get("auth-code")}`
        );
      }
    }
  }, [state, step]);
  function submitFunc() {
    if (validateEmail(email)) {
      sendResetPassword(email)(dispatch).then((res) => {});
    }
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ForgotPasswordWrapper>
      <LeftSide>
        <img src={logo} alt="Sign Logo Img" style={center_pos} />
      </LeftSide>
      <RightSide>
        <form style={center_pos}>
          <h3 style={font_dispaly_xs_Semibold}>
            {step === 0
              ? "Reset your password"
              : step === 1
                ? "Password reset link sent"
                : "Your password reset link has expired"}
          </h3>
          <p style={font_text_md_Regular}>
            {step === 0
              ? "Enter the email address for your account and we'll send you a  password reset link"
              : step === 1
                ? "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
                : "To reset your password, please request a new password reset email to olivia@acme.com"}
          </p>
          {step === 0 && (
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
                  This field is required to reset your password
                </p>
              )}
            </div>
          )}
          <div className="modal-footer-btn">
            {step !== 1 && (
              <Button
                title={step === 2 ? "Resend Email" : "Send password reset link"}
                disable={step === 0 && !validateEmail(email)}
                width="full"
                onClickBtn={() => {
                  submitFunc();
                  // if (step !== 2) setStep(step + 1);
                  setStep(1);
                }}
              />
            )}
            <div className="modal-footer-check">
              {step === 1 && (
                <div style={font_text_sm_Regular}>
                  Didn't receive a reset link? &nbsp;&nbsp;
                  <a
                    href="#"
                    style={font_text_sm_Semibold}
                    onClick={() => {
                      setStep(0);
                    }}
                  >
                    Resend it
                  </a>
                </div>
              )}
              {step != 2 && (
                <div style={font_text_sm_Regular}>
                  Go back to&nbsp;
                  <a
                    href="/creator-dashboard/login"
                    style={font_text_sm_Semibold}
                  >
                    Sign In
                  </a>
                </div>
              )}
              {step === 2 && (
                <div
                  style={{
                    ...font_text_sm_Semibold,
                    marginTop: "24px",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    window.location.href = "/creator-dashboard/login";
                  }}
                >
                  <i class="fas fa-arrow-left"></i> &nbsp; Back
                </div>
              )}
            </div>
          </div>
        </form>
      </RightSide>
    </ForgotPasswordWrapper>
  );
}

const ForgotPasswordWrapper = styled.div`
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
