import React, { useState, useEffect } from "react";
import styled from "styled-components";
import checkIcon from "./../../assets/images/check_icon.png";
import uncheckIcon from "./../../assets/images/uncheck_icon.png";
import {
  burg_css,
  card_css,
  globalColor,
  text_lg,
  text_rg,
} from "../../assets/variable/global";
import Badge from "../basics/badge";
import Button from "../basics/button";
import HamburgIcon from "./../../assets/images/hamburgIcon.png";
import SlateDialog from "../../components/cards/slateDialog";

export default function NewSlate(props) {
  const { title, badge_title, badge_color, description, onEdit } = props;
  const [slateOpen, setSlateOpen] = useState(false);
  const [setupArr, setSetupArr] = useState([
    { title: "Headline", checked: true },
    { title: "Incentive", checked: true },
    { title: "Interview golas", checked: true },
    { title: "Panda behavior", checked: true },
    { title: "Questions", checked: true },
    { title: "Exit message", checked: true },
    { title: "Respondents", checked: false },
  ]);
  const getBadgeColor = () => {
    switch (badge_color) {
      case "danger":
        return {
          color: globalColor.error_600,
          fill: globalColor.rose_50,
          border: globalColor.rose_200,
        };
        break;
    }
    return {
      color: globalColor.error_600,
      fill: globalColor.rose_50,
      border: globalColor.rose_200,
    };
  };
  return (
    <NewSlateWrapper style={card_css.main} className="card-main">
      <div className="card-header">
        <div style={card_css.card_title}>
          <h3 style={text_lg}>{title}</h3>
          <div style={{ position: "relative" }}>
            <img
              style={burg_css.img}
              src={HamburgIcon}
              alt="hamburgIcon"
              onClick={() => {
                setSlateOpen(true);
              }}
            />
            {slateOpen && (
              <SlateDialog
                onClose={() => {
                  setSlateOpen(false);
                }}
                clickFunc={(e) => {
                  onEdit(e);
                }}
              />
            )}
          </div>
        </div>
        <Badge
          title={badge_title}
          color={getBadgeColor().color}
          fill={getBadgeColor().fill}
          border={getBadgeColor().border}
        />
      </div>
      <div className="card-body">
        <p style={{ paddingTop: "12px", ...text_rg }}>
          <span>100</span> respondents participated; no incentive offered
        </p>
        <hr />
        <div className="card-summary">
          <h3 style={card_css.card_summary.h3}>Smart Interview setup</h3>
          <ul>
            {setupArr.map((setup, setupIndex) => (
              <li key={setupIndex} style={card_css.card_summary.li}>
                <img
                  src={setup.checked ? checkIcon : uncheckIcon}
                  alt="check"
                  onClick={() => {
                    const temp = [...setupArr];
                    temp[setupIndex].checked = !temp[setupIndex].checked;
                    setSetupArr([...temp]);
                  }}
                />
                {setup.title}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", marginTop: "28px" }}>
          <Button title="Edit Slate" outline full="full" icon="pen" />
          {/* <Button title="Reuse Slate" outline full="full" icon="reuse" /> */}
        </div>
      </div>
    </NewSlateWrapper>
  );
}

const NewSlateWrapper = styled.div`
  ul {
    padding: 0px;
  }
  .card-summary li {
    list-style-type: none;
    cursor: pointer;
    margin-bottom: 8px;
    img {
      margin-right: 12px;
    }
  }
`;
