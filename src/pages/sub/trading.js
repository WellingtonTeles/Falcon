import React from "react";
import styled from "styled-components";
import TradingBG from "./../../assets/images/trading_bg.png";

export default function Trading() {
  return (
    <TradingWrapper>
      <div className="wrapper">
        <h3>FUTURE-PROOF YOUR TRADING</h3>
        <h1>FalconAI brings intelligence to trading like never before.</h1>
        <p>
          Effortless trading, right when you need it. Voice-driven, precision
          executed.
        </p>
        <img src={TradingBG} alt="trading" />
        <div className="btn special">
          FalconAI is currently in beta testing on select Falcon user devices.
        </div>
      </div>
    </TradingWrapper>
  );
}

const TradingWrapper = styled.div`
  padding: 68px;
  max-width: 1074px;
  margin: 0px auto;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: middle;
    h1 {
      //   font-family: Inter;
      font-size: 38px;
      font-weight: 500;
      line-height: 45.99px;
      text-align: center;
      color: #e8e8e8;
      max-width: 620px;
      margin: 0px auto;
      margin-bottom: 24px;
    }
    h3 {
      //   font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      text-align: center;
      color: #6e7073;
      margin-bottom: 16px;
    }
    p {
      //   font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      text-align: center;
      color: #6e7073;
      margin-bottom: 20px;
    }
    img {
      width: 100%;
      max-width: 882px;
      margin: 0px auto;
      margin-bottom: 22px;
    }
    .btn {
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      text-align: center;
      color: #6e7073;
      border-radius: 11px;
      padding: 10px 14px;
      display: inline;
      margin: 0px auto;
      &.special {
        background: #090a0a;
        color: #fff;
        border-radius: 35px;
        box-shadow: 1px 1px 2px 0px #ffffff0d inset;
      }
    }
  }
  @media (max-width: 880px) {
    padding: 48px 10px;
    .wrapper {
      h1 {
        font-size: 30px;
        line-height: 36.1px;
        max-width: 300px;
      }
    }
  }
`;
