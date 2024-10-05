import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import removeAccess from "./../../assets/images/removeAccess.png";
import transferIcon from "./../../assets/images/transferIcon.png";
import { globalColor } from "../../assets/variable/global";

export default function CollaboratorDialog(props) {
  const { reuse, result, onClose, clickFunc, status } = props;
  const dialogRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <SlateDialogWrapper ref={dialogRef}>
      <li
        onClick={() => {
          if (status > 0) clickFunc(1);
          else clickFunc(0);
          onClose();
        }}
      >
        <img src={transferIcon} alt={"transferIcon"} />
        Transfer ownership
      </li>
      <li
        onClick={() => {
          clickFunc(-1);
          onClose();
        }}
      >
        <img src={removeAccess} alt={"remove_access"} />
        Remove access
      </li>
    </SlateDialogWrapper>
  );
}

const SlateDialogWrapper = styled.div`
  position: absolute;
  z-index: 10000;
  width: max-content;
  background: white;
  border-radius: 4px;
  padding: 14px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  li {
    cursor: pointer;
    list-style-type: none;
    padding-bottom: 12px;
    font-size: 14px;
    line-height: 24px;
    padding-left: 14px;
    padding-right: 14px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
    &:last-child {
      padding-bottom: 0px;
    }
    color: ${globalColor.base_black};
    &.disabled {
      color: ${globalColor.gray_300};
      cursor: not-allowed;
    }
    &:hover {
      background-color: #d0d5dd1c;
    }
  }
  hr {
    margin: 0px;
    padding-bottom: 12px;
  }
`;
