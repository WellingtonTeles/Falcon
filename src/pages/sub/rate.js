import React from "react";
import styled from "styled-components";
import bg from "./../../assets/images/rate_bg.png";
import Star from "./../../assets/images/star.png";

export default function Rate(props) {
  return (
    <RateWrapper>
      <div className="bg">
        <img src={bg} alt="bg" />
      </div>
      <div className="rate-wrapper">
        <div className="rate">
          <h1>4.9</h1>
          <div className="middle">
            <div className="star-lists">
              <img src={Star} alt="Star" />
              <img src={Star} alt="Star" />
              <img src={Star} alt="Star" />
              <img src={Star} alt="Star" />
              <img src={Star} alt="Star" />
            </div>
            <p>Lorem ipsum dolor</p>
          </div>
        </div>
        <div className="box"></div>
      </div>
    </RateWrapper>
  );
}

const RateWrapper = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, #090a0a 0%, rgba(9, 10, 10, 0) 49.51%),
      linear-gradient(0deg, rgba(9, 10, 10, 0) 49.97%, #090a0a 100%),
      linear-gradient(0deg, rgba(9, 10, 10, 0.4), rgba(9, 10, 10, 0.4));
  }
  .bg {
    img {
      width: 100%;
    }
  }
  .rate-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 18px;
    padding: 24px;
    min-width: 331px;
    background: #0f1010;
    box-shadow: 1px 1px 2px 0px #ffffff0d inset;
    .rate {
      display: flex;
      gap: 28px;
      .middle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .star-lists {
          display: flex;
          gap: 8px;
          img {
            width: 14px;
            height: 13px;
          }
          margin-bottom: 8px;
        }
        p {
          // font-family: Inter;
          font-size: 12px;
          font-weight: 400;
          line-height: 14.52px;
          text-align: left;
          color: #6e7073;
          margin: 0px;
        }
      }
    }
    h1 {
      //   font-family: Inter;
      font-size: 34px;
      font-weight: 400;
      line-height: 41.15px;
      text-align: left;
      color: #ffffff;
      margin: 0px;
    }
    .box {
      width: 24px;
      height: 24px;
      background: white;
    }
  }
  @media (max-width: 880px) {
    .bg {
      img {
        min-height: 594px;
        object-fit: cover;
      }
    }
  }
`;
