import React from "react";
import styled from "styled-components";
import arrow_left from "./../assets/images/arrow-left.png";
import Button from "./basics/button";
import { text_lx } from "../assets/variable/global";

export default function EditHeader(props) {
  const { title, subTitle, onPrevMain, editBtn } = props;
  return (
    <HeaderWrapper>
      <div className="sub-page">
        <div className="sub-left">
          <div className="sub-title">
            <img
              src={arrow_left}
              alt=""
              onClick={() => {
                if (editBtn)
                  window.location.href = "/creator-dashboard/smart-interviews/";
                else onPrevMain();
              }}
            />
            <h4 style={text_lx}>{title}</h4>
          </div>
        </div>
        <p style={text_lx}>
          {subTitle} {"  "}
          {editBtn == "Test Driven" && (
            <Button icon={"pen"} title={""} outline />
          )}
        </p>
        <div className="sub-right">
          {editBtn && editBtn == "Test Driven" ? (
            <Button
              title={editBtn}
              outline
              icon="eye"
              onClickBtn={() => {
                onPrevMain(1);
              }}
            />
          ) : (
            <Button
              title={editBtn}
              icon="white_pen"
              onClickBtn={() => {
                onPrevMain(1);
              }}
            />
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  background: white;
  display: flex;
  padding: 20px 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  &.account-header {
    flex-direction: row;
    justify-content: space-between;
    .add-account-btn {
      cursor: pointer;
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid var(--primary-600, #1693c7);
      background: var(--primary-600, #1693c7);
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      i {
        margin-right: 5px;
      }
      color: white;
    }
  }
  h2 {
    color: #101828;
    font-family: Figtree;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 38px; /* 126.667% */
  }
  .sub-page.header {
    width: 100%;
    flex-direction: inherit;
    h2 {
      color: #101828;
      font-family: Figtree;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px; /* 155.556% */
    }
    p {
      color: #475467;
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
    .btn-wrapper {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #eaecf0;
      background: #f9fafb;
      padding: 4px;
      .btn-group {
        .btn {
          font-family: Figtree;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 20px; /* 142.857% */
          border: 0px;
          &.active,
          &:focus,
          &:hover {
            color: #344054;
            font-family: Figtree;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 20px; /* 142.857% */
            border-radius: 6px;
            background: #fff;
            box-shadow:
              0px 1px 2px 0px rgba(16, 24, 40, 0.06),
              0px 1px 3px 0px rgba(16, 24, 40, 0.1);
          }
          margin-right: 4px;
        }
      }
    }
  }
  .sub-page {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .sub-title {
      display: flex;
      img {
        width: 24px;
        height: 22px;
        margin-right: 8px;
        margin-top: auto;
        margin-bottom: auto;
        cursor: pointer;
      }
      h4 {
        font-family: Figtree;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 2px;
      }
      margin-bottom: 8px;
    }
    .sub-badges {
      display: flex;
      .badge {
        margin-right: 8px;
      }
    }
  }
  .sub-btns {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  p {
    margin: 0px !important;
  }
`;
