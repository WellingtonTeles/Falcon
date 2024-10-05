import React, { useState } from "react";
import styled from "styled-components";

import {
  burg_css,
  card_css,
  globalColor,
  text_lg,
  text_lx,
  text_md_semibold,
  text_rg,
  text_sm_regular,
} from "../../../assets/variable/global";
import EditHeader from "../../../components/ediHeader";
import { useParams } from "react-router-dom";
import Button from "../../../components/basics/button";
import DoughnutChart from "./DoughnutChart";
import SlateDialog from "../../../components/cards/slateDialog";
import Badge from "../../../components/basics/badge";
import chevronIcon from "./../../../assets/images/chevron-up.png";
import searchIcon from "./../../../assets/images/search_md.png";

export default function EditInterviewActivated(props) {
  const [showModal, setShowModal] = useState(-1);
  const [transcriptObj, setTranscript] = useState(null);
  const [search, setSearch] = useState("");
  const [slateOpen, setSlateOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(true);
  const closeModal = () => {
    setShowModal(-2);
  };
  const { id } = useParams();
  const transcripts = [
    {
      title: "Jed Wilkins",
      date: "4/7/24 at 4:11pm",
      email: "jed@wilkinsfam.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Sally Ferguson",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Malik Johnson",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Tiny Bubbles",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Mike Schmellington",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Jeff Horton",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Jed Wilkins",
      date: "4/7/24 at 4:11pm",
      email: "jed@wilkinsfam.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Sally Ferguson",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Malik Johnson",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Tiny Bubbles",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Mike Schmellington",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
    {
      title: "Jeff Horton",
      date: "4/7/24 at 4:11pm",
      email: "interviewee@email.com",
      summary:
        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
    },
  ];
  const interview_transcripts = [
    {
      name: "ACME",
      time: "04:11:05",
      msg: "What kind of cotton T-shirts do you prefer?",
    },
    {
      name: "Jed",
      time: "04:12:02",
      msg: "I like the really soft ones from Banana Republic",
    },
    {
      name: "ACME",
      time: "04:12:03",
      msg: "Got it, you like soft T-shirts. What would you change about these shirts?",
    },
    {
      name: "Jed",
      time: "04:13:12",
      msg: "The quality seems inconsistent over time. I don’t know if they’ve changed factoriesor materials or what, but they don’t hold their color and shape like they used to.",
    },
    {
      name: "ACME",
      time: "04:13:13",
      msg: "OK, so colorfast shirts that keep their shape. How have they lost their shape?",
    },
    {
      name: "Jed",
      time: "04:15:01",
      msg: "They get a thing I call “bacon collar,” where the shirt collar around my neck getswavy, kind of like how bacon shrivels when you cook it.",
    },
    {
      name: "ACME",
      time: "04:16:00",
      msg: "Understood, you don’t want your shirt collar to look like breakfast food!That’s it, you’re done. You can add some more thoughts if you’d like, or simply click the Done button below for information on how to claim your eGift card and more!",
    },
  ];
  const user_session_detail = {
    crm_link: "Not applicable",
    browser: "Chrome",
    IP: "United States",
    device: "Desktop",
    session: "17043556-dc1d-45ce-99ae-6e2442c459e6",
    conversation_activated: true,
  };

  return (
    <DashboardWrapper>
      <EditHeader
        title={
          transcriptObj ? "2024 Spring Product Fit" : "Smart Interviews Slates"
        }
        subTitle={
          transcriptObj ? transcriptObj.title : "2024 Spring Product Fit"
        }
        editBtn={transcriptObj ? null : "Edit"}
        onPrevMain={() => {
          setTranscript(null);
        }}
      />
      {!transcriptObj && (
        <div className="main-wrapper">
          <div className="body-card">
            <div style={card_css.main} className="card-main">
              <div className="card-header">
                <div style={card_css.card_title}>
                  <h3
                    style={{
                      ...text_lg,
                      marginBottom: "0px",
                      marginRight: "12px",
                    }}
                  >
                    Status
                  </h3>
                </div>
                <Badge
                  title={"Running as of 5/15/24"}
                  color={globalColor.success_700}
                  fill={globalColor.success_50}
                  border={globalColor.success_200}
                />
              </div>
              <div className="card-body">
                <p style={{ paddingTop: "12px", ...text_rg }}>
                  <span>173/250</span> respondents have participated for a{" "}
                  <span>$50</span> donation to WWF
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <DoughnutChart
                    title="Completion Rate"
                    description="212 stars"
                    percent={84.8}
                    result="84.8%"
                  />
                  <DoughnutChart
                    title="Incentive Cost"
                    description="$12.5K budget"
                    percent={69.2}
                    result="$8,650"
                  />
                </div>
              </div>
            </div>
            <div style={card_css.main} class="card-main">
              <div className="card-body">
                <div className="card-summary">
                  <h3 style={card_css.card_summary.h3}>Summary</h3>
                  <p style={card_css.card_summary.p}>
                    There were strong options in this areas;
                  </p>
                  <ul>
                    <li style={card_css.card_summary.li}>
                      <span style={card_css.card_summary.h3}>
                        Customization Options -{" "}
                      </span>
                      Users want more flexibility to customize the interface,
                      workflows, and reporting to fit their specific needs and
                      preferences.
                    </li>
                    <li style={card_css.card_summary.li}>
                      <span style={card_css.card_summary.h3}>
                        Improved Analytics -{" "}
                      </span>
                      Enhanced data visualization, custom dashboards, and
                      predictive analytics were commonly requested to gain
                      deeper insights.
                    </li>
                    <li style={card_css.card_summary.li}>
                      <span style={card_css.card_summary.h3}>
                        Automation Features -{" "}
                      </span>
                      Automating repetitive tasks like data entry, report
                      generation, and follow-up actions could improve efficiency
                      according to respondents.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4 style={{ ...text_lx, marginBottom: "18px" }}>
            Transcripts of individual responses
          </h4>
          <div className="filter-wrapper">
            <div>
              <Button title="Filters" icon="filter" outline />
              <Button title="Most recent first " icon="filter" outline />
            </div>
            <div class="search-box">
              <input
                type="text"
                value={search}
                onChange={(e) => {}}
                placeholder="Search"
              />
              <img className="search-icon" src={searchIcon} alt={"search"} />
            </div>
          </div>
          <div className="body-card transcript-main">
            {transcripts.map((transcript, tIndex) => (
              <div
                style={{ ...card_css.main, width: "352px", minWidth: "352px" }}
                class="card-main"
                key={"transcript-" + tIndex}
                onClick={() => {
                  setTranscript({ ...transcript });
                }}
              >
                <div className="card-body">
                  <div className="card-summary">
                    <h3 style={text_lx}>{transcript.title}</h3>
                    <p style={card_css.card_summary.p}>
                      <span style={{ fontWeight: "600" }}>Date: </span>
                      {transcript.date}
                    </p>
                    <p style={card_css.card_summary.p}>
                      <span style={{ fontWeight: "600" }}>Email: </span>
                      {transcript.email}
                    </p>
                    <br />
                    <p style={card_css.card_summary.p}>
                      <span style={{ fontWeight: "600" }}>Summary: </span>
                      <br />
                      {transcript.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {transcriptObj && (
        <div className="main-wrapper">
          <div className="transcript-card">
            <div className="transcript-header">
              <h4 style={{ fontWeight: 700, ...text_md_semibold }}>
                {transcriptObj.title}
                {"("}
                {transcriptObj.email}
                {")"}
              </h4>
              <p style={{ ...text_sm_regular, color: globalColor.gray_500 }}>
                {transcriptObj.date}
              </p>
            </div>
            <div className="transcript-main">
              <h5 style={text_md_semibold}>Interview Transcript</h5>
              {interview_transcripts.map((i_t_script, itIndex) => (
                <div className="transcript-chat" key={"it_script-" + itIndex}>
                  <h4
                    style={text_md_semibold}
                    className={i_t_script.name === "ACME" ? "ACME" : ""}
                  >
                    {i_t_script.name}
                    <span style={text_sm_regular}>{i_t_script.time}</span>
                  </h4>
                  <p style={text_sm_regular}>{i_t_script.msg}</p>
                </div>
              ))}
            </div>
            <div className="transcript-footer">
              <div className="transcript-iterview-status">
                <Badge
                  title={"04:16:00 on 4/07/24 micro interview fully completed"}
                  color={globalColor.gray_700}
                  fill={globalColor.gray_50}
                  border={globalColor.gray_200}
                />
              </div>
              <div className="user-session-details">
                <div
                  className={`usd-title`}
                  style={text_sm_regular}
                  onClick={() => {
                    setSessionOpen(!sessionOpen);
                  }}
                >
                  User session details
                  <img
                    className={`${sessionOpen ? "" : "down"}`}
                    src={chevronIcon}
                    alt="chevronIcon"
                  />{" "}
                </div>
                {sessionOpen && (
                  <div className="usd-lists">
                    <div>
                      CRM Link: <span>{user_session_detail.crm_link}</span>
                    </div>
                    <div>
                      Browrser: <span>{user_session_detail.browser}</span>
                    </div>
                    <div>
                      IP: <span>{user_session_detail.IP}</span>
                    </div>
                    <div>
                      Device: <span>{user_session_detail.device}</span>
                    </div>
                    <div>
                      Session: <span>{user_session_detail.session}</span>
                    </div>
                    <div>
                      Conversation Activated:{" "}
                      <span>{user_session_detail.conversation_activated}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  .account-header {
    min-width: 562px;
  }
  .main-wrapper {
    min-width: 562px;
    max-width: 1140px;
    padding: 16px 32px;
    .filter-wrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 20px;
      color: var(--gray-700, #344054);
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 142.857% */
      input {
        border-radius: 8px;
        padding: 10px 14px;
        border: 1px solid var(--gray-300, #d0d5dd);
        background: var(--base-white, #fff);
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      }
    }
  }
  .body-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    max-width: 1500px;
    min-width: 530px;
    gap: 16px;
    &.transcript-main {
      gap: 20px;
      .card-main {
        margin: 0px !important;
      }
    }
  }
  .card {
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
  }

  @media (max-width: 880px) {
    .main-wrapper {
      padding: 16px;
      min-width:;
    }
  }
  .transcript-card {
    borderradius: "16px";
    max-width: 688px;
    border: "1px solid ${globalColor.gray_200}";
    padding: "28px";
    background: ${globalColor.base_white};
    marginbottom: "25px";
    marginright: "16px";
    .transcript-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid ${globalColor.gray_200};
      padding: 18px 24px;
      h4,
      p {
        margin: 0px;
      }
    }
    .transcript-main {
      padding: 4px 24px;
      h5 {
        paddig-left: 12px;
      }
      .transcript-chat {
        padding-bottom: 4px;
        h4 {
          font-weight: bold;
          color: ${globalColor.orange_500};
          margin-bottom: 0px;
          span {
            font-weight: normal;
            padding-left: 12px;
            color: ${globalColor.gray_500};
          }
        }
        h4.ACME {
          color: ${globalColor.primary_500};
        }
        p {
          margin-bottom: 0px;
        }
      }
    }
    .transcript-footer {
      .transcript-iterview-status {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        position: relative;
        justify-content: center;
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 118px;
          height: 1px;
          background-color: ${globalColor.gray_300};
          @media (max-width: 998px) {
            height: 0px;
          }
        }
        &::before {
          left: 24px;
        }
        &::after {
          right: 24px;
        }
      }
      .user-session-details {
        padding: 16px 24px;
        .usd-title {
          margin: 0px;
          padding: 0px;
          margin-right: 4px;
          cursor: pointer;
          img {
            margin-left: 6px;
            margin-top: -3px;
            &.down {
              transform: rotate(180deg);
            }
          }
        }
        .usd-lists {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
          div {
            background: ${globalColor.gray_100};
            border-radius: 4px;
            padding: 0px 8px;
            color: ${globalColor.gray_500};
            span {
              color: ${globalColor.gray_900};
            }
          }
        }
      }
    }
  }
  .card-header {
    display: flex;
  }
  .search-box input {
    padding-left: 37px !important;
  }
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }
  .search-box .search-icon {
    position: absolute;
    left: 10px; /* Adjust to fit the input */
    width: 20px; /* Adjust based on icon size */
    height: 20px; /* Adjust based on icon size */
  }
`;
