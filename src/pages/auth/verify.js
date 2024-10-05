import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginLogo from "./../../assets/images/logo1.svg";
import logo from "./../../assets/images/Perceptive_Panda_Logo_light.png";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom';

import Button from "../../components/basics/button";
import { getTokenData, getUsersData } from "../../action/api";
import useToken from "./useToken";

const primary_800 = "#0A5987";
const primary_700 = "#007AAB";
const gray_900 = "#101828";
const gray_600 = "#475467";
const gray_200 = "#EAECF0";

export default function Verify(props) {
  // style
  const center_pos = {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  };
  const font_text_md_Regular = {
    fontFamily: "Figtree",
    fontSize: "16px",
    lineHeight: "24px",
    color: gray_600,
    fontWeight: "regular",
    textAlign: "center",
    marginTop: "6px",
  };
  const font_text_sm_Regular = {
    fontFamily: "Figtree",
    fontSize: "14px",
    lineHeight: "20px",
    color: gray_600,
    fontWeight: "regular",
    textAlign: "center",
    marginTop: "24px",
  };
  const font_text_sm_Semibold = {
    fontFamily: "Figtree",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "bold",
    color: primary_700,
    textAlign: "center",
    textDecoration: "none",
  };
  const font_dispaly_xs_Semibold = {
    fontFamily: "Figtree",
    fontSize: "24px",
    lineHeight: "32px",
    textAlign: "center",
    fontWeight: "bold",
    color: gray_900,
  };

  return (
    <VerifyWrapper>
      <LeftSide>
        <img src={logo} alt="Sign Logo Img" style={center_pos} />
      </LeftSide>
      <RightSide>
        <div style={center_pos}>
          <h2 style={font_dispaly_xs_Semibold}>Verify your email address</h2>
          <p style={font_text_md_Regular}>
            To confirm your email address we've sent a verification link to{" "}
            <span style={{ fontWeight: "bold" }}>olivia@aceme.com</span>
          </p>
          <div style={font_text_sm_Regular}>
            Didn't receive a confirmation link? &nbsp;
            <a href="/mission-control/signin" style={font_text_sm_Semibold}>
              Resend it
            </a>
          </div>
          <div style={font_text_sm_Semibold}>
            <i class="fas fa-arrow-left"></i> &nbsp; Back
          </div>
        </div>
      </RightSide>
    </VerifyWrapper>
  );
}

const VerifyWrapper = styled.div`
  display: flex;
  width: 100%;
  div {
    width: 100%;
  }
`;
const LeftSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${primary_800};
  min-height: 100vh;
  height: 100%;
  img {
    display: block;
    max-width: 400px;
  }
`;
const RightSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${gray_200};
  min-height: 100vh;
  height: 100%;
  text-align: center;
  > div {
    max-width: 420px;
    padding: 20px;
    width: 100%;
  }
`;
