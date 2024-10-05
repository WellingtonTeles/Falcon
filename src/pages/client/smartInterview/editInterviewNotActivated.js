import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  burg_css,
  card_css,
  font_dispaly_xs_regular,
  globalColor,
  text_lg,
  text_lx,
  text_md_semibold,
  text_rg,
  text_sm_regular,
} from "./../../../assets/variable/global";
import EditHeader from "../../../components/ediHeader";
import { useParams } from "react-router-dom";
import Button from "../../../components/basics/button";
import DoughnutChart from "./DoughnutChart";
import SlateDialog from "../../../components/cards/slateDialog";
import Badge from "../../../components/basics/badge";
import chevronIcon from "./../../../assets/images/chevron-up.png";
import searchIcon from "./../../../assets/images/search_md.png";
import checkIcon from "./../../../assets/images/check_icon.png";
import uncheckIcon from "./../../../assets/images/uncheck_icon.png";
import trash from "./../../../assets/images/trash-02.png";
import uncheckIconSelect from "./../../../assets/images/uncheck_select.png";
import coupon from "./../../../assets/images/coupon.png";
import sadCoupon from "./../../../assets/images/sad_coupon.png";
import ArrowDown from "./../../../assets/images/arrow-down.png";
import radio_check from "./../../../assets/images/radio_check.svg";
import panda from "./../../../assets/images/interview_goal_panda.png";
import pandaLogo from "./../../../assets/images/goal_communication_panda.png";
import ArrowUp from "./../../../assets/images/arrow-up.png";
import amazon from "./../../../assets/images/amazon.png";
import Doctors from "./../../../assets/images/Doctors.png";
import sendYellow from "./../../../assets/images/sendYellow.png";
import CustomSelect from "../../../components/basics/CustomOption";
// import {
//   deleteSlate,
//   getInterview,
//   saveInterview,
//   updateSlate,
// } from "../../../action/api";
import { useDispatch } from "react-redux";

export default function EditInterviewNotActivated(props) {
  const { slate } = props;
  const [showModal, setShowModal] = useState(-1);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const [headline, setHeadline] = useState("");
  const [incentive, setIncentive] = useState(null);
  const [getIncentive, setGetIncentive] = useState("no");
  const [incentiveType, setIncentiveType] = useState("giftCard");
  const [currentSlate, setCurrentSlate] = useState(null);
  const [limitRadio, setLimitRadio] = useState("limit");
  const [maxRespondent, setMaxRespondent] = useState(250);
  const [goals, setGoals] = useState("goal");
  const [unCompltedCounts, setUnCompletedCounts] = useState(7);
  const [completedFlag, setCompletedFlag] = useState(true);
  useEffect(() => {
    // setTranscript({ title: slate.name });
    // getInterview(
    //   slate.id,
    //   slate.interview_ids[0] || undefined
    // )(dispatch)
    //   .then((res) => {
    //     const { payloads } = res;
    //     if (payloads.length > 0) {
    //       setCurrentSlate(payloads[0]);
    //       setExitMessage(payloads[0].exit_message);
    //       setHeadline(payloads[0].headline);
    //       setMaxRespondent(payloads[0].max_respondents);
    //     }
    //   })
    // .catch((err) => {});
  }, []);
  const vendorOptions = [
    {
      value: "amazon",
      label: "Amazon",
      icon: amazon,
    },
  ];
  const goalChangeLists = [
    {
      id: "Panda",
      date: "5/12/24 @ 4:11pm",
      description:
        "What do you want to learn from the Smart Interview respondents?",
    },
    {
      id: "Olivia",
      date: "5/12/24 @ 4:11pm",
      description:
        "I’d like to know what color anvils they prefer, what anvil weights they’re looking for, and more insight into how they will use their anvils.",
    },
    {
      id: "Panda",
      date: "5/12/24 @ 4:12pm",
      description:
        "What else do you want to learn from these Smart Interviews, in addition to preferences for color and weight, and how the anvils will be used?",
    },
    {
      id: "Olivia",
      date: "5/12/24 @ 4:13pm",
      description:
        "I want to understand what people think about our new line of featherweight anvil products",
    },
    {
      id: "Panda",
      date: "5/12/24 @ 4:14pm",
      description:
        "Opinions on your featherweight anvil products, got it. Are there any specific things you want to learn?",
    },
    {
      id: "Olivia",
      date: "5/12/24 @ 4:15pm",
      description:
        "We’re concerned about pricing. Do they think it’s too high?",
    },
    {
      id: "Panda",
      date: "5/12/24 @ 4:16pm",
      description:
        "OK, got it! We’ll cover anvil preferences for color, weight, and pricing, ask about the featherweight anvil range, and inquire as to how they anvils will be used.",
    },
  ];
  const donationOptions = [
    {
      value: "Doctors Without Borders",
      label: "Doctors Without Borders",
      icon: Doctors,
    },
  ];
  const [questions, setQuestions] = useState([
    {
      id: 1,
      description: "",
    },
  ]);
  const [exitMessage, setExitMessage] = useState("");
  const stepArr = [
    { no: 0, disabled: false, title: "Headline" },
    { no: 1, disabled: false, title: "Incentive" },
    { no: 2, disabled: false, title: "Interview goals" },
    { no: 3, disabled: false, title: "Panda Behavior" },
    { no: 4, disabled: false, title: "Questions" },
    { no: 5, disabled: false, title: "Exit message" },
    { no: 6, disabled: true, title: "Respondents" },
  ];
  // const pandaBehaviorList = [
  //   "formal",
  //   "professional",
  //   "EcasualApproachable",
  //   "humorous",
  // ];
  // const [transcriptObj, setTranscript] = useState({
  //   title: "New Slate 2",
  // });
  // const [search, setSearch] = useState("");
  // const [pandaBehavior, setPandaBehavior] = useState("");
  // const [slateOpen, setSlateOpen] = useState(false);
  // const [sessionOpen, setSessionOpen] = useState(true);
  // const closeModal = () => {
  //   setShowModal(-2);
  // };
  // const { id } = useParams();
  // const user_session_detail = {
  //   crm_link: "Not applicable",
  //   browser: "Chrome",
  //   IP: "United States",
  //   device: "Desktop",
  //   session: "17043556-dc1d-45ce-99ae-6e2442c459e6",
  //   conversation_activated: true,
  // };
  // const headlineRef = useRef(null);
  // const incentiveRef = useRef(null);
  // const goalsRef = useRef(null);
  // const pandaBehaviorRef = useRef(null);
  // const exitMessageRef = useRef(null);
  // const respondentsRef = useRef(null);
  // const questionsRef = useRef(null);
  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (containerRef.current) {
  //       const { scrollTop, clientHeight } = containerRef.current;
  //       const elements = containerRef.current.children;

  //       for (const element of elements) {
  //         const { offsetTop, offsetHeight } = element;
  //         console.log(
  //           ">>>",
  //           element,
  //           scrollTop,
  //           offsetTop,
  //           offsetHeight,
  //           clientHeight
  //         );
  //         if (
  //           scrollTop + clientHeight >= offsetTop - 115 &&
  //           scrollTop < offsetTop - 115 + offsetHeight
  //         ) {
  //           // const elementTop = offsetTop;
  //           // const elementBottom = offsetTop + offsetHeight;
  //           // const viewportTop = scrollTop;
  //           // const viewportBottom = scrollTop + clientHeight;

  //           // if (elementBottom > viewportTop && elementTop < viewportBottom)
  //           if (element == headlineRef.current) setStep(0);
  //           else if (element == incentiveRef.current) setStep(1);
  //           else if (element == goalsRef.current) setStep(2);
  //           else if (element == pandaBehaviorRef.current) setStep(3);
  //           else if (element == questionsRef.current) setStep(4);
  //           else if (element == exitMessageRef.current) setStep(5);
  //           //else setStep(0);
  //           else if (element == respondentsRef.current) setStep(6);
  //           break;
  //         }
  //       }
  //     }
  //   };

  //   const container = containerRef.current;
  //   container.addEventListener("scroll", handleScroll);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     container.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // const handleStepClick = (stepIndex) => {
  //   setStep(stepIndex);

  //   switch (stepIndex) {
  //     case 0:
  //       headlineRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //       break;
  //     case 1:
  //       incentiveRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //       break;
  //     case 2:
  //       goalsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //       break;
  //     case 3:
  //       pandaBehaviorRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //       break;
  //     case 4:
  //       questionsRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //       break;
  //     case 5:
  //       exitMessageRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //       break;
  //     case 6:
  //       respondentsRef.current.scrollIntoView({
  //         beha0vior: "smooth",
  //         block: "start",
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };
  // const updateQuestionOrder = (order, quizIndex) => {
  //   const tempQuestionsArr = [...questions];
  //   const tempQuestion = questions[quizIndex];
  //   tempQuestionsArr[quizIndex] = tempQuestionsArr[quizIndex + order];
  //   tempQuestionsArr[quizIndex + order] = tempQuestion;
  //   setQuestions([...tempQuestionsArr]);
  // };
  // const handleLimitRadio = (event) => {
  //   setLimitRadio(event.target.value);
  // };
  // const handleGetIncentive = (event) => {
  //   setGetIncentive(event.target.value);
  // };
  // const handleIncentiveType = (event) => {
  //   setIncentiveType(event.target.value);
  // };
  const submitFunc = () => {
    // saveInterview(slate.id, slate.interview_ids[0] || undefined, {
    //   behavior_complete: true,
    //   exit_message: exitMessage,
    //   exit_message_complete: exitMessage == "" ? false : true,
    //   formal: pandaBehavior,
    //   goals_complete: false,
    //   headline: headline,
    //   headline_complete: headline == "" ? false : true,
    //   incentive_complete: false,
    //   incentive_id: null,
    //   max_respondents: limitRadio === "unlimit" ? -1 : Number(maxRespondent),
    //   questions_complete: true,
    //   respondenets_complete: true,
    //   target_id: null,
    // })(dispatch)
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((err) => {});
  };

  return (
    <DashboardWrapper>
      <EditHeader
        title={"Smart Interviews Slates"}
        subTitle={"2024 Spring Product Fit"}
        editBtn={"Test Driven"}
        onPrevMain={() => {
          // setTranscript(null);
        }}
      />
      <div className="scroll-container">
        <InterviewSetup>
          <StepBar>
            <h4 style={text_lg}>Smart Interview Setup</h4>
            {stepArr.map((subStep, index) => (
              <>
                <div
                  className={`stepBtn ${subStep.no === step ? "selected" : ""}`}
                  key={"step-" + index}
                  // onClick={() => handleStepClick(subStep.no)}
                >
                  {/* <img
                    src={
                      subStep.disabled
                        ? uncheckIcon
                        : subStep.no === step
                          ? uncheckIconSelect
                          : checkIcon
                    }
                  /> */}
                  {subStep}
                  <h3
                    style={{
                      ...text_md_semibold,
                      color:
                        subStep.no === step
                          ? globalColor.primary_700
                          : globalColor.gray_700,
                    }}
                  >
                    {subStep.title}
                  </h3>
                </div>
              </>
            ))}
            {/* {completedFlag && unCompltedCounts > 0 && (
              <div className="uncomplete-err">
                <img src={bugIcon} alt="bug" />
                <h4>
                  {unCompltedCounts} items need to be completed to activate this
                  interview.
                </h4>
              </div>
            )} */}
          </StepBar>
        </InterviewSetup>
      </div>
      <Footer>
        <div>
          <Button
            icon={"trash"}
            title={"Delete"}
            outline
            onClickBtn={() => {}}
          />
          <Button
            icon={"save"}
            title={"Save Draft"}
            margin
            onClickBtn={() => {
              submitFunc();
            }}
          />
          <Button
            icon={"active"}
            title={"Active"}
            disable={unCompltedCounts > 0 && true}
            onClickBtn={() => {}}
          />
        </div>
      </Footer>
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  .scroll-container {
    scroll-padding-top: 80px; /* Adjust as needed */
  }
  .account-header {
    min-width: 562px;
  }
  .main-wrapper {
    min-width: 562px;
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
const InterviewSetup = styled.div`
  display: flex;
  padding: 30px 35px;
  gap: 35px;
  height: calc(100vh - 120px);
  max-width: 1140px;
  .circle {
    width: 6px; /* Adjust the size of the circle */
    height: 6px; /* Adjust the size of the circle */
    background-color: #f04438; /* Red color */
    border-radius: 50%; /* Makes the shape circular */
    margin-right: 10px; /* Space after the circle, adjust as needed */
    padding: 7px;
    display: inline-block; /* Allows the circle to be inline with text or other elements */
  }
`;
const StepBar = styled.div`
  width: 188px;
  .stepBtn {
    position: relative;
    display: flex;
    padding: 8px 10px;
    border-radius: 4px;
    &.selected,
    &:hover {
      background-color: ${globalColor.primary_200};
    }
    h3 {
      margin: 0px;
      padding-left: 12px;
      line-height: 24px;
    }
    cursor: pointer;
    margin-bottom: 28px;
    &::after {
      content: "";
      position: absolute;
      left: 20px;
      top: calc(100% + 2px);
      width: 2px;
      height: 24px;
      background-color: ${globalColor.primary_600};
    }
    &:last-child::after {
      content: none; /* Removes the line */
    }
  }
  .uncomplete-err {
    border: 1px solid ${globalColor.gray_300};
    padding: 12px 8px;
    border-radius: 8px;
    background-color: white;
    display: flex;
    gap: 8px;
    margin-top: 30px;
    h4 {
      margin: 0px;
      font-size: 14px;
      line-height: 20px;
      color: ${globalColor.gray_700};
      font-family: "Figtree";
    }
  }
`;
const Footer = styled.div`
  background: white;
  width: calc(100% - 300px);
  padding: 13px 0px;
  position: fixed;
  bottom: 0px;
  & > div {
    display: flex;
    justify-content: end;
    max-width: 1140px;
    padding-right: 35px;
  }
`;
const MainSetup = styled.div`
  width: calc(100% - 188px);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .card {
    padding: 20px 32px;
    padding-right: 8px;
    background: white;
    border-radius: 8px;
    border: 0px;
    box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1);
    margin-bottom: 24px;
    .card-header {
      display: flex;
      justify-content: space-between;
      padding: 0px;
      .outline {
        margin: 0px !important;
      }
    }
    .coupon {
      width: 342px;
      height: 104px;
    }
    .goal-change-list {
      padding: 12px;
      .goal-change-item {
        margin-bottom: 8px;
        h3 {
          span {
            color: ${globalColor.gray_500};
          }
        }
        &:nth-child(odd) h3 {
          color: ${globalColor.primary_500};
        }
        &:nth-child(even) h3 {
          color: ${globalColor.orange_500};
        }
      }
    }
    .goal-communication {
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: space-between;
      border-radius: 20px;
      background-color: white;
      border: 1px solid ${globalColor.gray_400};
      padding: 20px;

      .goal-input-wrap {
        position: relative;
        input {
          border-radius: 20px;
          padding: 12px 24px;
          padding-right: 48px;
        }
        img {
          position: absolute;
          right: 24px;
          bottom: 12px;
          cursor: pointer;
        }
      }
      .sentence {
        padding-bottom: 12px;
        &.left {
          display: flex;
          gap: 16px;
          img {
            height: 50px;
            margin-top: auto;
          }
          .chat {
            padding: 12px 16px;
            border: 0px;
            border-radius: 16px;
            border-bottom-left-radius: 0px;
            background-color: ${globalColor.gray_50};
            max-width: 306px;
          }
        }
        &.right {
          display: flex;
          justify-content: end;
          gap: 16px;
          .chat {
            padding: 12px 16px;
            border: 0px;
            border-radius: 16px;
            background-color: ${globalColor.primary_600};
            border-bottom-right-radius: 0px;
            color: white;
            max-width: 420px;
          }
        }
      }
    }
    .goal-result {
      display: flex;
      gap: 16px;
      img {
      }
      div {
        padding: 12px 16px;
        border: 0px;
        border-radius: 16px;
        width: 380px;
        background-color: ${globalColor.gray_50};
      }
    }
    .goal-list {
    }
  }
  .card:last-of-type {
    margin-bottom: 100px; /* Adjust as needed for extra space at the end */
  }
  .question-btn {
    display: flex;
    justify-content: end;
  }
  .question-lists {
    .questionCard {
      background: ${globalColor.gray_100};
      border-radius: 8px;
      padding: 16px;
      border: 0px;
      margin-bottom: 16px;
      .questionCardArrow {
        margin-top: auto;
        img {
          height: 20px;
          width: 20px;
          margin-top: auto;
          margin-bottom: 13px;
          cursor: pointer;
        }
      }
      .questionCardHeader {
        display: flex;
        justify-content: space-between;
        img {
          width: 20px;
          cursor: pointer;
          height: 20px;
        }
      }
      .questionCardContent {
        display: flex;
        justify-content: space-between;
        .form-group {
          width: calc(100% - 60px);
        }
      }
    }
    .form-check-input:checked[type="radio"] {
      border: 1px solid var(--primary-600, #1693c7);
      background: var(--primary-50, #e7f7ff);
      background-image: url(${radio_check});
      background-repeat: no-repeat;
      background-position: center;
      background-size: 6px 6 px;
    }
    .form-check-input:checked {
      background-color: #1693c7;
      border-color: #1693c7;
    }
  }
  .form-group.number {
    input.form-control {
      width: 55px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .create-incentive {
    padding: 20px 24px;
    border-radius: 8px;
    border: 0px;
    background: ${globalColor.gray_50};
    .create-incentive-radio-group {
      margin-bottom: 32px;
    }
    .create-incentive-btn {
      display: flex;
      justify-content: end;
    }
    .vendor-select {
      width: 320px;
    }
    .amount-group {
      display: flex;
      gap: 16px;
      .form-check {
        margin-top: auto;
        margin-bottom: auto;
      }
      .form-control-custom-amount {
        display: inline-block;
        width: 60px;
      }
    }
  }
  .winning-respondent {
    padding-top: 8px;
    input {
      display: inline-block;
      width: 40px;
      margin-right: 8px;
    }
  }
`;
