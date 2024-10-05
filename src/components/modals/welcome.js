import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Button from "../basics/button";
import closeIcon from "./../../assets/images/close.png";
import cloudIcon from "./../../assets/images/upload-cloud-02.png";
import UploadError from "../../components/modals/uploadError";

import InputTags from "../tags";

export default function WelcomeModal(props) {
  const { closeModal, currentAccount, saveModal } = props;
  const [uploadModalFlag, setUploadModalFlag] = useState(-1);
  const [flag, setFlag] = useState(-1);
  const [addCompanyName, setAddCompanyName] = useState(
    currentAccount ? currentAccount.name : ""
  );
  const [addCompanyWebsite, setAddCompanyWebsite] = useState(
    currentAccount ? currentAccount.website : ""
  );
  const [addCompanyEmail, setAddCompanyEmail] = useState(
    currentAccount ? currentAccount.key_contacts : []
  );
  const fileRef = useRef(null);
  const [iconFile, setIconFile] = useState(null);
  const onSelectFile = (e) => {
    var _URL = window.URL || window.webkitURL;
    const img = new Image();
    const file = fileRef.current?.files["0"];
    img.onload = function () {
      if (img.height < 800 && img.width < 800) setIconFile(img.src);
      else {
        setIconFile(null);
        setUploadModalFlag(1);
        // alert("image size overflow!");
      }
    };
    img.src = _URL.createObjectURL(file);
  };
  //==style==
  const modalHeader = {
    flexDirection: "column",
    borderBottom: "0px",
    marginBottom: "0px",
    paddingBottom: "0px",
  };
  const modalBody = {
    paddingTop: "0px",
  };
  //==end style==
  useEffect(() => {
    if (flag === 0) {
      if (addCompanyName.length < 4 || !isValidUrlFormat(addCompanyWebsite))
        setFlag(1);
      else {
        saveModal({
          name: addCompanyName,
          company_website: addCompanyWebsite,
        });
        // closeModal();
      }
    }
  }, [flag]);
  const isValidUrlFormat = (url) => {
    return true;
    // Regular expression for basic URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const checkEmailList = (list) => {
    console.log("--checkemail--", list);
    if (list.length === 0 || list.length > 3) {
      return false;
    }
    for (let i = 0; i < list.length; i++) {
      if (!validateEmail(list[i])) {
        return false;
      }
    }
    return true;
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
              <div className="modal-header" style={modalHeader}>
                <h5
                  className="modal-title"
                  id="exampleModalLongTitle"
                  style={{ width: "100%" }}
                >
                  Welcome! We’ll need this info to get started.
                </h5>
              </div>
              <div className="modal-body" style={modalBody}>
                <div className="form-group">
                  <label htmlFor={"modal_title"}>Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${flag === 1 && addCompanyName.length < 4 && "form-validation"}`}
                    id="modal_title"
                    aria-describedby="modal_title_input"
                    placeholder="Enter full name"
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
                  <label htmlFor="modal_to">Company Website</label>
                  <input
                    type="text"
                    className={`form-control ${flag === 1 && !isValidUrlFormat(addCompanyWebsite) && "form-validation"}`}
                    id="modal_to"
                    placeholder="Enter company website"
                    value={addCompanyWebsite}
                    onChange={(e) => {
                      setAddCompanyWebsite(e.target.value);
                    }}
                  />
                  {flag === 1 && !isValidUrlFormat(addCompanyWebsite) && (
                    <p className="required-html">
                      This field is in URL(https://, http://) format.
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="modal_to">Company logo</label>
                  <div className="modal-upload">
                    {!!iconFile ? (
                      <img src={iconFile} />
                    ) : (
                      <label
                        htmlFor="images"
                        className="cloud-icon"
                        id="dropcontainer"
                      >
                        <img src={cloudIcon} htmlFor="actual-btn" />
                        <p style={{ width: "100%" }}>
                          <span>Click to select</span> an image or drag and drop
                          it here
                          <br />
                          SVG, PNG, JPG or GIF (max. 800x800px)
                        </p>
                        <input
                          ref={fileRef}
                          type="file"
                          id="images"
                          accept="image/*"
                          required
                          onChange={onSelectFile}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-btn">
                  <Button
                    title="Do this later"
                    outline
                    full="full"
                    onClickBtn={closeModal}
                  />
                  <Button
                    title="Done"
                    full="full"
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
      {uploadModalFlag != -1 && (
        <UploadError
          closeModal={() => {
            setUploadModalFlag(-1);
          }}
          text=""
          saveModal={(e) => {}}
        />
      )}
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
  .modal-upload {
    text-align: center;
    .cloud-icon {
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: flex-start;
      gap: 4px;
      align-self: stretch;
      border-radius: 12px;
      padding: 16px 24px;
      border: 1px solid #d0d5dd;
      background: var(--base-white, #fff);
      flex-wrap: wrap;
      flex-direction: column;
      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        border-radius: 8px;
        padding: 10px;
        border: 1px solid var(--gray-200, #eaecf0);
        background: var(--base-white, #fff);
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      }
      p {
        color: var(--gray-600, #475467);
        text-align: center;
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
        span {
          color: var(--primary-700, #007aab);
          font-family: Figtree;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 20px; /* 142.857% */
        }
      }
      input {
        display: none;
      }
    }
  }
`;
