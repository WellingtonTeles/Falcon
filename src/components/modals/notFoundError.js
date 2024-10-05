import React, { useState } from "react";
import styled from "styled-components";

export default function NotFoundErrorModal() {
  return <NotFoundErrorModalWrapper></NotFoundErrorModalWrapper>;
}

const NotFoundErrorModalWrapper = styled.div`
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
