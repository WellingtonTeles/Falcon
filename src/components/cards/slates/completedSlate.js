import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  burg_css,
  card_css,
  globalColor,
  text_lg,
  text_rg,
} from "../../../assets/variable/global";
import Badge from "../../basics/badge";
import Button from "../../basics/button";
import { convertDate } from "../../../config/common";
import HamburgIcon from "../../../assets/images/hamburgIcon.png";
import SlateDialog from "../slateDialog";

export default function CompletedSlate(props) {
  const {
    title,
    badge_title,
    badge_color,
    description,
    start,
    end,
    participants,
    onEdit,
  } = props;
  const [slateOpen, setSlateOpen] = useState(false);
  const startDate = convertDate(start);
  const endDate = convertDate(end);
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
    <CompletedSlateWrapper style={card_css.main} className="card-main">
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
                status={2}
              />
            )}
          </div>
        </div>
        <Badge
          // title={`Active from 10/24/23 - 10/31/23`}
          title={`Active from ${startDate} - ${endDate}`}
          color={globalColor.gray_500}
          fill={globalColor.gray_50}
          border={globalColor.gray_200}
        />
      </div>
      <div className="card-body">
        <p style={{ ...text_rg }}>
          <span>{participants}</span> respondents participated and received a{" "}
          <span>$20</span> Starbucks gift a card.
        </p>
        <hr />
        <div className="card-summary">
          <h3 style={card_css.card_summary.h3}>{description}</h3>
          {/* <p style={card_css.card_summary.p}>
            There were strong options in this areas;
          </p>
          <ul>
            <li style={card_css.card_summary.li}>
              <span style={card_css.card_summary.h3}>
                Customization Options -{" "}
              </span>
              Users want more flexibility to customize the interface, workflows,
              and reporting to fit their specific needs and preferences.
            </li>
            <li style={card_css.card_summary.li}>
              <span style={card_css.card_summary.h3}>
                Improved Analytics -{" "}
              </span>
              Enhanced data visualization, custom dashboards, and predictive
              analytics were commonly requested to gain deeper insights.
            </li>
            <li style={card_css.card_summary.li}>
              <span style={card_css.card_summary.h3}>
                Automation Features -{" "}
              </span>
              Automating repetitive tasks like data entry, report generation,
              and follow-up actions could improve efficiency according to
              respondents.
            </li>
          </ul> */}
        </div>

        <div style={{ display: "flex", marginTop: "28px" }}>
          <Button
            title="View Results"
            outline
            full="full"
            icon="result"
            onClickBtn={() => {
              onEdit(1);
            }}
          />
          <Button title="Reuse Slate" outline full="full" icon="reuse" />
        </div>
      </div>
    </CompletedSlateWrapper>
  );
}

const CompletedSlateWrapper = styled.div`
  .card-header {
    border: 0px;
    background: none;
  }
  .card-body {
    .card-summary {
      height: 247px;
    }
    p {
      margin-top: 12px;
      color: ${globalColor.gray_500}!important;
      font-style: italic;
      span {
        font-style: normal;
        color: ${globalColor.gray_900};
        font-weight: bold;
      }
    }
  }
`;
