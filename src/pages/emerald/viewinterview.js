import React, { useState, useEffect, useRef } from "react";
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
import NotFoundErrorModal from "../../../components/modals/notFoundError";
import ServerErrorModal from "../../../components/modals/serverError";
import Badge from "../../../components/basics/badge";
import chevronIcon from "./../../../assets/images/chevron-up.png";
import searchIcon from "./../../../assets/images/search_md.png";
import clearIcon from "./../../../assets/images/close.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getTranscript,
  getTranscripts,
  getUserData,
} from "./../../../action/api";
import DatePicker from "../../../components/cards/datePicker";
import { getDevice, getBrowser } from "../../../config/common";

export default function ViewInterview(props) {
  const { slate } = props;
  const [showModal, setShowModal] = useState(-1);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRefFilter = useRef(null);
  const menuRefSort = useRef(null);

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const toggleFilterDropdown = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const [user, setUserData] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("user_id");

    getUserData(id)(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          const { payloads } = res;
          setUserData({ ...payloads[0] });
        }
      })
      .catch((err) => {
        console.log("Err:", err);
      });
  }, []);
  const closeMenuFilter = (event) => {
    if (
      menuRefFilter.current &&
      !menuRefFilter.current.contains(event.target)
    ) {
      setIsOpenFilter(false);
    }
  };
  useEffect(() => {
    if (isOpenFilter) {
      document.addEventListener("mousedown", closeMenuFilter);
    } else {
      document.removeEventListener("mousedown", closeMenuFilter);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenuFilter);
    };
  }, [isOpenFilter]);
  const selectFilter = () => {
    setSearch("");
    fetchTranscripts();
    setIsOpenFilter(!isOpenFilter);
  };
  const [isOpenSort, setIsOpenSort] = useState(false);
  const closeMenuSort = (event) => {
    if (menuRefSort.current && !menuRefSort.current.contains(event.target)) {
      setIsOpenSort(false);
    }
  };
  useEffect(() => {
    if (isOpenSort) {
      document.addEventListener("mousedown", closeMenuSort);
    } else {
      document.removeEventListener("mousedown", closeMenuSort);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenuSort);
    };
  }, [isOpenSort]);
  const [selectedItemTitle, setSelectedItemTitle] =
    useState("Most recent first");
  const toggleSortDropdown = () => {
    setIsOpenSort(!isOpenSort);
  };
  const handleSelect = (event) => {
    setSelectedItemTitle(event.target.title);
    setIsOpenSort(!isOpenSort);
    // setLoading(false);
    // setHasMore(true);
    //setPage(0);
  };
  const [date, setDate] = useState(null);
  const [transcriptObj, setTranscript] = useState(null);
  const [search, setSearch] = useState("");
  const [slateOpen, setSlateOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(true);
  const closeModal = () => {
    setShowModal(-2);
  };
  const { id } = useParams();
  const [transcripts, setTranscripts] = useState([]);
  // const transcripts = [
  //   {
  //     title: "Jed Wilkins",
  //     date: "4/7/24 at 4:11pm",
  //     email: "jed@wilkinsfam.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Sally Ferguson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Malik Johnson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Tiny Bubbles",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Mike Schmellington",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Jeff Horton",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Jed Wilkins",
  //     date: "4/7/24 at 4:11pm",
  //     email: "jed@wilkinsfam.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Sally Ferguson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Malik Johnson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Tiny Bubbles",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Mike Schmellington",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Jeff Horton",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  // ];
  const [apiStatus, setApiStatus] = React.useState(200);
  const getFinalTime = () => {
    if (transcriptObj) {
      const createdAtDate = new Date(
        transcriptObj.created_at.replace(" ", "T")
      );
      const updatedAtDate = new Date(
        transcriptObj.updated_at.replace(" ", "T")
      );

      // Calculate the difference in milliseconds
      const differenceInMilliseconds = updatedAtDate - createdAtDate;

      // Convert the difference to a more readable format
      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
      const differenceInMinutes = Math.floor(differenceInSeconds / 60);
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      const differenceInDays = Math.floor(differenceInHours / 24);

      return `Time spent on the interview: ${differenceInHours}:${differenceInMinutes}:${differenceInSeconds} `;
    }
  };
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
  const getFormatDate = (date) => {
    let formattedStartDate = date.startDate.format("YYYY-MM-DD");
    let formattedEndDate = date.endDate.format("YYYY-MM-DD");
    if (formattedEndDate !== formattedStartDate)
      return `${formattedStartDate} - ${formattedEndDate}`;
    return `${formattedStartDate}`;
  };
  const fetchTranscripts = () => {
    let query = "";

    if (selectedItemTitle === "Most recent first")
      query = "&orderBy=created_at,desc";
    else if (selectedItemTitle === "Oldest first")
      query = "&orderBy=created_at,asc";
    else if (selectedItemTitle === "Alphabetical (A-Z)")
      query = "&orderBy=name,asc";
    else if (selectedItemTitle === "Alphabetical (Z-A)")
      query = "&orderBy=name,desc";
    if (search === "") {
      //   if (
      //     !(
      //       checkedItems.notActivated === false &&
      //       checkedItems.running === false &&
      //       checkedItems.completed === false
      //     )
      //   ) {
      //     query += '&query={"$in": {"status": [';
      //     let arr = [];
      //     if (checkedItems.notActivated === true) arr.push('"notActive"');
      //     if (checkedItems.running === true) arr.push('"running"');
      //     if (checkedItems.completed === true) arr.push('"completed"');
      //     query += arr.toString() + "]}}";
      //   }
    } else {
      query += '&query={"$like": {"name": "' + search + '"}}';
    }
    if (date) {
      let formattedStartDate = date.startDate.format("YYYY-MM-DD HH:mm:ss");
      let formattedEndDate = date.endDate.format("YYYY-MM-DD HH:mm:ss");
      // query += `&query={"$bte":{"created_at":[${formatted/StartDate},${formattedEndDate}]}}`;
      formattedEndDate = `${formattedEndDate.slice(0, 10)} 23:59:59`;
      formattedStartDate = `${formattedStartDate.slice(0, 10)} 00:00:00`;

      query += `&query={"$bte":{"created_at":["${formattedStartDate}", "${formattedEndDate}"]}}`;
    }
    getTranscripts(
      slate.interview_ids[0],
      query
    )(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          const { payloads } = res;
          setTranscripts([...payloads]);
        }
      })
      .catch((err) => console.log("getTransaction", err));
  };
  const getTranscriptsDetail = (transcripts_id) => {
    getTranscript(
      slate.interview_ids[0],
      transcripts_id
    )(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          const { payloads } = res;
          setTranscript({ ...payloads[0] });
        }
      })
      .catch((err) => console.log("getTranscriptsDetail", err));
  };
  useEffect(() => {
    // setLoading(false);
    // setHasMore(true);
    // setPage(0);
    fetchTranscripts();
  }, [search, selectedItemTitle, date]);
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
        title={"Smart Interviews Slates"}
        subTitle={slate ? slate.name : "2024 Spring Product Fit"}
        editBtn={null}
        onPrevMain={() => {
          if (transcriptObj) setTranscript(null);
          else navigate("/creator-dashboard/smart-interviews");
        }}
      />
      {!transcriptObj && (
        <div className="main-wrapper">
          {/* <div className="body-card">
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
          </div> */}
          {/* <hr /> */}
          <h4 style={{ ...text_lx, marginBottom: "18px" }}>
            Transcripts of individual responses
          </h4>
          <div className="filter-wrapper">
            <div
              style={{ position: "relative" }}
              className="checkbox-dropdown-filter"
            >
              <Button
                title="Filters"
                icon="filter"
                outline
                onClickBtn={toggleFilterDropdown}
              />
              {isOpenFilter && (
                <DatePicker
                  ref={menuRefFilter}
                  onClose={() => {
                    setIsOpenFilter(!isOpenFilter);
                  }}
                  onApply={(obj) => {
                    setDate({ ...obj });
                  }}
                />
              )}
              <Button
                title={selectedItemTitle}
                icon="filter"
                outline
                onClickBtn={toggleSortDropdown}
              />
              {isOpenSort && (
                <ul className="dropdown-menu" ref={menuRefSort}>
                  <li
                    className="dropdown-item"
                    title="Most recent first"
                    onClick={handleSelect}
                  >
                    Most recent first
                  </li>
                  <li
                    className="dropdown-item"
                    title="Oldest first"
                    onClick={handleSelect}
                  >
                    Oldest first
                  </li>
                  <li
                    className="dropdown-item"
                    title="Alphabetical (A-Z)"
                    onClick={handleSelect}
                  >
                    Alphabetical (A-Z)
                  </li>
                  <li
                    className="dropdown-item"
                    title="Alphabetical (Z-A)"
                    onClick={handleSelect}
                  >
                    Alphabetical (Z-A)
                  </li>
                </ul>
              )}
            </div>
            <div className="search-box">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search"
              />
              <img className="search-icon" src={searchIcon} alt={"search"} />
              {search && (
                <img
                  className="clear-icon"
                  src={clearIcon}
                  alt={"clear"}
                  onClick={() => {
                    setSearch("");
                  }}
                />
              )}
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            {date && (
              <div className="searched-box">
                <div className="inputs">
                  {getFormatDate(date)}
                  <img
                    className="clear-icon"
                    src={clearIcon}
                    alt={"clear"}
                    onClick={() => {
                      setDate(null);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="body-card transcript-main">
            {transcripts.map((transcript, tIndex) => (
              <div
                style={{ ...card_css.main, width: "352px", minWidth: "352px" }}
                className="card-main"
                key={"transcript-" + tIndex}
                onClick={() => {
                  getTranscriptsDetail(transcript.id);
                }}
              >
                <div className="card-body">
                  <div className="card-summary">
                    {/* <h3 style={text_lx}>{transcript.title || "Jed"}</h3> */}
                    <h3 style={text_lx}>{"Response " + (tIndex + 1)}</h3>
                    <p style={card_css.card_summary.p}>
                      <span style={{ fontWeight: "600" }}>Date: </span>
                      {transcript.start_at}
                    </p>
                    <p style={card_css.card_summary.p}>
                      <span style={{ fontWeight: "600" }}>Email: </span>
                      {/* {"jed@wilkinfarm.com"} */}
                    </p>
                    <br />
                    <p
                      style={{
                        ...card_css.card_summary.p,
                        visibility: "hidden",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>Summary: </span>
                      <br />
                      {/* {
                        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data"
                      }  */}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {transcripts.length == 0 && (
              <p>
                Transcripts will become available as Smart Interviews are
                completed.
              </p>
            )}
          </div>
        </div>
      )}
      {transcriptObj && (
        <div className="main-wrapper">
          <div className="transcript-card">
            <div className="transcript-header">
              <h4 style={{ fontWeight: 700, ...text_md_semibold }}>
                Name (Email): {/* Jed Wilkins (jed@wilkinsfarm.com) */}
                {transcriptObj.prospect.email || "Anonymous"}
              </h4>
              <p style={{ ...text_sm_regular, color: globalColor.gray_500 }}>
                {transcriptObj.created_at}
              </p>
            </div>
            <div className="transcript-main">
              <h5 style={text_md_semibold}>Interview Transcript</h5>
              {transcriptObj.transcript.map((i_t_script, itIndex) => (
                <div key={"it_script-" + itIndex}>
                  <div className="transcript-chat">
                    <h4 style={text_md_semibold} className={"ACME"}>
                    {user ? user.company_normalized_name : 'ACME'}
                      <span style={text_sm_regular}>
                        {i_t_script.questioned_at}
                      </span>
                    </h4>
                    <p style={text_sm_regular}>{i_t_script.question_text}</p>
                  </div>
                  {i_t_script.answer_text && (
                    <div className="transcript-chat">
                      <h4 style={text_md_semibold}>
                        {transcriptObj.prospect.email || "Anonymous"}
                        <span style={text_sm_regular}>
                          {i_t_script.questioned_at}
                        </span>
                      </h4>
                      <p style={text_sm_regular}>{i_t_script.answer_text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="transcript-footer">
              <div className="transcript-iterview-status">
                <Badge
                  title={getFinalTime()}
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
                    {/* <div>
                      CRM Link: <span>{user_session_detail.crm_link}</span>
                    </div> */}
                    <div>
                      Browser:{" "}
                      <span>
                        {getBrowser(transcriptObj.prospect_session.user_agent)}
                      </span>
                    </div>
                    <div>
                      IP:{" "}
                      <span>
                        {transcriptObj.prospect_session.client_ip ||
                          user_session_detail.IP}
                      </span>
                    </div>
                    <div>
                      Device:{" "}
                      <span>
                        {getDevice(transcriptObj.prospect_session.user_agent)}
                      </span>
                    </div>
                    <div>
                      Session:{" "}
                      <span>
                        {transcriptObj.prospect_session.id ||
                          user_session_detail.session}
                      </span>
                    </div>
                    {/* <div>
                      Conversation Activated:{" "}
                      <span>{user_session_detail.conversation_activated}</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {apiStatus == 404 && (
        <NotFoundErrorModal
          closeModal={() => {
            setApiStatus(200);
          }}
          title=""
          description=""
          saveModal={(obj) => {
            // setCancelModal(-2);
          }}
        />
      )}
      {(apiStatus === 401 || apiStatus === 500) && (
        <ServerErrorModal
          closeModal={() => {
            // if (apiStatus == 401) navigate("/401");
            setApiStatus(200);
          }}
          title=""
          description=""
          saveModal={(obj) => {
            // setCancelModal(-2);
          }}
        />
      )}
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  .account-header {
    min-width: 562px;
  }
  .searched-box .inputs {
    position: relative;
    padding: 5px 10px;
    background: white;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
  }
  .searched-box {
    position: relative;
    display: flex;
    align-items: center;
    .clear-icon {
      position: relative;
      width: 30px; /* Adjust based on icon size */
      height: 30px; /* Adjust based on icon size */
      cursor: pointer;
    }
  }
  .search-box .clear-icon {
    position: absolute;
    right: 5px; /* Adjust to fit the input */
    width: 30px; /* Adjust based on icon size */
    height: 30px; /* Adjust based on icon size */
    cursor: pointer;
  }
  .main-wrapper {
    min-width: 562px;
    max-width: 1140px;
    padding: 16px 32px;
    padding-right: 0;
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
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-toggle {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  .dropdown-menu {
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    left: 109px;
    top: 52px;
  }
  .dropdown-item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropdown-item:hover {
    background-color: #f1f1f1;
  }
  .checkbox-dropdown-filter {
    position: relative;
    display: inline-block;
    .dropdown-toggle-filter {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
    .dropdown-menu-filter {
      display: block;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 200px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      padding: 10px;
      left: 0px !important;
      top: 48px !important;
    }
    .dropdown-list-filter {
      list-style: none;
      padding: 0;
      margin: 0 0 10px 0;
    }
    .dropdown-item-filter {
      color: black;
      padding: 8px 16px;
      display: block;
    }
    .dropdown-item-filter label {
      display: flex;
      align-items: center;
    }
    .dropdown-item-filter input {
      margin-right: 10px;
    }
    .dropdown-item-filter:hover {
      background-color: #f1f1f1;
    }
    .dropdown-actions-filter {
      display: flex;
      justify-content: space-between;
    }
    .dropdown-button-filter {
      background-color: transparent;
      color: ${globalColor.gray_700};
      border: 1px ${globalColor.gray_300} solid;
      padding: 5px 10px;
      cursor: pointer;
      flex: 1;
      margin: 0 5px;
      border-radius: 5px;
      &.btn_done {
        background-color: ${globalColor.primary_700} !important;
        color: white;
      }
    }
    .dropdown-button-filter:hover {
      /* background-color: #45a049; */
    }
  }
`;
import React, { useState, useEffect } from "react";
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
import NotFoundErrorModal from "../../../components/modals/notFoundError";
import ServerErrorModal from "../../../components/modals/serverError";
import Badge from "../../../components/basics/badge";
import chevronIcon from "./../../../assets/images/chevron-up.png";
import searchIcon from "./../../../assets/images/search_md.png";
import clearIcon from "./../../../assets/images/close.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTranscripts } from "./../../../action/api";
import DatePicker from "../../../components/cards/datePicker";
import { getDevice, getBrowser } from "../../../config/common";

export default function ViewInterview(props) {
  const { slate } = props;
  const [showModal, setShowModal] = useState(-1);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const toggleFilterDropdown = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const selectFilter = () => {
    setSearch("");
    fetchTranscripts();
    setIsOpenFilter(!isOpenFilter);
  };
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [selectedItemTitle, setSelectedItemTitle] =
    useState("Most recent first");
  const toggleSortDropdown = () => {
    setIsOpenSort(!isOpenSort);
  };
  const handleSelect = (event) => {
    setSelectedItemTitle(event.target.title);
    setIsOpenSort(!isOpenSort);
    // setLoading(false);
    // setHasMore(true);
    //setPage(0);
  };
  const [date, setDate] = useState(null);
  const [transcriptObj, setTranscript] = useState(null);
  const [search, setSearch] = useState("");
  const [slateOpen, setSlateOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(true);
  const closeModal = () => {
    setShowModal(-2);
  };
  const { id } = useParams();
  const [transcripts, setTranscripts] = useState([]);
  // const transcripts = [
  //   {
  //     title: "Jed Wilkins",
  //     date: "4/7/24 at 4:11pm",
  //     email: "jed@wilkinsfam.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Sally Ferguson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Malik Johnson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Tiny Bubbles",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Mike Schmellington",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Jeff Horton",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Jed Wilkins",
  //     date: "4/7/24 at 4:11pm",
  //     email: "jed@wilkinsfam.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Sally Ferguson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Malik Johnson",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Tiny Bubbles",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Mike Schmellington",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  //   {
  //     title: "Jeff Horton",
  //     date: "4/7/24 at 4:11pm",
  //     email: "interviewee@email.com",
  //     summary:
  //       "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data",
  //   },
  // ];
  const [apiStatus, setApiStatus] = React.useState(200);
  const getFinalTime = () => {
    if (transcriptObj) {
      const createdAtDate = new Date(
        transcriptObj.created_at.replace(" ", "T")
      );
      const updatedAtDate = new Date(
        transcriptObj.updated_at.replace(" ", "T")
      );

      // Calculate the difference in milliseconds
      const differenceInMilliseconds = updatedAtDate - createdAtDate;

      // Convert the difference to a more readable format
      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
      const differenceInMinutes = Math.floor(differenceInSeconds / 60);
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      const differenceInDays = Math.floor(differenceInHours / 24);

      return `Time spent on the interview: ${differenceInHours}:${differenceInMinutes}:${differenceInSeconds} `;
    }
  };
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
  const getFormatDate = (date) => {
    let formattedStartDate = date.startDate.format("YYYY-MM-DD");
    let formattedEndDate = date.endDate.format("YYYY-MM-DD");
    if (formattedEndDate !== formattedStartDate)
      return `${formattedStartDate} - ${formattedEndDate}`;
    return `${formattedStartDate}`;
  };
  const fetchTranscripts = () => {
    let query = "";

    if (selectedItemTitle === "Most recent first")
      query = "&orderBy=created_at,desc";
    else if (selectedItemTitle === "Oldest first")
      query = "&orderBy=created_at,asc";
    else if (selectedItemTitle === "Alphabetical (A-Z)")
      query = "&orderBy=name,asc";
    else if (selectedItemTitle === "Alphabetical (Z-A)")
      query = "&orderBy=name,desc";
    if (search === "") {
      //   if (
      //     !(
      //       checkedItems.notActivated === false &&
      //       checkedItems.running === false &&
      //       checkedItems.completed === false
      //     )
      //   ) {
      //     query += '&query={"$in": {"status": [';
      //     let arr = [];
      //     if (checkedItems.notActivated === true) arr.push('"notActive"');
      //     if (checkedItems.running === true) arr.push('"running"');
      //     if (checkedItems.completed === true) arr.push('"completed"');
      //     query += arr.toString() + "]}}";
      //   }
    } else {
      query += '&query={"$like": {"name": "' + search + '"}}';
    }
    if (date) {
      let formattedStartDate = date.startDate.format("YYYY-MM-DD HH:mm:ss");
      let formattedEndDate = date.endDate.format("YYYY-MM-DD HH:mm:ss");
      // query += `&query={"$bte":{"created_at":[${formatted/StartDate},${formattedEndDate}]}}`;
      formattedEndDate = `${formattedEndDate.slice(0, 10)} 23:59:59`;
      formattedStartDate = `${formattedStartDate.slice(0, 10)} 00:00:00`;

      query += `&query={"$bte":{"created_at":["${formattedStartDate}", "${formattedEndDate}"]}}`;
    }
    getTranscripts(
      slate.interview_ids[0],
      query
    )(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          const { payloads } = res;
          setTranscripts([...payloads]);
        }
      })
      .catch((err) => console.log("getTransaction", err));
  };
  useEffect(() => {
    // setLoading(false);
    // setHasMore(true);
    // setPage(0);
    fetchTranscripts();
  }, [search, selectedItemTitle, date]);
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
        title={"Smart Interviews Slates"}
        subTitle={slate ? slate.name : "2024 Spring Product Fit"}
        editBtn={null}
        onPrevMain={() => {
          //.setTranscript(null);
          if (transcriptObj) setTranscript(null);
          else navigate("/creator-dashboard/smart-interviews");
        }}
      />
      {!transcriptObj && (
        <div className="main-wrapper">
          {/* <div className="body-card">
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
          </div> */}
          {/* <hr /> */}
          <h4 style={{ ...text_lx, marginBottom: "18px" }}>
            Transcripts of individual responses
          </h4>
          <div className="filter-wrapper">
            <div
              style={{ position: "relative" }}
              className="checkbox-dropdown-filter"
            >
              <Button
                title="Filters"
                icon="filter"
                outline
                onClickBtn={toggleFilterDropdown}
              />
              {isOpenFilter && (
                <DatePicker
                  onClose={() => {
                    setIsOpenFilter(!isOpenFilter);
                  }}
                  onApply={(obj) => {
                    setDate({ ...obj });
                  }}
                />
              )}
              <Button
                title={selectedItemTitle}
                icon="filter"
                outline
                onClickBtn={toggleSortDropdown}
              />
              {isOpenSort && (
                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    title="Most recent first"
                    onClick={handleSelect}
                  >
                    Most recent first
                  </li>
                  <li
                    className="dropdown-item"
                    title="Oldest first"
                    onClick={handleSelect}
                  >
                    Oldest first
                  </li>
                  <li
                    className="dropdown-item"
                    title="Alphabetical (A-Z)"
                    onClick={handleSelect}
                  >
                    Alphabetical (A-Z)
                  </li>
                  <li
                    className="dropdown-item"
                    title="Alphabetical (Z-A)"
                    onClick={handleSelect}
                  >
                    Alphabetical (Z-A)
                  </li>
                </ul>
              )}
            </div>
            <div className="search-box">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search"
              />
              <img className="search-icon" src={searchIcon} alt={"search"} />
              {search && (
                <img
                  className="clear-icon"
                  src={clearIcon}
                  alt={"clear"}
                  onClick={() => {
                    setSearch("");
                  }}
                />
              )}
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            {date && (
              <div className="searched-box">
                <div className="inputs">
                  {getFormatDate(date)}
                  <img
                    className="clear-icon"
                    src={clearIcon}
                    alt={"clear"}
                    onClick={() => {
                      setDate(null);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="body-card transcript-main">
            {transcripts.map((transcript, tIndex) => (
              <div
                style={{ ...card_css.main, width: "352px", minWidth: "352px" }}
                className="card-main"
                key={"transcript-" + tIndex}
                onClick={() => {
                  setTranscript({ ...transcript });
                }}
              >
                <div className="card-body">
                  <div className="card-summary">
                    {/* <h3 style={text_lx}>{transcript.title || "Jed"}</h3> */}
                    <h3 style={text_lx}>{"Response " + (tIndex + 1)}</h3>
                    <p style={card_css.card_summary.p}>
                      <span style={{ fontWeight: "600" }}>Date: </span>
                      {transcript.start_at}
                    </p>
                    <p style={card_css.card_summary.p}>
                      <span style={{ fontWeight: "600" }}>Email: </span>
                      {/* {"jed@wilkinfarm.com"} */}
                    </p>
                    <br />
                    <p
                      style={{
                        ...card_css.card_summary.p,
                        visibility: "hidden",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>Summary: </span>
                      <br />
                      {/* {
                        "Lorem ipsum post facto, guitars are cool hey look over there, what’s that, more useful information, this is just some sample data"
                      }  */}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {transcripts.length == 0 && (
              <p>
                Transcripts will become available as Smart Interviews are
                completed.
              </p>
            )}
          </div>
        </div>
      )}
      {transcriptObj && (
        <div className="main-wrapper">
          <div className="transcript-card">
            <div className="transcript-header">
              <h4 style={{ fontWeight: 700, ...text_md_semibold }}>
                Name (Email): {/* Jed Wilkins (jed@wilkinsfarm.com) */}
                {transcriptObj.prospect.email || "Anonymous"}
              </h4>
              <p style={{ ...text_sm_regular, color: globalColor.gray_500 }}>
                {transcriptObj.created_at}
              </p>
            </div>
            <div className="transcript-main">
              <h5 style={text_md_semibold}>Interview Transcript</h5>
              {transcriptObj.transcript.map((i_t_script, itIndex) => (
                <div key={"it_script-" + itIndex}>
                  <div className="transcript-chat">
                    <h4 style={text_md_semibold} className={"ACME"}>
                      {user ? user.company_normalized_name : 'ACME'}
                      <span style={text_sm_regular}>
                        {i_t_script.questioned_at}
                      </span>
                    </h4>
                    <p style={text_sm_regular}>{i_t_script.question_text}</p>
                  </div>
                  {i_t_script.answer_text && (
                    <div className="transcript-chat">
                      <h4 style={text_md_semibold}>
                        {transcriptObj.prospect.email || "Anonymous"}
                        <span style={text_sm_regular}>
                          {i_t_script.questioned_at}
                        </span>
                      </h4>
                      <p style={text_sm_regular}>{i_t_script.answer_text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="transcript-footer">
              <div className="transcript-iterview-status">
                <Badge
                  title={getFinalTime()}
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
                    {/* <div>
                      CRM Link: <span>{user_session_detail.crm_link}</span>
                    </div> */}
                    <div>
                      Browser:{" "}
                      <span>
                        {getBrowser(transcriptObj.prospect_session.user_agent)}
                      </span>
                    </div>
                    <div>
                      IP:{" "}
                      <span>
                        {transcriptObj.prospect_session.client_ip ||
                          user_session_detail.IP}
                      </span>
                    </div>
                    <div>
                      Device:{" "}
                      <span>
                        {getDevice(transcriptObj.prospect_session.user_agent)}
                      </span>
                    </div>
                    <div>
                      Session:{" "}
                      <span>
                        {transcriptObj.prospect_session.id ||
                          user_session_detail.session}
                      </span>
                    </div>
                    {/* <div>
                      Conversation Activated:{" "}
                      <span>{user_session_detail.conversation_activated}</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {apiStatus == 404 && (
        <NotFoundErrorModal
          closeModal={() => {
            setApiStatus(200);
          }}
          title=""
          description=""
          saveModal={(obj) => {
            // setCancelModal(-2);
          }}
        />
      )}
      {(apiStatus === 401 || apiStatus === 500) && (
        <ServerErrorModal
          closeModal={() => {
            if (apiStatus == 401) navigate("/401");
            setApiStatus(200);
          }}
          title=""
          description=""
          saveModal={(obj) => {
            // setCancelModal(-2);
          }}
        />
      )}
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  .account-header {
    min-width: 562px;
  }
  .searched-box .inputs {
    position: relative;
    padding: 5px 10px;
    background: white;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
  }
  .searched-box {
    position: relative;
    display: flex;
    align-items: center;
    .clear-icon {
      position: relative;
      width: 30px; /* Adjust based on icon size */
      height: 30px; /* Adjust based on icon size */
      cursor: pointer;
    }
  }
  .search-box .clear-icon {
    position: absolute;
    right: 5px; /* Adjust to fit the input */
    width: 30px; /* Adjust based on icon size */
    height: 30px; /* Adjust based on icon size */
    cursor: pointer;
  }
  .main-wrapper {
    min-width: 562px;
    max-width: 1140px;
    padding: 16px 32px;
    padding-right: 0;
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
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-toggle {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  .dropdown-menu {
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    left: 109px;
    top: 52px;
  }
  .dropdown-item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropdown-item:hover {
    background-color: #f1f1f1;
  }
  .checkbox-dropdown-filter {
    position: relative;
    display: inline-block;
    .dropdown-toggle-filter {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
    .dropdown-menu-filter {
      display: block;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 200px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      padding: 10px;
      left: 0px !important;
      top: 48px !important;
    }
    .dropdown-list-filter {
      list-style: none;
      padding: 0;
      margin: 0 0 10px 0;
    }
    .dropdown-item-filter {
      color: black;
      padding: 8px 16px;
      display: block;
    }
    .dropdown-item-filter label {
      display: flex;
      align-items: center;
    }
    .dropdown-item-filter input {
      margin-right: 10px;
    }
    .dropdown-item-filter:hover {
      background-color: #f1f1f1;
    }
    .dropdown-actions-filter {
      display: flex;
      justify-content: space-between;
    }
    .dropdown-button-filter {
      background-color: transparent;
      color: ${globalColor.gray_700};
      border: 1px ${globalColor.gray_300} solid;
      padding: 5px 10px;
      cursor: pointer;
      flex: 1;
      margin: 0 5px;
      border-radius: 5px;
      &.btn_done {
        background-color: ${globalColor.primary_700} !important;
        color: white;
      }
    }
    .dropdown-button-filter:hover {
      /* background-color: #45a049; */
    }
  }
`;
