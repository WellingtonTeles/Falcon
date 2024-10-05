import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../basics/button";
import InputTags from "../tags";

export default function AccountModal(props) {
  const { closeModal, currentAccount, saveModal } = props;
  const [flag, setFlag] = useState(-1);
  const [addCompanyName, setAddCompanyName] = useState(
    currentAccount ? currentAccount.name : ""
  );
  const [password, setPassword] = useState("");

  const [addCompanyEmail, setAddCompanyEmail] = useState(
    currentAccount ? currentAccount.key_contacts : []
  );
  const eye_style = {
    position: "absolute",
    right: "13px",
    top: "42px",
    cursor: "pointer",
  };
  const [eyeStatus, setEyeStatus] = useState(false);

  useEffect(() => {
    if (flag === 0) {
      if (addCompanyName.length < 4 || !validateEmail(addCompanyEmail))
        setFlag(1);
      else {
        saveModal({
          ...currentAccount,
          name: addCompanyName,
          email: addCompanyEmail,
        });
      }
    }
  }, [flag]);
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <AccountModalWrapper>
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
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {currentAccount ? "Edit" : "Add  new"} account
                </h5>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor={"modal_title"}>Company Name</label>
                  <input
                    type="text"
                    className={`form-control ${flag === 1 && addCompanyName.length < 4 && "form-validation"}`}
                    id="modal_title"
                    aria-describedby="modal_title_input"
                    placeholder="Enter company name"
                    value={addCompanyName}
                    onChange={(e) => {
                      setAddCompanyName(e.target.value);
                    }}
                  />
                  {flag === 1 && addCompanyName.length < 4 && (
                    <p className="required-html">
                      This field required and over 4 letters.
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="modal_to">Account Owner Email address</label>
                  <input
                    type="text"
                    className={`form-control ${flag === 1 && !validateEmail(addCompanyEmail) && "form-validation"}`}
                    id="modal_to"
                    placeholder="Enter email address"
                    value={addCompanyEmail}
                    onChange={(e) => {
                      setAddCompanyEmail(e.target.value);
                    }}
                  />
                  {flag === 1 && !validateEmail(addCompanyEmail) && (
                    <p className="required-html">
                      This field required and email validate.
                    </p>
                  )}
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <label htmlFor="modal_to">Account Owner Password</label>
                  <input
                    type={eyeStatus ? "text" : "password"}
                    className={`form-control ${flag === 1 && password.length < 8 && "form-validation"}`}
                    id="modal_to"
                    placeholder="Enter temporary password"
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
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-btn">
                  <Button title="Cancel" outline onClickBtn={closeModal} />
                  <Button
                    title="Copy Invite Link"
                    icon={"link"}
                    iconArrow={"right"}
                    outline
                    onClickBtn={closeModal}
                  />
                  <Button
                    title={!currentAccount ? "Add Account" : "Done"}
                    onClickBtn={() => {
                      setFlag(0);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AccountModalWrapper>
  );
}

const AccountModalWrapper = styled.div`
  .modal.fade {
    background: none;
    .modal-dialog-centered {
      display: grid;
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
      .modal-footer-btn {
        display: flex;
        justify-content: flex-end;
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
  }
`;
