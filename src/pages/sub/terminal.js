import React from "react";
import styled from "styled-components";

export default function Terminal() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const buttons = [
    { label: "Lorem ipsum" },
    { label: "Lorem ipsum" },
    { label: "Lorem ipsum" },
  ];
  return (
    <TerminalWrapper>
      <div className="wrapper">
        <div className="button-group">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`tab-button ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {button.label}
            </button>
          ))}
        </div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        <div className="terminal">
          <div className="terminal-left terminal-card">
            <p>
              Lorem ipsum dolor sit amet, consectetur{" "}
              <span>adipiscing elit, sed do eiusmod tempor incididunt</span> ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris.
            </p>
          </div>
          <div className="terminal-right">
            <div className="terminal-card">
              <p>
                Lorem ipsum dolor sit amet, consectetur{" "}
                <span>adipiscing elit, sed do eiusmod tempor incididunt</span>{" "}
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris.
              </p>
            </div>
            <div className="terminal-card">
              <p>
                Lorem ipsum dolor sit amet, consectetur{" "}
                <span>adipiscing elit, sed do eiusmod tempor incididunt</span>{" "}
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TerminalWrapper>
  );
}

const TerminalWrapper = styled.div`
  padding: 68px;
  max-width: 1074px;
  margin: 0px auto;
  .wrapper {
    h1 {
      // font-family: Inter;
      font-size: 24px;
      font-weight: 400;
      line-height: 34px;
      text-align: center;
      color: #e8e8e8;
      margin-bottom: 54px;
    }
    .terminal {
      display: flex;
      gap: 24px;

      .terminal-card {
        border-radius: 18px;
        background: #0f1010;
        box-shadow: 1px 1px 2px 0px #ffffff0d inset;
        padding: 24px 54px;
      }
      .terminal-left {
      }
      .terminal-right {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      p {
        // font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        text-align: center;
        color: #6e7073;
        span {
          color: white;
        }
      }
    }
    .button-group {
      display: flex;
      overflow: hidden;
      width: 441px;
      margin: 0px auto;
      margin-bottom: 44px;
    }

    .tab-button {
      background: #090a0a;
      border: none;
      border-bottom: 1px solid #6e7073;
      padding: 9px 24px;
      // font-family: Inter;
      font-size: 16px;
      font-weight: 500;
      line-height: 26px;
      text-align: center;
      color: #6e7073;
      cursor: pointer;
      flex: 1;
      transition: background-color 0.3s;
    }

    .tab-button:hover {
      background: #0a090999;
    }

    .tab-button.active {
      color: white;
      border: 1px solid white;
    }

    .content {
      margin-top: 20px;
    }
  }
  @media (max-width: 880px) {
    padding: 68px 20px;
    .wrapper {
      .button-group {
        width: 100%;
        .tab-button {
          padding: 6px 12px;
          font-size: 14px;
          line-height: 19px;
        }
      }
      .terminal {
        flex-wrap: wrap;
        .terminal-card {
          padding: 20px;
        }
      }
    }
  }
`;
