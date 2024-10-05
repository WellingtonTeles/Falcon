import React from "react";
import styled from "styled-components";
import logo from "./../assets/images/header_logo_1.png";
import TryNow from "./../assets/images/try_now.png";
import Hamburg from "./../assets/images/hamburg.png";
// import Button from "./basics/button";
// import ButtonGroup from "./basics/buttongroup";
// import { display_sm } from "../assets/variable/global";

export default function Header(props) {
  // const { title, subItem, onPrevMain, preview, tag } = props;
  return (
    <HeaderWrapper>
      <div className="falcon-header is-desktop">
        <img src={logo} />
        <ul className="main-body">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Token</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Falcon</a>
          </li>
          <li>
            <a>AI</a>
          </li>
        </ul>
        <div className="btn-gray">
          Log in <span>L</span>
        </div>
      </div>
      <div className="falcon-header is-mobile">
        <img src={logo} />
        <div className="btns-group">
          <div className="btn-gray">
            Try Now <img src={TryNow} alt="HamTryNowburg" />
          </div>
          <div className="btn-gray">
            <img className="Hamburg" src={Hamburg} alt="Hamburg" />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.div`
  padding: 6px 87px;
  max-width: 1266px;
  margin-left: auto;
  margin-right: auto;
  position: sticky;
  top: 0;
  z-index: 1000;
  .falcon-header {
    display: flex;
    justify-content: space-between;
    background: #0f1010;
    border-radius: 8px;
    box-shadow: 1px 1px 2px 0px #ffffff0d inset;
    position: relative;
    align-items: center;
    padding: 10px;
    img {
      width: 76px;
      height: 23.81px;
    }
    ul {
      display: flex;
      list-style-type: none;
      margin: 0px;
      gap: 50px;
      li a {
        //font-family: Inter;
        font-size: 16px;
        font-weight: 400;
        line-height: 19.36px;
        text-align: left;
        color: #e8e8e8;
      }
    }
    .btn-gray {
      cursor: pointer;
      background: #28282c;
      padding: 9px;
      color: #e8e8e8;
      // font-family: Inter;
      font-size: 16px;
      font-weight: 500;
      line-height: 19.36px;
      border-radius: 10px;
      text-align: left;
      span {
        border-radius: 5px;
        background: #48484b;
        // font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.94px;
        text-align: left;
        color: #e8e8e8;
        padding: 1px 8px;
        margin-left: 8px;
      }
      img {
        width: 12px;
        height: 10px;
        margin-left: 8px;
        margin-bottom: 2.5px;
      }
      img.Hamburg {
        width: 18px;
        height: 10px;
        margin: 0px;
        margin-bottom: 1.5px;
      }
    }
  }
  .is-desktop {
    display: flex;
  }
  .is-mobile {
    display: none;
  }
  @media (max-width: 880px) {
    width: 100%;
    padding: 6px 20px;
    .falcon-header {
      &.is-desktop {
        display: none !important;
      }
      &.is-mobile {
        display: flex !important;
        .btn-gray {
          font-size: 14px;
        }
        .btns-group {
          display: flex;
          gap: 10px;
        }
      }
    }
  }
`;
