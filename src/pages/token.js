import React from "react";
import styled from "styled-components";

// import Sidebar from "./../components/sidebar";
import Header from "./../components/header";
import Footer from "./../components/footer";
import TokenBg from "./../assets/images/token_bg.png";

export default function Token(props) {
  return (
    <TokenWrapper>
      <Header />
      <div className="main-section">
        <div className="main-body">
          <div className="main-title">
            <div className="btn-groups" style={{ alignSelf: "flex-start" }}>
              {" "}
              <div className="btn special">
                Lorem ipsum sit <span className="box "></span>
              </div>
            </div>
            <h1>Join the Falcon Token Airdrop</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>

          <div className="btn-groups">
            <div className="btn">
              Get Started <span className="box black"></span>
            </div>
            <div className="btn black">
              Documentation <span className="box"></span>
            </div>
          </div>
        </div>
        <div className="main-img">
          <div class="flip-box-hidden">
            <img src={TokenBg} alt="mainToken" />
          </div>
          <div class="flip-box-front">
            <img src={TokenBg} alt="mainToken" />
          </div>
          <div class="flip-box-back">
            <img src={TokenBg} alt="mainToken" />
          </div>
        </div>
        <div className="main-footer">
          <p>
            Backed by
            <span className="box"></span>Combinator
          </p>
        </div>
      </div>
      <div className="second-section">
        <div className="large-box"></div>
        <h3>Start designing your mobile app Play today</h3>
        <div className="btn-groups">
          <div className="btn black">
            <span className="box"></span>
            Mac App Store
          </div>
        </div>
        <div
          className="second-footer"
          style={{ display: "flex", gap: "12px", justifyContent: "center" }}
        >
          <p>
            Lorem ipsum dolor sit <span>amet, consectetur</span>{" "}
          </p>
          <span className="box black"></span>
        </div>
      </div>
      <Footer />
    </TokenWrapper>
  );
}
const TokenWrapper = styled.div`
  .main-section {
    position: relative;
    background: #090a0a;
    display: flex;
    width: 100%;
    // height: 100vh;
    padding: 90px 183px;
    padding-bottom: 140px;
    display: flex;
    justify-content: space-between;
    .main-body {
      max-width: 470px;
    }
    .main-img {
      img {
        max-width: 420px;
      }
    }
    .main-title {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 48px;
    }
    h1 {
      // font-family: Inter;
      font-size: 64px;
      font-weight: 500;
      line-height: 77.45px;
      text-align: left;
      color: #e8e8e8;
      margin: 0px;
    }
    p {
      max-width: 460px;
      color: #6e7073;
      margin: 0px;
    }
    @media (max-width: 880px) {
      padding: 68px 20px;
      flex-wrap: wrap;
      flex-reverse: column-reverse;
      justify-content: center;
      .main-img img {
        width: 100%;
      }
      h1 {
        font-size: 36px;
        line-height: 43.57px;
      }
      p {
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
  .main-footer {
    position: absolute;
    bottom: 24px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    p {
      display: flex;
      gap: 14px;
      margin: 0px;
      span.box {
        width: 24px;
        height: 24px;
        background: white;
      }
    }
  }
  .second-section {
    display: flex;
    background: white;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 94px;
    padding-bottom: 94px;
    gap: 24px;
    .large-box {
      width: 44px;
      height: 44px;
      background: black;
      marign-bottom: 10px;
      margin-left: auto;
      margin-right: auto;
    }
    h3 {
      max-width: 521px;
      // font-family: Inter;
      font-size: 38px;
      font-weight: 500;
      line-height: 45.99px;
      text-align: center;
      color: #090a0a;
      margin: 0px auto;
    }
    p {
      // font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      text-align: center;
      color: #6e7073;
      margin: 0px;
    }
    .second-footer span {
      color: black;
      &.box {
        display: inline-block;
        margin: 0px;
        width: 24px;
        height: 24px;
        top: 0px;
        background: black;
      }
    }
  }
  .second-section,
  .main-section {
    .btn-groups {
      display: inline-flex;
      align-self: center;
      .btn {
        // font-family: Inter;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        text-align: left;
        background: #fff;
        color: #000;
        border-radius: 11px;
        padding: 10px 16px;
        display: flex;
        gap: 8px;
        span.box {
          width: 24px;
          height: 24px;
          background: white;
          &.black {
            background: black;
          }
        }
        &.black {
          background: #000;
          color: #fff;
        }
        &.special {
          background: #0f1010;
          color: #fff;
          border-radius: 35px;
          box-shadow: 1px 1px 2px 0px #ffffff0d inset;
        }
      }
    }
  }
  .main-img {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .flip-box-hidden {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .main-img:hover {
    transform: rotateY(180deg);
  }

  .flip-box-front,
  .flip-box-back {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .flip-box-back {
    transform: rotateY(180deg);
  }
`;
