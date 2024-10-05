import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../basics/button";
import usageImg from "./../../assets/images/reuse_icon.png";
import { globalColor } from "../../assets/variable/global";
export default function ActivateModal(props) {
  const {
    closeModal,
    saveModal,
    title,
    description,
    name = "",
    copy = false,
  } = props;
  const [flag, setFlag] = useState(-1);
  const [url, setUrl] = useState(
    title ? title : "https://www.example.com/page.html"
  );
  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL is copied to clipboard!");
      })
      .catch((err) => {
        console.log("Failed to copy text: ", err);
      });
  };
  const handleCopywithoutAlert = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {})
      .catch((err) => {
        console.log("Failed to copy text: ", err);
      });
  };
  useEffect(() => {
    handleCopywithoutAlert();
  }, []);
  return (
    <CancelModalWrapper>
      <div className="back-gray"></div>
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
                <div
                  onClick={closeModal}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ cursor: "pointer" }}
                >
                  <span aria-hidden="true">&times;</span>
                </div>
              </div>
              <div className="modal-body">
                <h3 style={{ textAlign: "center" }}>
                  {!copy ? "Smart Interview Activated!" : "Link Copied!"}
                </h3>
                <p style={{ textAlign: "center" }}>
                  Here's the URL to the interview to send to your audience.
                </p>
              </div>
              <div className="modal-footer">
                <div className="input-form">
                  <input
                    className="form-control"
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                  />
                  <img
                    className="invert-img"
                    src={usageImg}
                    onClick={handleCopy}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CancelModalWrapper>
  );
}

const CancelModalWrapper = styled.div`
  position: relative;
  .back-gray {
    position: fixed;
    background: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }
  .modal {
    max-width: 1140px;
    width: calc(100% - 280px);
    margin-left: 280px;
    .modal-dialog {
      justify-content: center;
    }
  }
  .modal-header {
    border-bottom: 0px;
    padding: 5px 10px;
    justify-content: end;
  }
  .modal-body {
    padding-top: 0px;
  }
  .modal.fade {
    padding: 30px;
    h3 {
      color: var(--gray-900, #101828);
      font-family: Figtree;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px; /* 155.556% */
    }
    p {
      color: var(--gray-600, #475467);
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      margin-bottom: 0px;
    }
    .modal-footer {
      display: block;
      border: 0px;
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
      .modal-footer-btn {
        display: flex;
        justify-content: center;
        .btn-red {
          background: #d92d20;
        }
      }
    }
    .button-copy {
      background: #d92d20;
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
  .input-form {
    position: relative;
    input.form-control {
      padding-right: 56px;
    }
    img {
      cursor: pointer;
      position: absolute;
      top: 1px;
      right: 0px;
      background: ${globalColor.orange_500};
      padding: 8px 16px;
      border-bottom-right-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
  .invert-img {
    filter: invert(100%);
  }
`;
