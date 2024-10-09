import React from "react";
import styled from "styled-components";
import TokenImg from "./../../assets/images/token_icon.png";

export default function TelegramApp() {
  return (
    <TelegramAppWrapper>
      <div className="wrapper">
        <div className="main-img">
          <div class="flip-box-hidden">
            <img src={TokenImg} alt="mainToken" />
          </div>
          <div class="flip-box-front">
            <img src={TokenImg} alt="mainToken" />
          </div>
          <div class="flip-box-back">
            <img src={TokenImg} alt="mainToken" />
          </div>
        </div>
        <div className="main">
          <h1>Join the Falcon Token Airdrop</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,do eiusmod
            tempor incididunt ut labore et dolore.
          </p>
          <div className="btn-groups">
            <div className="btn">
              Learn More
              <span className="box black"></span>
            </div>
          </div>
        </div>
      </div>
    </TelegramAppWrapper>
  );
}

const TelegramAppWrapper = styled.div`
  padding: 68px 0px;
  max-width: 1074px;
  margin: 0px auto;
  .wrapper {
    display: flex;
    gap: 133px;
    justify-content: center;
    max-width: 1073px;
    margin: 0px auto;
    background: #0f1010;
    box-shadow: 1px 1px 2px 0px #ffffff0d inset;
    border-radius: 36px;
    padding: 40px 72px;
    img {
      width: 339px;
    }
    .main {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    h1 {
      // font-family: Inter;
      font-size: 50px;
      font-weight: 500;
      line-height: 60.51px;
      text-align: left;
      color: #e8e8e8;
      max-width: 444px;
      margin: 0px;
      margin-bottom: 24px;
    }
    p {
      // font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      text-align: left;
      color: #6e7073;
      margin-bottom: 36px;
    }
    .btn-groups {
      display: inline-flex;
      gap: 24px;
      .btn {
        // font-family: Inter;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
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
          border: 1px solid #373737;
        }
      }
    }
  }
  .main-img {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .main-img:hover {
    transform: rotateY(180deg);
  }
  .flip-box-hidden {
    width: 100%;
    height: 100%;
    max-width: 339px;
    opacity: 0;
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
  @media (max-width: 880px) {
    padding: 68px 20px;
    .wrapper {
      padding: 35px 24px;
      flex-wrap: wrap;
      gap: 16px;
      img {
        width: 100%;
      }
      h1 {
        font-size: 24px;
        line-height: 34px;
      }
    }
  }
`;
