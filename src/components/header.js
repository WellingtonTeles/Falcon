import React, { useState } from "react";
import styled from "styled-components";
import logo from "./../assets/images/header_logo_1.png";
import TryNow from "./../assets/images/try_now.png";
import Hamburg from "./../assets/images/hamburg.png";
import blueTry from "./../assets/images/blule_try.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <HeaderWrapper>
      <div className="falcon-header is-desktop">
        <Link to="/home">
          {" "}
          <img src={logo} />
        </Link>
        <ul className="main-body">
          <li>
            <Link to="/home">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link to="/token">
              <a>Token</a>
            </Link>
          </li>
          <li>
            <Link to="/aboutus">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link to="/intelligence">
              {" "}
              <a>Falcon</a>
            </Link>
          </li>
          <li>
            <Link to="/loading">
              {" "}
              <a>AI</a>
            </Link>
          </li>
        </ul>
        <div className="btn-gray">
          {/* Log in <span>L</span> */}
          Try Falcon Now{" "}
          <img className="blue-img" src={blueTry} alt="blue_try" />
        </div>
      </div>
      <div className="falcon-header is-mobile">
        <img src={logo} />
        <div className="btns-group">
          <div className="btn-gray">
            Try Now <img src={TryNow} alt="HamTryNowburg" />
          </div>
          <div className="btn-gray" onClick={toggleSidebar}>
            <img className="Hamburg" src={Hamburg} alt="Hamburg" />
          </div>
        </div>
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleSidebar}>
          &times; {/* Close Icon */}
        </div>
        <ul>
          <li>
            <Link to="/home">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link to="/token">
              <a>Token</a>
            </Link>
          </li>
          <li>
            <Link to="/aboutus">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link to="/intelligence">
              {" "}
              <a>Falcon</a>
            </Link>
          </li>
          <li>
            <Link to="/loading">
              {" "}
              <a>AI</a>
            </Link>
          </li>
        </ul>
      </div>
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.div`
  position: relative;
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
        text-decoration: none;
        &:hover,
        &.active {
          font-weight: 500;
          color: #e8e8e8;
        }
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
  .sidebar {
    position: fixed;
    top: 0;
    right: -250px; /* Hidden by default */
    width: 250px;
    height: 100%;
    background-color: #333;
    color: white;
    transition: right 0.3s ease;
    z-index: 1000;
  }

  .sidebar.open {
    right: 0; /* Show sidebar */
  }

  .close-btn {
    font-size: 30px;
    cursor: pointer;
    padding: 10px;
    text-align: right;
  }

  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }

  .sidebar li {
    padding: 15px;
    text-align: center;
  }

  .sidebar a {
    color: white;
    text-decoration: none;
  }

  .sidebar a:hover {
    text-decoration: underline;
  }
  .falcon-header .btn-gray .blue-img {
    width: 16px;
    height: 13.33px;
    margin-left: 8px;
    margin-bottom: 0px;
  }
`;
