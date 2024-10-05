import React, { useState } from "react";
import styled from "styled-components";
import Button from "../basics/button";
import closeIcon from "./../../assets/images/close.png";

export default function ServerErrorModal(props) {
  const { closeModal, saveModal, title, description, name = "" } = props;
  const [flag, setFlag] = useState(-1);

  return (
    <ServerErrorModalWrapper>
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
                <img
                  src={closeIcon}
                  alt="close"
                  onClick={() => {
                    closeModal();
                  }}
                />
              </div>
              <div className="modal-body">
                <h3>{"Server unavailable—please try again later."}</h3>
                <p>{`This isn't a problem with your browser, your computer, or your internet connection. It's an unexpected problem with our servers that will be fixed shortly.`}</p>
              </div>
              <div className="modal-footer">
                <div className="modal-footer-btn">
                  <Button
                    title={"Report issue"}
                    onClickBtn={() => {
                      setFlag(0);
                      saveModal();

                      closeModal();
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ServerErrorModalWrapper>
  );
}

const ServerErrorModalWrapper = styled.div`
 .modal-header {
    padding: 0px;
    justify-content: flex-end;
    img {
      width: 25px;
    }
    border: 0px;
    margin: 0px;
  }
  .modal-content {
    max-width: 417px;
    padding: 10px;
  }
  .modal-body {
    padding: 0px;
  }
  .modal.fade {
    background: none;
    h3 {
      color: var(--gray-900, #101828);
      font-family: Figtree;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px; /* 155.556% */
      text-align: center;
    }
    p {
      color: var(--gray-600, #475467);
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      margin-bottom: 0px;
      text-align: center;
      padding: 0px 10px;
    }
    .modal-footer {
      display: block;
      border: 0px;
      padding: 0px;
      padding-bottom: 20px;
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
        margin-top: 24px;
        padding-bottom: 0px;
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
`;
