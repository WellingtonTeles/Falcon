import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import edit_disable from "./../../assets/images/edit_disable.png";
import edit_enable from "./../../assets/images/edit_enable.png";
import reuse_disable from "./../../assets/images/reuse_disable.png";
import reuse_enable from "./../../assets/images/reuse_enable.png";
import trash_disable from "./../../assets/images/trash_disable.png";
import trash_enable from "./../../assets/images/trash_enable.png";
import result_disable from "./../../assets/images/result_disable.png";
import result_enable from "./../../assets/images/result_enable.png";
import copy_enable from "./../../assets/images/copy-icon.png";
import copy_disable from "./../../assets/images/copy1-icon.png";
import export_enable from "./../../assets/images/export.png";
import export_disable from "./../../assets/images/export1.png";
import { getSlateUrlCode } from "./../../action/api";
import { useDispatch } from "react-redux";
import { globalColor } from "../../assets/variable/global";

export default function SlateDialog(props) {
  const { reuse, result, onClose, clickFunc, status, url, code } = props;
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };
  const [apiStatus, setApiStatus] = React.useState(200);
  const handleCopy = () => {
    localStorage.setItem("slateId", props.id);
    if (props.code == "") {
      getSlateUrlCode(props.id)(dispatch).then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
          clickFunc(res.status);
          onClose();
        } else {
          onClose();
          clickFunc(
            window.location.protocol +
              "//" +
              window.location.host +
              "/smartinterviews/" +
              res.payloads[0].code
          );
        }
      });
    } else {
      navigator.clipboard
        .writeText(
          window.location.protocol +
            "//" +
            window.location.host +
            "/smartinterviews/" +
            props.code
        )
        .then(() => {
          alert("URL is copied to clipboard!");
        })
        .catch((err) => {
          console.log("Failed to copy text: ", err);
        });
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
        className={status == 1 ? "" : "disabled"}
        onClick={() => {
          if (status == 1) handleCopy();
        }}
      >
        <img
          src={copy_enable}
          alt={"reuseIcon"}
          className={status == 1 ? "" : "disabled-image"}
        />
        Copy Interview Link
      </li>
      <li
        onClick={() => {
          if (status > 0) clickFunc(1);
          else clickFunc(0);
          onClose();
        }}
      >
        <img src={edit_enable} alt={"edit"} />
        Edit Slate
      </li>
      <li>
        <img src={reuse_enable} alt={"reuseIcon"} />
        Reuse Slate
      </li>
      <li
        className={status == 1 ? "" : "disabled"}
        onClick={() => {
          if (status == 1) {
            clickFunc(5);
            onClose();
          }
        }}
      >
        <img
          src={result_enable}
          alt={"resultIcon"}
          className={status == 1 ? "" : "disabled-image"}
        />
        View results
      </li>
      <li className={status !== 1 ? "" : "disabled"}>
        <img
          src={export_enable}
          alt={"resultIcon"}
          className={status !== 1 ? "" : "disabled-image"}
        />
        Export as CSV
      </li>
      <hr />
      <li
        onClick={() => {
          clickFunc(-1);
          onClose();
        }}
      >
        <img src={trash_enable} alt={"trashIcon"} />
        Delete Slate
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
  img.disabled-image {
    filter: grayscale(100%);
    opacity: 0.2;
  }
  li {
    cursor: pointer;
    list-style-type: none;
    margin-bottom: 12px;
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
      margin-bottom: 0px;
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
