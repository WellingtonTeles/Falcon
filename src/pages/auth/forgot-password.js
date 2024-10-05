import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginLogo from "./../../assets/images/Content.png";

import Button from "../../components/basics/button";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    if (flag === 0) {
      if (!validateEmail(email)) setFlag(1);
      else {
        submit({
          email,
        });
      }
    }
  }, [flag]);
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const submit = (obj) => {};

  return (
    <ForgotPasswordWrapper>
      <div
        className="modal fade show"
        tabIndex={-1}
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form>
            <div className="modal-content">
              <div className="modal-header">
                <img src={loginLogo} />
                <h2>Forgot password?</h2>
                <h5 className="modal-title">
                  No worries, we'll send you reset instructions.
                </h5>
              </div>
              <div className="modal-body">
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
                      This address is bogus—please try again
                    </p>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-btn">
                  <Button
                    title={"Reset Password"}
                    onClickBtn={() => {
                      setFlag(0);
                    }}
                  />
                </div>
                <div className="modal-footer-check">
                  <a href="">Back to log in</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ForgotPasswordWrapper>
  );
}

const ForgotPasswordWrapper = styled.div`
  width: 100%;
  .modal.fade {
    background: var(--primary-800, #0a5987);
    padding: 32px 40px;
    .modal-dialog,
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
    .modal-footer {
      display: block;
      border: 0px;
      padding: 32px 40px;
      padding-top: 0px;
      h3 {
        color: var(--gray-900, #101828);
        font-family: Figtree;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 150% */
      }
      p {
        color: var(--gray-600, #475467);
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
      }
      .modal-footer-check {
        display: flex;
        justify-content: center;
        margin-top: 24px;
        margin-bottom: 24px;
        a {
          color: #475467;
          font-family: Figtree;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          text-decoration: none;
          line-height: 20px; /* 142.857% */
        }
      }
      .modal-footer-btn {
        display: flex;
        justify-content: flex-end;
        & > div {
          width: 100%;
          text-align: center;
        }
      }
    }
    .button-copy {
      background: #1693c7;
      padding: 10px 16px;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-family: Figtree;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      i {
        margin-right: 8px;
      }
      &.email {
        background: white;
        color: #344054;
        border: 1px solid #d0d5dd;
        margin-right: 10px;
      }
    }
  }
  p.required-html {
    color: red !important;
    font-size: 12px;
    margin-bottom: 0px;
  }
  .modal-header {
    border: 0px;
    display: flex;
    flex-direction: column;
    padding: 32px 40px;
    padding-bottom: 0px;
    img {
      display: flex;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    h2 {
      color: var(--gray-900, #101828);
      text-align: center;
      font-family: Figtree;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px; /* 133.333% */
      margin-bottom: 8px;
    }
    h5 {
      color: var(--gray-600, #475467);
      text-align: center;
      font-family: Figtree;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      margin-bottom: 0px;
    }
  }
  .modal-body {
    padding: 24px 40px;
    padding-top: 0px;
  }
`;
