import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhoneBridge from "./../../assets/images/phone_bridge.png";
import PhoneCex from "./../../assets/images/phone_cex.png";
import PhoneDeposit from "./../../assets/images/phone_deposit.png";
import PhoneSwap from "./../../assets/images/phone_swap.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MobileSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    dotsClass: "custom-dots",
    customPaging: (i) => (
      <div className={`custom-dot ${i === 0 ? "inactive" : ""}`}></div>
    ),
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      src: PhoneDeposit,
      title: "Deposit and Withdraw",
      description: "View wallet, deposit and withdraw instantly.",
    },
    {
      src: PhoneSwap,
      title: "Swap Any Coin",
      description: "Market buy, limit orders & TWAP.",
    },
    {
      src: PhoneBridge,
      title: "Bridge Instantly",
      description: "Bridge funds within seconds.",
    },
    {
      src: PhoneCex,
      title: "CEX Integrations",
      description: "Binance, ByBit, Gate and more.",
    },
  ];

  return (
    <MobileSliderWrapper>
      <div className="slider-container">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img src={slide.src} alt="phone" className="phone-image" />
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </MobileSliderWrapper>
  );
};

export default MobileSlider;
const MobileSliderWrapper = styled.div`
  display: none;
  @media (max-width: 880px) {
    display: block;
    .custom-dots {
      display: flex !important;
      padding: 0px;
      justify-content: center;
      margin-top: 15px;
      list-style-type: none;
      li.slick-active {
        .custom-dot {
          background: #1d68ec;
        }
      }
    }
    .custom-dot {
      height: 10px;
      width: 10px;
      margin: 0 5px;
      background-color: #d9d9d9;
      border-radius: 50%;
      display: inline-block;
      cursor: pointer;
      transition:
        background-color 0.3s,
        transform 0.3s;

      &.slick-active {
        background-color: #1d68ec;
        transform: scale(1.4);
      }

      &.inactive {
        background-color: #d9d9d9;
      }

      // &:hover {
      //   background-color: #1d68ec;
      //   transform: scale(1.4);
      // }
    }
    .slider-container {
      width: 100%;
      margin: auto;
    }

    .slide {
      text-align: center;
      padding: 0px;
      h3 {
        // font-family: Inter;
        font-size: 18px;
        font-weight: 500;
        line-height: 21.78px;
        text-align: center;
        color: #000000;
        max-width: 200px;
        margin: 0px auto;
        margin-bottom: 4px;
      }

      p {
        // font-family: Inter;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-align: center;
        color: #6e7073;
        max-width: 200px;
        margin: 0px auto;
      }
    }
    img {
      max-width: 241px;
      margin: 0 auto;
      margin-bottom: 34px;
      width: 100%;
    }
  }
`;
