import React, { useState, useEffect } from "react";
import styled from "styled-components";
import checkIcon from "./../../../assets/images/check_icon.png";
import uncheckIcon from "./../../../assets/images/uncheck_icon.png";
import {
  burg_css,
  card_css,
  globalColor,
  text_lg,
  text_rg,
} from "../../../assets/variable/global";
import Badge from "../../basics/badge";
import Button from "../../basics/button";
import HamburgIcon from "../../../assets/images/hamburgIcon.png";
import SlateDialog from "../slateDialog";
import bugIcon from "./../../../assets/images/bug_icon.png";

export default function NewSlate(props) {
  const {
    title,
    badge_title,
    badge_color,
    description,
    headline_complete,
    incentive_complete,
    goals_complete,
    behavior_complete,
    questions_complete,
    exit_message_complete,
    respondents_complete,
    onEdit,
  } = props;
  const [slateOpen, setSlateOpen] = useState(false);
  const [setupArr, setSetupArr] = useState([
    { title: "Headline", checked: headline_complete },
    { title: "Incentive", checked: incentive_complete },
    { title: "Interview golas", checked: goals_complete },
    { title: "Panda behavior", checked: behavior_complete },
    { title: "Questions", checked: questions_complete },
    { title: "Exit message", checked: exit_message_complete },
    { title: "Respondents", checked: respondents_complete },
  ]);
  const [count, setCount] = useState(7);
  useEffect(() => {
    let tempCount = count;
    if (headline_complete) tempCount--;
    if (incentive_complete) tempCount--;
    if (goals_complete) tempCount--;
    if (behavior_complete) tempCount--;
    if (questions_complete) tempCount--;
    if (exit_message_complete) tempCount--;
    if (respondents_complete) tempCount--;
    setCount(tempCount);
  }, []);
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
                status={0}
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
          {/* <span>100</span> respondents participated; no incentive offered */}
          {description}
        </p>
        <hr />
        <div className="card-summary">
          <h3 style={card_css.card_summary.h3}>Smart Interview setup</h3>
          {/* <ul>
            {setupArr.map((setup, setupIndex) => (
              <li key={setupIndex} style={card_css.card_summary.li}>
                <img
                  src={setup.checked ? checkIcon : uncheckIcon}
                  alt="check"
                  // onClick={() => {
                  //   const temp = [...setupArr];
                  //   temp[setupIndex].checked = !temp[setupIndex].checked;
                  //   setSetupArr([...temp]);
                  // }}
                />
                {setup.title}
              </li>
            ))}
          </ul> */}
          {count > 0 && (
            <div className="uncomplete-err">
              <img src={bugIcon} alt="bug" />
              <h4>
                {count} items need to be completed to activate the interview.
              </h4>
            </div>
          )}
        </div>

        <div style={{ display: "flex", marginTop: "28px" }}>
          <Button
            title="Edit Slate"
            outline
            full="full"
            icon="pen"
            onClickBtn={() => {
              onEdit(0);
            }}
          />
          {/* <Button title="Reuse Slate" outline full="full" icon="reuse" /> */}
        </div>
      </div>
    </NewSlateWrapper>
  );
}

const NewSlateWrapper = styled.div`
  .uncomplete-err {
    padding-top: 12p;
    border-radius: 8px;
    background-color: white;
    display: flex;
    gap: 10px;
    h4 {
      margin: 0px;
      font-size: 14px;
      line-height: 22px;
      color: ${globalColor.gray_700};
      font-family: "Figtree";
    }
  }
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
