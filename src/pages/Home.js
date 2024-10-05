import React from "react";
import styled from "styled-components";

// import Sidebar from "./../components/sidebar";
import Header from "./../components/header";
import Footer from "./../components/footer";
import falco from "./../assets/images/falcon-black-icon.png";
import join from "./../assets/images/join_icon.png";
import PhoneBridge from "./../assets/images/phone_bridge.png";
import PhoneCex from "./../assets/images/phone_cex.png";
import PhoneDeposit from "./../assets/images/phone_deposit.png";
import PhoneSwap from "./../assets/images/phone_swap.png";
import Phone2Mini from "./../assets/images/phone2_mini.png";
import Phone2Deposit from "./../assets/images/phone2_deposit.png";
import Phone2Fast from "./../assets/images/phone2_fast.png";
import Phone2AI from "./../assets/images/phone2_ai.png";
import PhoneLink from "./../assets/images/video_icon.png";
import Ethereum from "./../assets/images/eth_logo.png";
import Base from "./../assets/images/base_logo.png";
import Tron from "./../assets/images/tron_logo.png";
import Ton from "./../assets/images/ton_logo.png";
import Solana from "./../assets/images/solana_logo.png";
import Try from "./../assets/images/try_falcon_icon.png";
import HomeLogo from "./../assets/images/home_logo.png";
import Arbitrum from "./../assets/images/arbitrum_logo.png";
import Substract from "./../assets/images/Subtract.png";
import Rate from "./sub/rate";
import FrequesntlyAsk from "./sub/ask";
import TelegramApp from "./sub/telegram";
import Blog from "./sub/blog";
import Trading from "./sub/trading";
import CardSection from "./sub/card";
import MobileSlider from "./component/slider";

export default function Home(props) {
  const logos = [
    { name: "Ethereum", src: Ethereum },
    { name: "Base", src: Base },
    { name: "Tron", src: Tron },
    { name: "Ton", src: Ton },
    { name: "Solana", src: Solana },
    { name: "Arbitrum", src: Arbitrum },
  ];
  const phone_seconds = [
    {
      direction: "left",
      title: "Fast and secure on-chain trading.",
      name: "On-Chain",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      src: Phone2Fast,
      list: [
        "Create Wallet",
        "DEX Swapping",
        "Limit Orders",
        "TWAP Orders",
        "Bridge Chains",
        "View Portfolio",
      ],
      spec: true,
      link: {
        name: "Swapping and Bridging.",
        description: "Watch the demo",
      },
    },
    {
      direction: "right",
      title: "CEX account trading and management.",
      name: "Centralized Exchanges",
      src: Phone2Deposit,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list: ["Buy and Sell", "Long and Short", "Long and Short"],
      link: {
        name: "Connecting your CEX account.",
        description: "Watch the demo",
      },
    },
    {
      direction: "right",
      title: "CEX account trading and management.",
      name: "Centralized Exchanges",
      src: Phone2Mini,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list: ["Buy and Sell", "Long and Short", "Long and Short"],
      link: {
        name: "Connecting your CEX account.",
        description: "Watch the demo",
      },
    },
    {
      direction: "left",
      title: "Mini-App Rewards Falcon Community.",
      name: "NOW LIVE",
      src: Phone2Mini,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list: [
        "Earn points by completing tasks",
        "Invite friends to boost rewards",
        "Falcon airdrop coming soon",
      ],
      link: {
        name: "Using Falcon's Mini-App.",
        description: "Watch the demo",
      },
    },
    {
      direction: "left",
      title: "FalconAI LLM makes trading intelligent.",
      name: "COMING SOON",
      src: Phone2AI,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list: [
        "Simple text-to-action",
        "Ask Falcon questions",
        "Supports 12+ languages",
      ],
      link: {
        name: "Talk to Falcon.",
        description: "Watch the demo",
      },
    },
  ];
  const cards = [
    {
      name: "Fastest Orders and Swaps",
      description: "Execute trades faster than any other bot on the market.",
      src: "",
    },
    {
      name: "Sniping Features",
      description:
        "LP sniping features gets you into new coins with an advantage.",
      src: "",
    },
    {
      name: "Wallet Manager",
      description: "Create multiple wallets across many chains with ease.",
      src: "",
    },
    {
      name: "Strong Security",
      description: "Our 256-bit encryption keeps your keys safe and secure.",
      src: "",
    },
    {
      name: "Trade on CEXs",
      description:
        "Connect Falcon to your CEX account and trade from Telegram.",
      src: "",
    },
    {
      name: "On-Chain Activity Tracking",
      description: "Track wallets, holders, prices and more with Falcon.",
      src: "",
    },
  ];
  return (
    <HomeWrapper>
      <Header />
      <div className="main-section">
        <div className="main-body">
          <div className="main-title">
            <div className="main-img">
              <img src={HomeLogo} alt="main-img" />
            </div>
            <h1>
              The Most Advanced <br />
              Trading Experience on Telegram
            </h1>
            <p>
              Falcon brings the security and speed of a CEX to traders, allowing
              fast and simple swaps, bridging and trading strategies all inside
              an easy-to-use bot on Telegram.
            </p>
            <div className="btn-groups">
              <div className="btn">
                <img src={falco} alt="Falco" />
                Try Falcon Bot
              </div>
              <div className="btn black">
                Join Community
                <img src={join} alt="Join" />
              </div>
            </div>
            <div className="logo-lists">
              {logos.map((logo, logoIndex) => (
                <div className="logo" key={"logo-" + logoIndex}>
                  <img src={logo.src} alt={logo.name} />
                </div>
              ))}
            </div>
            <div className="btn-groups">
              <div className="btn black round">
                Join the Falcon mini-app to earn Falcon points for the upcoming
                airdrop.
                <img src={Substract} alt="Falco" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="phone-section">
        <h3>Everything You Need in One Bot</h3>
        <p>
          Falcon's bot includes all of the features you need to trade, bridge,
          and manage your on-chain and off-chain portfolio.
        </p>
        <div className="phone-list">
          <div className="phone-item">
            <img src={PhoneDeposit} alt="phone" />
            <h3>Deposit and Withdraw</h3>
            <p>View wallet, deposit and withdraw instantly.</p>
          </div>
          <div className="phone-item">
            <img src={PhoneSwap} alt="phone" />
            <h3>Swap Any Coin</h3>
            <p>Market buy, limit orders & TWAP.</p>
          </div>
          <div className="phone-item">
            <img src={PhoneBridge} alt="phone" />
            <h3>Bridge Instantly</h3>
            <p>Bridge funds within seconds.</p>
          </div>
          <div className="phone-item">
            <img src={PhoneCex} alt="phone" />
            <h3>CEX Integrations</h3>
            <p>Binance, ByBit, Gate and more.</p>
          </div>
        </div>
        <MobileSlider />
      </div>
      <CardSection
        title="Everything You Need To Trade Intelligently"
        cards={cards}
      />
      <div className="phone-second">
        {phone_seconds.map((phone_item, phone_item_index) => (
          <div
            key={phone_item_index + "-phone-item"}
            className={`phone-item ${phone_item.spec ? "spec" : ""}  ${phone_item.direction !== "left" ? "right" : ""}`}
          >
            <img src={phone_item.src} alt="Phone2" />
            <div className="phone-item-body">
              <h4>{phone_item.name}</h4>
              <h2>{phone_item.title}</h2>
              <p>{phone_item.description}</p>
              <ul>
                {phone_item.list.map((list_link, list_index) => (
                  <li>
                    <span className="box"></span>
                    <p>{list_link}</p>
                  </li>
                ))}
              </ul>
              <div className="phone-item-link">
                <img src={PhoneLink} alt={"link"} />
                <div>
                  <h3>{phone_item.link.name}</h3>
                  <p>{phone_item.link.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Trading />
      <Blog />
      <TelegramApp />
      <Rate />
      <FrequesntlyAsk />
      <div className="second-section">
        <div className="large-box"></div>
        <h3>Start designing your mobile app Play today</h3>
        <div className="btn-groups">
          <div className="btn black">
            {/* <span className="box"></span> */}
            <img src={Try} alt="try falcon bot" />
            {/* Mac App Store */}
            Try Falcon Bot
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
    </HomeWrapper>
  );
}
const HomeWrapper = styled.div`
  .main-section {
    position: relative;
    background: #090a0a;
    width: 100%;
    height: 100vh;
    padding: 27px;
    .main-title {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 48px;
      align-self: center;
      .main-img {
        img {
          width: 301px;
          height: 301px;
        }
        margin: 0px auto;
      }
    }
    h1 {
      font-size: 64px;
      font-weight: 500;
      line-height: 77.45px;
      text-align: center;
      color: #e8e8e8;
      margin: 0px auto;
      max-width: 992px;
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
      margin-top: 34px;
      margin-bottom: 18px;
    }
    @media (max-width: 880px) {
      padding: 20px;
      height: auto;
      h1 {
        font-size: 36px;
        line-height: 43.57px;
      }
      p {
        font-size: 16px;
        line-height: 26px;
      }
      .btn-groups {
        gap: 14px;
        margin-top: 0px;
        margin-bottom: 0px;
        .btn {
          align-items: center;
          font-size: 14px !important;
          padding: 10px 13px !important;
          img {
            width: 20px !important;
            height: 20px;
          }
        }
      }
      .logo-lists {
        flex-wrap: wrap;
        column-gap: 23px;
        row-gap: 11px;
        .logo {
          width: 80px;
        }
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
    @media (max-width: 880px) {
      padding: 88px 20px;
      h3 {
        font-size: 30px;
        line-height: 36.1px;
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
        &.round {
          border-radius: 37px;
          color: #6e7073;
          font-size: 14px;
          line-height: 24px;
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
  .phone-section {
    background: white;
    padding: 68px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    h3 {
      //  font-family: Inter;
      font-size: 38px;
      font-weight: 500;
      line-height: 45.99px;
      text-align: center;
      color: #000000;
      margin: 0px auto;
    }
    p {
      // font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      text-align: center;
      color: #6e7073;
      max-width: 550px;
      margin: 0px auto;
      margin-bottom: 36px;
    }
    .phone-list {
      display: flex;
      gap: 34px;
      justify-content: center;
      .phone-item {
        max-width: 243px;

        img {
          display: block;
          width: 100%;
          margin-bottom: 34px;
        }
        h3 {
          // font-family: Inter;
          font-size: 18px;
          font-weight: 500;
          line-height: 21.78px;
          text-align: center;
          color: #000000;
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
    }
    @media (max-width: 880px) {
      padding: 68px 20px;
      h3 {
        font-size: 30px;
        line-height: 36.31px;
      }
      p {
        font-size: 16px;
        line-height: 26px;
      }
      .phone-list {
        flex-wrap: wrap;
        display: none;
      }
    }
  }
  .phone-second {
    background: white;
    .phone-item {
      display: flex;
      justify-content: space-between;
      padding: 98px 0px;
      margin: 0px auto;
      max-width: 892px;
      &.spec {
        ul li {
          flex: 1 0 45%;
        }
      }
      > img {
        width: 390px;
        height: 460px;
      }
      &.right {
        flex-flow: row-reverse;
      }
      h4 {
        // font-family: Inter;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-align: left;
        color: #1d68ec;
        margin-bottom: 16px;
      }
      h2 {
        // font-family: Inter;
        font-size: 38px;
        font-weight: 500;
        line-height: 45.99px;
        text-align: left;
        color: #000000;
        margin-bottom: 24px;
      }
      p {
        // font-family: Inter;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-align: left;
        color: #6e7073;
        margin-bottom: 34px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin-bottom: 34px;
        gap: 17px;
        padding: 0px;
        li {
          display: flex;
          width: 100%;
          gap: 12px;
          p {
            // font-family: Inter;
            font-size: 16px;
            font-weight: 400;
            line-height: 26px;
            text-align: left;
            color: #1d68ec;
            margin: 0px;
          }
          span.box {
            background: #1d68ec;
            width: 24px;
            height: 24px;
          }
        }
      }
      img,
      & > div {
        max-width: 390px;
      }
    }
    .phone-item-link {
      display: flex;
      gap: 10px;
      img {
        width: 66px;
      }
      & > div {
        h3 {
          // font-family: Inter;
          font-size: 15px;
          font-weight: 500;
          line-height: 18.15px;
          text-align: left;
          color: #000000;
          margin-bottom: 4px;
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
    @media (max-width: 880px) {
      .phone-item {
        flex-wrap: wrap;
        flex-flow: column-reverse;
        padding: 43px 20px;
        &.right {
          flex-flow: column-reverse;
        }
        .phone-item-body {
          h2 {
            font-size: 30px;
            line-height: 36px;
            margin-bottom: 24px;
          }
          ul {
            flex-direction: row;
            li {
              min-width: calc(50% - 12px);
            }
          }
        }
      }
      .phone-item-link {
        margin-bottom: 50px;
      }
    }
  }
`;
