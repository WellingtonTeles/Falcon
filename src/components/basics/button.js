import React from "react";
import styled from "styled-components";
import refresh from "./../../assets/images/refresh-cw-05.png";
import filter from "./../../assets/images/filter-lines.png";
import save from "./../../assets/images/save-01.png";
import arrowLeft from "./../../assets/images/arrow-left.png";
import arrowRight from "./../../assets/images/arrow-right.png";
import reuse from "./../../assets/images/reuse_icon.png";
import resultIcon from "./../../assets/images/result_icon.png";
import pen from "./../../assets/images/pen_small.png";
import white_pen from "./../../assets/images/white_pen.png";
import copy from "./../../assets/images/copy.png";
import trash from "./../../assets/images/trash_small.png";
import active from "./../../assets/images/active.png";
import closeIcon from "./../../assets/images/close_icon.png";
// import code from './../assets/images/code-snippet.svg';
const IconWrap = (props) => {
  switch (props.icon) {
    case "close":
      return <img src={closeIcon} alt="close_icon" />;
    case "white_pen":
      return <img src={white_pen} alt="white_pen" />;
    case "pen":
      return (
        <img
          src={pen}
          alt="pen"
          className={props.marginEmpty ? "marginEmpty" : ""}
        />
      );
    case "trash":
      return <img src={trash} alt="trash" />;
    case "active":
      return <img src={active} alt="active" />;
    case "eye":
      return <i className="fa fa-eye" aria-hidden="true"></i>;
    case "plus":
      return <i className="fa fa-plus" aria-hidden="true"></i>;
    case "refresh":
      return <img src={refresh} alt="referesh" />;
    case "save":
      return <img src={save} alt="save" />;
    case "filter":
      return <img src={filter} alt="filter" />;
    case "arrowLeft":
      return <img src={arrowLeft} alt="arrowLeft" />;
    case "arrowRight":
      return <img src={arrowRight} alt="arrowRight" />;
    case "reuse":
      return <img src={reuse} alt="reuse" />;
    case "copy":
      return <img src={copy} alt="copy" />;
    case "result":
      return <img src={resultIcon} alt="resultIcon" />;
    default:
      return;
  }
};
export default function Button(props) {
  const { title, icon, outline, onClickBtn, red, full = "regular" } = props;
  const fullMode = {
    textAlign: "center",
    width: "100%",
  };
  return (
    <ButtonWrapper
      className={outline ? "outline" : red ? "red" : ""}
      onClick={onClickBtn}
      disabled={props.disable ? props.disable : false}
      width={props.width ? props.width : "auto"}
      margin={props.margin ? props.margin : null}
      style={full !== "regular" ? fullMode : null}
      marginEmpty={title == "" ? "marginEmpty" : ""}
    >
      {icon != null && (
        <IconWrap icon={icon} marginEmpty={title == "" ? "marginEmpty" : ""} />
      )}
      {title}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  background: #1693c7;
  padding: 10px 16px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: Figtree;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  i,
  img {
    margin-right: 8px;
  }
  .marginEmpty {
    margin-right: 0px;
  }
  &.outline {
    background: white;
    color: #344054;
    border: 1px solid #d0d5dd;
    margin-right: 10px;
  }
  &.red {
    background: #d92d20;
  }
  ${(props) =>
    props.margin &&
    `
      margin-right: 10px;
    `}
  ${(props) =>
    props.disabled &&
    `
      background: #D0D5DD;
      color: white;
      cursor: not-allowed;
    `}
  ${(props) =>
    props.width == "full" &&
    `
      width: 100%;
      text-align: center;
    `}
    ${(props) =>
    props.marginEmpty &&
    `
      margin-left: 10px; padding: 8px;
    `}
`;
