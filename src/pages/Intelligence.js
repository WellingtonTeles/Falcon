import React from "react";
import styled from "styled-components";

import Header from "./../components/header";
import Footer from "./../components/footer";
import Ethereum from "./../assets/images/eth_logo.png";
import Base from "./../assets/images/base_logo.png";
import Tron from "./../assets/images/tron_logo.png";
import Ton from "./../assets/images/ton_logo.png";
import Solana from "./../assets/images/solana_logo.png";
import Arbitrum from "./../assets/images/arbitrum_logo.png";
import FrequesntlyAsk from "./sub/ask";
import CardSection from "./sub/card";
import PrototypeGallery from "./sub/gallery";
import Terminal from "./sub/terminal";

export default function Intelligence(props) {
  const logos = [
    { name: "Ethereum", src: Ethereum },
    { name: "Base", src: Base },
    { name: "Tron", src: Tron },
    { name: "Ton", src: Ton },
    { name: "Solana", src: Solana },
    { name: "Arbitrum", src: Arbitrum },
  ];
  const cards = [
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do",
      src: "",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do",
      src: "",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do",
      src: "",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do",
      src: "",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do",
      src: "",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do",
      src: "",
    },
  ];
  return (
    <IntelligenceWrapper>
      <Header />
      <div className="main-section">
        <div className="main-body">
          <div className="main-title">
            <div className="main-img" style={{ height: "300px" }}></div>
            <div className="btn-groups">
              {" "}
              <div className="btn special">Lorem ipsum sit</div>
            </div>
            <h1>Never lose information</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div className="logo-lists">
              {logos.map((logo, logoIndex) => (
                <div className="logo" key={"logo-" + logoIndex}>
                  <img src={logo.src} alt={logo.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CardSection
        title="Spot issues faster with smart indicators"
        cards={cards}
        footer="Automatically handles anomaly detection rules that trigger without human attention"
      />
      <Terminal />
      <PrototypeGallery />
      <FrequesntlyAsk />
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
    </IntelligenceWrapper>
  );
}
const IntelligenceWrapper = styled.div`
  .main-section {
    position: relative;
    background: #090a0a;
    width: 100%;
    // height: 100vh;
    padding: 184px;
    .main-title {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 48px;
      align-self: center;
    }
    h1 {
      font-size: 44px;
      font-weight: 500;
      line-height: 53.25px;
      text-align: center;
      color: #e8e8e8;
      margin: 0px auto;
      max-width: 559px;
    }
    p {
      text-align: center;
      color: #6e7073;
      //  font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      max-width: 700px;
      margin: 0px auto;
    }
    .btn-groups {
      margin-bottom: 0px;
    }
    @media (max-width: 880px) {
      padding: 64px 20px;
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
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 94px;
    padding-bottom: 94px;
    background: white;
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
      gap: 24px;
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
        img {
          width: 26px;
        }
        &.black {
          background: #000;
          color: #fff;
          border: 1px solid #373737;
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
  .logo-lists {
    display: flex;
    gap: 30px;
    justify-content: center;
    .logo {
      max-width: 104px;
      img {
        width: 100%;
      }
    }
  }
`;
