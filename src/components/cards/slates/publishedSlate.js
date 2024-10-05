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
import HamburgIcon from "../../../assets/images/hamburgIcon.png";
import SlateDialog from "../slateDialog";
import DoughnutChart from "../../../pages/client/smartInterview/DoughnutChart";
import { convertDate } from "../../../config/common";
import {
  deleteSlate,
  getInterview,
  saveInterview,
  updateSlate,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getSlateUrlCode,
  updateSlateActivate,
} from "../../../action/api";
import { useDispatch } from "react-redux";
export default function PublishedSlate(props) {
  const {
    title,
    badge_title,
    badge_color,
    description,
    start,
    max_respondents,
    participants,
    completions,
    completion_rate,
    budget,
    cost,
    currency,
    onEdit,
  } = props;
  const [slateOpen, setSlateOpen] = useState(false);
  const dispatch = useDispatch();
  const [currentSlate, setCurrentSlate] = useState(null);
  const startDate = convertDate(start);
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
  const [apiStatus, setApiStatus] = React.useState(200);

  const getSlatehams = () => {
    // updateSlateActivate(props.id)(dispatch).then((res) => {
    //   setCurrentSlate(res.payloads[0]);
    //getSlateCode();
    setSlateOpen(true);
    // });
  };
  const getSlateCode = () => {
    // updateSlateActivate(props.id)(dispatch).then((res) => {
    //   handleCopy(res.payloads[0].code);
    // });
    getSlateUrlCode(props.id)(dispatch).then((res) => {
      if (res && res.status) {
        setApiStatus(res.status);
        onEdit(res.status);
      } else {
        setCurrentSlate(res.payloads[0]);
        handleCopy(res.payloads[0].code);
      }
    });
  };
  const handleCopy = (code) => {
    localStorage.setItem("slateId", props.id);
    onEdit(
      window.location.protocol +
        "//" +
        window.location.host +
        "/smartinterviews/" +
        code
    );
    // navigator.clipboard
    //   .writeText(
    //     window.location.protocol +
    //       "//" +
    //       window.location.host +
    //       "/smartinterviews/" +
    //       code
    //   )
    //   .then(() => {
    //     alert("URL is copied to clipboard!");
    //   })
    //   .catch((err) => {
    //     console.log("Failed to copy text: ", err);
    //   });
  };
  return (
    <PublishedSlateWrapper style={card_css.main} className="card-main">
      <div className="card-header">
        <div style={card_css.card_title}>
          <h3 style={text_lg}>{title}</h3>
          <div style={{ position: "relative" }}>
            <img
              style={burg_css.img}
              src={HamburgIcon}
              alt="hamburgIcon"
              onClick={() => {
                getSlatehams();
              }}
            />
            {slateOpen && (
              <SlateDialog
                id={props.id}
                code={props.code}
                onClose={() => {
                  setSlateOpen(false);
                }}
                clickFunc={(e) => {
                  onEdit(e);
                }}
                status={1}
              />
            )}
          </div>
        </div>
        <Badge
          title={`Running as of ${startDate}`}
          color={globalColor.success_700}
          fill={globalColor.success_50}
          border={globalColor.success_200}
        />
      </div>
      <div className="card-body">
        <p style={{ ...text_rg, paddingTop: "12px", marginTop: "0" }}></p>
        <hr />
      </div>
      {/* <div className="card-body">
        <p style={{ ...text_rg }}>
          <span>
            {participants} {max_respondents != -1 && "/" + max_respondents}
          </span>{" "}
          respondents have participated for a <span>$50</span> donation to WWF
        </p>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 16,
          }}
        >
          <DoughnutChart
            title="Completion Rate"
            description={`${completions} stars`}
            percent={completion_rate * 100}
            result={`${completion_rate * 100}%`}
          />
          <DoughnutChart
            title="Incentive Cost"
            description={`$${budget / 1000}K budget`}
            percent={budget === 0 ? 0 : (cost / budget) * 100}
            result={`$${cost.toLocaleString()}`}
          />
        </div>
      </div> */}
      <div style={{ display: "flex", marginTop: "auto" }}>
        <Button
          title="Copy Interview Link"
          outline
          full="full"
          icon="copy"
          onClickBtn={() => {
            //handleCopy();
            getSlateCode();
          }}
        />
        <Button
          title="View Results"
          outline
          full="full"
          icon="result"
          onClickBtn={() => {
            onEdit(5);
          }}
        />
      </div>
    </PublishedSlateWrapper>
  );
}

const PublishedSlateWrapper = styled.div`
  min-height: 300px;
  .card-header {
    border: 0px;
    background: none;
  }
  .card-body {
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
