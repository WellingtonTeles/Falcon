import React from "react";
import styled from "styled-components";

// import Sidebar from "./../components/sidebar";
import Header from "./../components/header";
import Footer from "./../components/footer";

export default function AboutUs(props) {
  const items = [
    {
      name: "Lorem ipsum",
      title: "Lorem ipsum dolor sit amet",
      date: "Jul 15, 2024",
    },
    {
      name: "Lorem ipsum",
      title: "Lorem ipsum dolor sit amet",
      date: "Jul 15, 2024",
    },
    {
      name: "Lorem ipsum",
      title: "Lorem ipsum dolor sit amet",
      date: "Jul 15, 2024",
    },
    {
      name: "Lorem ipsum",
      title: "Lorem ipsum dolor sit amet",
      date: "Jul 15, 2024",
    },
    {
      name: "Lorem ipsum",
      title: "Lorem ipsum dolor sit amet",
      date: "Jul 15, 2024",
    },
    {
      name: "Lorem ipsum",
      title: "Lorem ipsum dolor sit amet",
      date: "Jul 15, 2024",
    },
  ];
  return (
    <AboutUsWrapper>
      <Header />
      <div className="main-section">
        <div className="main-body">
          <div className="main-title">
            <div className="btn-groups">
              {" "}
              <div className="btn special">Lorem ipsum sit</div>
            </div>
            <h1>We’re an indie team dotted across the globe</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div
              className="btn-groups"
              style={{ justifyContent: "center", marginTop: "24px" }}
            >
              <div className="btn ">See our values</div>
            </div>
          </div>
        </div>
      </div>
      <div className="third-section">
        <h3>Lorem ipsum</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="item-list">
          {items.map((item, itemIndex) => (
            <div className="item" key={itemIndex + "item"}>
              <div className="item-bg"></div>
              <p className="item-title">{item.title}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <div className="item-logo"></div>
                <h4>{item.name}</h4>
                <p className="item-date">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="third-section">
        <h3>Lorem ipsum</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="item-cards">
          <div className="item-card">
            <div className="item-card-header">
              <span className="box"></span>
              <h4>Lorem ipsum</h4>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eismod tempor incididnet ut labore.
            </p>
            <div className="item-card-btn">
              <p>Lorem ipsum</p> <span className="box"></span>
            </div>
          </div>
          <div className="item-card">
            <div className="item-card-header">
              <span className="box"></span>
              <h4>Lorem ipsum</h4>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eismod tempor incididnet ut labore.
            </p>
            <div className="item-card-btn">
              <p>Lorem ipsum</p> <span className="box"></span>
            </div>
          </div>
          <div className="item-card">
            <div className="item-card-header">
              <span className="box"></span>
              <h4>Lorem ipsum</h4>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eismod tempor incididnet ut labore.
            </p>
            <div className="item-card-btn">
              <p>Lorem ipsum</p> <span className="box"></span>
            </div>
          </div>
          <div className="item-card">
            <div className="item-card-header">
              <span className="box"></span>
              <h4>Lorem ipsum</h4>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eismod tempor incididnet ut labore.
            </p>
            <div className="item-card-btn">
              <p>Lorem ipsum</p> <span className="box"></span>
            </div>
          </div>
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
    </AboutUsWrapper>
  );
}
const AboutUsWrapper = styled.div`
  .main-section {
    position: relative;
    background: #090a0a;
    width: 100%;
    // height: 100vh;
    padding: 84px;
    .main-title {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 48px;
      align-self: center;
    }
    h1 {
      // font-family: Inter;
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

  .third-section {
    background: black;
    max-width: 1074px;
    margin-top: 68px;
    margin-bottom: 68px;
    margin-left: auto;
    margin-right: auto;
    h3 {
      text-align: center;
      // font-family: Inter;
      font-size: 38px;
      font-weight: 500;
      line-height: 45.99px;
      text-align: center;
      color: #ffffff;
      margin: 0px;
    }
    p {
      // font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      text-align: center;
      color: #6e7073;
      max-width: 554px;
      margin: 0px auto;
      margin-top: 24px;
      margin-bottom: 44px;
    }
    .item-list {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      .item {
        .item-bg {
          width: 342px;
          height: 211px;
          border-radius: 18px;
          background: white;
        }
        p.item-title {
          // font-family: Inter;
          font-size: 18px;
          font-weight: 500;
          line-height: 21.78px;
          text-align: left;
          color: #e8e8e8;
          margin: 0px;
          margin-top: 24px;
          margin-bottom: 10px;
        }
        .item-logo {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
        }
        h4 {
          // font-family: Inter;
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          text-align: left;
          color: #e8e8e8;
          margin: 0px;
        }
        p.item-date {
          // font-family: Inter;
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          text-align: left;
          color: #6e7073;
          margin: 0px;
          list-style-type: dot;
        }
      }
    }
    .item-cards {
      display: flex;
      gap: 24px;
      justify-content: center;
      flex-wrap: wrap;
      span.box {
        width: 24px;
        height: 24px;
        background: white;
        &.black {
          background: black;
        }
      }
      .item-card {
        max-width: 434px;
        background: #0f1010;
        padding: 24px;
        border-radius: 18px;
        .item-card-header {
          display: flex;
          gap: 10px;
          h4 {
            // font-family: Inter;
            font-size: 18px;
            font-weight: 500;
            line-height: 21.78px;
            text-align: left;
            color: #e8e8e8;
          }
        }
        p {
          // font-family: Inter;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          text-align: left;
          color: #6e7073;
          margin-top: 10px;
          margin-bottom: 24px;
        }
        .item-card-btn {
          display: inline-flex;
          background: #28282c;
          padding: 8px;
          gap: 8px;
          border-radius: 10px;
          box-shadow: 1px 1px 2px 0px #ffffff0d inset;
          p {
            // font-family: Inter;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            text-align: left;
            color: #e8e8e8;
            margin: 0px;
          }
          span.box {
            width: 24px;
            height: 24px;
            background: white;
          }
        }
      }
    }
    @media (max-width: 880px) {
      padding: 64px 20px;
      .item-list {
        .item,
        .item .item-bg {
          width: 100%;
        }
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
`;
