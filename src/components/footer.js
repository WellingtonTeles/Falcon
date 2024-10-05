import React from "react";
import styled from "styled-components";
import FooterLogo from "./../assets/images/footer_logo.png";
import FooterXLogo from "./../assets/images/footer_X.png";
import FooterMLogo from "./../assets/images/footer_M.png";
import FooterELogo from "./../assets/images/footer_E.png";
import FooterTLogo from "./../assets/images/footer_T.png";

export default function Footer(props) {
  return (
    <FooterWrapper>
      <div className="footer">
        <div className="large-box">
          <img src={FooterLogo} alt="footerlogo" />
        </div>
        <div className="footer-list">
          <h4>Falcon Bot Links</h4>
          <ul>
            <li>@falcon_bot_1</li>
            <li>@falcon_bot_2</li>
            <li>@falcon_bot_3</li>
            <li>@falcon_bot_4</li>
          </ul>
        </div>
        <div className="footer-list">
          <h4>Pages</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Token</li>
            <li>Falcon AI</li>
          </ul>
        </div>
        <div className="footer-list get-connected">
          <h4>Get Connected</h4>
          <ul>
            <li>Falcon Community</li>
            <li className="box-list">
              <img src={FooterXLogo} alt="footerlogo" />
              <img src={FooterTLogo} alt="footerlogo" />
              <img src={FooterMLogo} alt="footerlogo" />
              <img src={FooterELogo} alt="footerlogo" />
            </li>
          </ul>
        </div>
      </div>
    </FooterWrapper>
  );
}
const FooterWrapper = styled.div`
  padding: 48px;
  background: #090a0a;
  .footer {
    max-width: 1073px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
  }
  .large-box {
    img {
      width: 137px;
    }
  }
  .footer-list {
    h4 {
      color: #e8e8e8;
      // font-family: Inter;
      font-size: 18px;
      font-weight: 500;
      line-height: 21.78px;
      text-align: left;
    }
    ul {
      list-style-type: none;
      padding: 0px;
      margin: 0px;
      display: flex;
      gap: 10px;
      flex-direction: column;
      li {
        // font-family: Inter;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-align: left;
        color: #6e7073;
        &.box-list {
          display: flex;
          gap: 14px;
          img {
            cursor: pointer;
            width: 24px;
            height: 24px;
            // background: white;
          }
        }
      }
    }
  }
  @media (max-width: 880px) {
    padding: 36px 20px;
    .footer {
      flex-wrap: wrap;
      gap: 70px;
      row-gap: 49px;
      justify-content: left;
      .large-box {
        order: -1;
      }
      .footer-list.get-connected {
        order: 1;
      }
      .footer-list {
        order: 2;
        h4 {
          margin-bottom: 24px;
        }
      }
    }
  }
`;
