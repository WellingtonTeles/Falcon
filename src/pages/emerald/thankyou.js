import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import logo from "./../../assets/images/LOGO.png";
import tree_coupon from "./../../assets/images/tree_coupon.png";
import answer_footer from "./../../assets/images/answer_footer.png";
import mobile_footer from "./../../assets/images/mobile_footer.png";
import communicationIcon from "./../../assets/images/goal_communication_panda.png";
import white_mobile from "./../../assets/images/white_mobile.png";
import white_pc from "./../../assets/images/white_pc.png";
import black_mobile from "./../../assets/images/black_mobile.png";
import black_pc from "./../../assets/images/black_pc.png";
import send from "./../../assets/images/sendYellow.png";
import coupon from "./../../assets/images/coupon.png";
import { useDispatch, useSelector } from "react-redux";
import TypingComponent from "./typing";
import Button from "../../components/basics/button";
import { globalColor } from "../../assets/variable/global";
import { useNavigate } from "react-router-dom";

export default function Thankyou(props) {
  const navigate = useNavigate();

  return (
    <ThankyouWrapper>
      <ThankyouHeader>
        <img src={logo} alt="Logo" />
      </ThankyouHeader>
      <ThankyouBody>
        <h2> Thank you very much</h2>
        <img className="coupon" src={tree_coupon} />
      </ThankyouBody>
      <div className="answerFooter">
        <img src={answer_footer} alt="footer" />
        <h4>Create a smart interview for your business!</h4>
      </div>
    </ThankyouWrapper>
  );
}
const ThankyouHeader = styled.div`
  background-color: #dfe4ed;
  display: flex;
  padding: 12px;
  img {
    height: 60px;
  }
  justify-content: center;
`;
const ThankyouBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  flex-grow: 1;
  h2 {
    max-width: 600px;
    text-align: center;
    font-size: 30px;
    line-height: 38px;
    font-weight: bold;
    font-family: "Figtree";
    margin: 0px;
    padding-top: 40px;
  }
  img.coupon {
    padding: 40px 0px;
    max-width: 400px;
  }
`;
const ThankyouWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f7f9fb;
  .answerFooter {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 40px;
    img {
      padding-bottom: 8px;
      width: 212px;
      margin-left: auto;
      display: block;
      margin-right: auto;
    }
    h4 {
      color: ${globalColor.gray_500};
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      font-family: Figtree;
    }
  }
`;
