import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import SmartIcon from "./../../../src/assets/images/sidebar_smart.png";
import CostsIcon from "./../../../src/assets/images/sidebar_costs.png";
import SettingsIcon from "./../../../src/assets/images/sidebar_settings.png";
import logo from "./../../../src/assets/images/logo1.png";
import ACME from "./../../../src/assets/images/LOGO.png";
import AvatarA from "../../../src/assets/images/panda@3x.png";
import logout from "./../../../src/assets/images/logout2.png";
import { useDispatch } from "react-redux";
import useToken from "../../pages/auth/useToken";
import { font_text_sm_Regular1 } from "../../assets/variable/global";

const primary_100 = "#DAF1FA";
export default function Sidebar(props) {
  const location = useLocation();
  const { page = location.pathname } = props;
  const { accountId, userId } = useToken();
  const [accountInfo, setAccountInfo] = useState({ name: "", website: "" });
  const [userInfo, setUserInfo] = useState({
    name: JSON.parse(localStorage.getItem("user")).name,
    email: JSON.parse(localStorage.getItem("user")).email,
  });
  const dispatch = useDispatch();

  return (
    <SidebarWrapper className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100 pt-0">
      <div className="sidebar-header">
        <a
          href="#"
          className="logo-img d-flex align-items-center  mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img src={logo} alt="LOGO" />
        </a>
        <div className="sidebar-header-title">
          <h3 className="p-0 m-0 text-center" style={font_text_sm_Regular1}>
            CUSTOMER & MARKET INSIGHTS
          </h3>
        </div>
      </div>
      <ul
        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start px-3"
        id="menu"
      >
        <li className="nav-item">
          <Link
            to="/creator-dashboard/smart-interviews"
            className={`nav-link align-middle ${page === "/creator-dashboard/smart-interviews" ? "p-active" : ""}`}
          >
            <img src={SmartIcon} alt={"SmartIcon"} />
            <span className="d-none d-sm-inline">Smart Interviews</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/creator-dashboard/costs"
            className={`nav-link align-middle ${page === "/creator-dashboard/costs" ? "p-active" : ""}`}
          >
            <img src={CostsIcon} alt={"Costs"} />
            <span className="d-none d-sm-inline">Costs</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/creator-dashboard/settings"
            className={`nav-link align-middle ${page === "/creator-dashboard/settings" ? "p-active" : ""}`}
          >
            <img src={SettingsIcon} alt={"SettingsIcon"} />
            <span className="d-none d-sm-inline">Settings</span>
          </Link>
        </li>
      </ul>
      <hr />
      <div className="pb-4 sidebar-bottom">
        <div className="d-flex align-items-center text-white">
          <div className="d-flex align-items-center align-self-center">
            <img src={ACME} alt="Avartar" />
          </div>
          <p className="d-none d-sm-inline user-login">
            {userInfo.name} <br />
            <span>{userInfo.email}</span>
          </p>
        </div>
        <div
          className="d-flex align-items-center text-white text-decoration-none btn-out"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          {/* <img src={logout} className="out" /> */}
        </div>
      </div>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  width: 100%;
  width: 300px;
  hr {
  }
  .sidebar-header {
    position: relative;
    width: 100%;
    a.logo-img {
      justify-content: center;
      padding-top: 24px;
      padding-bottom: 24px;
    }
    a.return-link {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-shrink: 0;
      align-self: stretch;
      background: #007aab;
      padding: 4px 16px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      color: #daf1fa;
      img {
        width: 22px;
        height: 22px;
      }
      span {
        font-family: Figtree;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 18px; /* 150% */
      }
    }
    .sidebar-header-title {
      background: #007aab;
      padding: 4px 16px;
      margin-bottom: 24px;
    }
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      a {
        padding: 12px;
        color: white;
        font-family: Figtree;
        font-size: 16px;
        font-style: normal;
        line-height: 20px; /* 125% */
        span {
          margin-left: 10px;
        }
        &:hover,
        &:active,
        &:focus,
        &.p-active {
          border-radius: 6px;
          background: #007aab;
          color: white;
        }
      }
      margin-bottom: 8px;
    }
  }
  .sidebar-bottom {
    display: flex;
    border-top: 1px solid var(--primary-700, #007aab);
    justify-content: space-between;
    width: 100%;
    padding: 5px 25px;
    padding-top: 20px;
    div {
      img {
        height: 40px;
      }
      p {
        color: #fff;
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        line-height: 20px; /* 142.857% */
        margin: 0px;
        margin-left: 12px;
        margin-right: -12px;
        span {
          color: #caebf9;
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 142.857% */
        }
      }
      img.out {
        width: 32px;
        height: 32px;
        /* margin-left: 20px; */
        &:hover {
          background: #fff5;
          border-radius: 5px;
          cursor: pointer;
          // border: solid 2px #f00;
          transition: background 0.5s;
        }
      }
    }
    i {
      line-height: 40px;
    }
  }
`;
