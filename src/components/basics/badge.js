import React from "react";
import styled from "styled-components";

export default function Badge(props) {
  const {
    circle = "",
    title,
    border = "#CAEBF9",
    fill = "#E7F7FF",
    color = "#007AAB",
  } = props;
  return (
    <BadgeWrapper border={border} fill={fill} color={color} circle={circle}>
      {circle != "" && <span></span>}
      {title}
    </BadgeWrapper>
  );
}

const BadgeWrapper = styled.div`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 16px;
  text-align: center;
  font-family: Figtree;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  margin-right: 5px;
  margin-bottom: 2px;
  ${(props) => `
        border: 1px solid ${props.border};
        background: ${props.fill};
        color: ${props.color};
        span {
            width: 7px;
            height: 7px;
            border-radius: 8px;
            display: inline-block;
            margin-right: 6px;
            background: ${props.circle};
        }
    `}
`;
