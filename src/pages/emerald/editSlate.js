import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  globalColor,
  text_lg,
  text_md_semibold,
  text_sm_regular,
} from "./../../../assets/variable/global";
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
import checkIcon from "./../../../assets/images/check_icon.png";
import bugIcon from "./../../../assets/images/bug_icon.png";
import uncheckIcon from "./../../../assets/images/uncheck_selected1.png";
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
import SaveToast from "../../../components/toast/save";
import { useNavigate } from "react-router-dom";
import {
  deleteSlate,
  getInterview,
  saveInterview,
  updateSlate,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  updateSlateActivate,
  getQuestion,
} from "../../../action/api";
import { useDispatch } from "react-redux";
import { handleBeforeUnload } from "../../../config/common";
import SaveCancelModal from "../../../components/modals/save";
import ActivateModal from "../../../components/modals/activate";

export default function EditSlate(props) {
  const { slate, new_slate } = props;
  const [activatedStatus, setActivatedStatus] = useState(
    slate.status == "notActive" ? false : true
  );
  const [showModal, setShowModal] = useState(-1);
  const [unSaved, setUnsaved] = useState(false);
  const [step, setStep] = useState(0);
  const [activateModal, setActivateModal] = useState(-1);
  const dispatch = useDispatch();
  const [headline, setHeadline] = useState("Please tell us what you think");
  const [incentive, setIncentive] = useState(null);
  const [getIncentive, setGetIncentive] = useState("no");
  const [incentiveType, setIncentiveType] = useState("giftCard");
  const [currentSlate, setCurrentSlate] = useState(slate);
  const [limitRadio, setLimitRadio] = useState("limit");
  const [maxRespondent, setMaxRespondent] = useState(250);
  const [goals, setGoals] = useState("goal");
  const [toast, setToast] = useState(-1);
  const [delToast, setDelToast] = useState(-1);
  const [unCompletedCounts, setUnCompletedCounts] = useState(7);
  const [completedFlag, setCompletedFlag] = useState(-1);
  const [saved, setSaved] = useState(false);
  const [saveCancelFlag, setSaveCancelFlag] = useState(-1);
  const [interview, setInterview] = useState({});
  const [inputFlag, setInputFlag] = useState(-1);
  let navigate = useNavigate();
  useEffect(() => {
    if (!saved) window.addEventListener("beforeunload", handleBeforeUnload);
    else window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [saved]);
  useEffect(() => {
    if (toast == 1) {
      setTimeout(() => {
        setToast(-1);
      }, 3000);
    }
  }, [toast]);
  // useEffect(() => {
  //   if (completedFlag == 1) {
  //     setTimeout(() => {
  //       setCompletedFlag(-1);
  //     }, 3000);
  //   }
  // }, [completedFlag]);
  useEffect(() => {
    if (delToast) {
      setTimeout(() => {
        setDelToast(-1);
      }, 3000);
    }
  }, [delToast]);
  const [apiStatus, setApiStatus] = React.useState(200);

  useEffect(() => {
    if (new_slate) {
      localStorage.setItem("new_slate", slate.id);
    }
    // getQuestion(slate.interview_ids[0])(dispatch).then((res) => {
    //   if (res) {
    //     let { payloads } = res;
    //     if (payloads) {
    //       payloads = payloads.sort((a, b) => a.order - b.order);
    //       setQuestions([...payloads]);
    //     }
    //   }
    // });
    getInterview(
      slate.id,
      slate.interview_ids[0] || undefined
    )(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          const { payloads } = res;
          if (payloads.length > 0) {
            let tempCount = 7;
            if (payloads[0].headline_complete) tempCount--;
            if (payloads[0].goals_complete) tempCount--;
            if (payloads[0].exit_message_complete) tempCount--;
            if (payloads[0].headline_complete) tempCount--;
            if (payloads[0].questions_complete) tempCount--;
            if (payloads[0].incentive_complete) tempCount--;
            if (payloads[0].respondents_complete) tempCount--;
            setUnCompletedCounts(tempCount);
            setCompletedFlag(-1);
            setCurrentSlate(payloads[0]);
            setHeadline(payloads[0].headline || headline);
            setPandaBehavior(payloads[0].formal);
            setExitMessage(payloads[0].exit_message || exitMessage);
            setMaxRespondent(payloads[0].max_respondents);
            setLimitRadio(
              payloads[0].max_respondents === -1 ? "unlimit" : "limit"
            );
            if (payloads[0].questions !== null) {
              payloads[0].questions.map((question) => {
                question.add_or_update = "update";
              });
              setQuestions(
                payloads[0].questions.sort((a, b) => a.order - b.order)
              );
            } else setQuestions([]);
            setStepArr([
              {
                no: 0,
                completed: payloads[0].headline_complete
                  ? payloads[0].headline_complete
                  : headline.length > 3,
                disabled: false,
                title: "Headline",
              },
              {
                no: 1,
                completed: true,
                disabled: false,
                title: "Interview goals",
              },
              {
                no: 2,
                completed: true,
                disabled: false,
                title: "Panda Behavior",
              },
              {
                no: 3,
                completed: payloads[0].questions_complete
                  ? payloads[0].questions_complete
                  : questions.length > 0,
                disabled: false,
                title: "Panda Questions",
              },
              {
                no: 4,
                completed: true,
                disabled: false,
                title: "Incentive",
              },

              {
                no: 5,
                completed: payloads[0].exit_message_complete
                  ? payloads[0].exit_message_complete
                  : exitMessage.length > 3,
                disabled: false,
                title: "Exit message",
              },
              {
                no: 6,
                completed: true,
                disabled: true,
                title: "Respondents",
              },
            ]);
            setInterview(payloads[0]);
          }
        }
      })
      .catch((err) => {
        // alert("Error-Get Interview-" + err);
      });
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
  const [questions, setQuestions] = useState([]);
  const [exitMessage, setExitMessage] = useState("Thank you!");
  const [stepArr, setStepArr] = useState([
    { no: 0, completed: false, disabled: false, title: "Headline" },
    { no: 1, completed: false, disabled: false, title: "Interview goals" },
    { no: 2, completed: false, disabled: false, title: "Panda Behavior" },
    { no: 3, completed: false, disabled: false, title: "Panda Questions" },
    { no: 4, completed: false, disabled: false, title: "Incentive" },
    { no: 5, completed: false, disabled: false, title: "Exit message" },
    { no: 6, completed: false, disabled: false, title: "Respondents" },
  ]);
  const pandaBehaviorList = {
    formal: "Formal",
    professional: "Professional",
    casualApproachable: "Casual and Approachable",
    humorous: "Humorous",
  };
  const [transcriptObj, setTranscript] = useState({
    title: slate.name,
  });
  const [search, setSearch] = useState("");
  const [pandaBehavior, setPandaBehavior] = useState("");
  const [slateOpen, setSlateOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(true);
  const closeModal = () => {
    setShowModal(-2);
  };
  const { id } = useParams();
  const user_session_detail = {
    crm_link: "Not applicable",
    browser: "Chrome",
    IP: "United States",
    device: "Desktop",
    session: "17043556-dc1d-45ce-99ae-6e2442c459e6",
    conversation_activated: true,
  };
  const headlineRef = useRef(null);
  const incentiveRef = useRef(null);
  const goalsRef = useRef(null);
  const pandaBehaviorRef = useRef(null);
  const exitMessageRef = useRef(null);
  const respondentsRef = useRef(null);
  const questionsRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight } = containerRef.current;
        const elements = containerRef.current.children;

        for (const element of elements) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollTop + clientHeight >= offsetTop - 115 &&
            scrollTop < offsetTop - 115 + offsetHeight
          ) {
            if (element == headlineRef.current) setStep(0);
            else if (element == goalsRef.current) setStep(1);
            else if (element == pandaBehaviorRef.current) setStep(2);
            else if (element == questionsRef.current) setStep(3);
            else if (element == incentiveRef.current) setStep(4);
            else if (element == exitMessageRef.current) setStep(5);
            else if (element == respondentsRef.current) setStep(6);
            break;
          }
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (headline.length >= 4 && inputFlag == 1) setInputFlag(0);
    if (exitMessage.length >= 4 && inputFlag == 1) setInputFlag(0);
  }, [headline, exitMessage]);
  const handleStepClick = (stepIndex) => {
    setStep(stepIndex);

    switch (stepIndex) {
      case 0:
        headlineRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case 1:
        goalsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 2:
        pandaBehaviorRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case 3:
        questionsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case 4:
        incentiveRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case 5:
        exitMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case 6:
        respondentsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      default:
        break;
    }
  };
  const updateQuestionOrder = (order, questionIndex) => {
    const tempQuestionsArr = [...questions];
    const tempQuestion = questions[questionIndex];
    tempQuestionsArr[questionIndex].order += order;
    tempQuestionsArr[questionIndex + order].order -= order;
    tempQuestionsArr[questionIndex] = tempQuestionsArr[questionIndex + order];
    tempQuestionsArr[questionIndex + order] = tempQuestion;
    setQuestions([...tempQuestionsArr]);
  };
  const handleLimitRadio = (event) => {
    setMaxRespondent(0);
    setLimitRadio(event.target.value);
  };
  const handleGetIncentive = (event) => {
    setGetIncentive(event.target.value);
  };
  const handleIncentiveType = (event) => {
    setIncentiveType(event.target.value);
  };
  const submitFunc = (type = 0) => {
    saveInterview(slate.id, slate.interview_ids[0] || undefined, {
      behavior_complete: true,
      exit_message: exitMessage,
      exit_message_complete: exitMessage == "" ? false : true,
      formal: pandaBehavior,
      goals_complete: true,
      headline: headline,
      headline_complete: headline == "" ? false : true,
      incentive_complete: true,
      incentive_id: null,
      max_respondents: limitRadio === "unlimit" ? -1 : Number(maxRespondent),
      questions_complete: questions.length > 0 ? true : false,
      respondenets_complete: true,
      target_id: null,
    })(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          setInputFlag(1);
          if (res && res.code) {
            const error_arr = JSON.parse(res.message);
            if (error_arr[0].field === "headline")
              alert(
                "Headline is required and must be at least four characters in length"
              );
            else if (error_arr[0].field === "exit_message")
              alert(
                "Exit Message is required and must be at least four characters in length"
              );
            return;
          } else if (res && res.payloads) {
            setToast(1);
            const { payloads } = res;
            let tempCount = 7;
            if (payloads[0].headline_complete) tempCount--;
            if (payloads[0].goals_complete) tempCount--;
            if (payloads[0].exit_message_complete) tempCount--;
            if (payloads[0].headline_complete) tempCount--;
            if (payloads[0].questions_complete) tempCount--;
            if (payloads[0].incentive_complete) tempCount--;
            if (payloads[0].respondents_complete) tempCount--;
            setUnCompletedCounts(tempCount);
            setCompletedFlag(-1);
            setStepArr([
              {
                no: 0,
                completed: payloads[0].headline_complete,
                disabled: false,
                title: "Headline",
              },
              {
                no: 1,
                completed: payloads[0].goals_complete,
                disabled: false,
                title: "Interview goals",
              },
              {
                no: 2,
                completed: payloads[0].behavior_complete,
                disabled: false,
                title: "Panda Behavior",
              },
              {
                no: 3,
                completed: payloads[0].questions_complete,
                disabled: false,
                title: "Panda Questions",
              },
              {
                no: 4,
                completed: payloads[0].incentive_complete,
                disabled: false,
                title: "Incentive",
              },

              {
                no: 5,
                completed: res.payloads[0].exit_message_complete,
                disabled: false,
                title: "Exit message",
              },
              {
                no: 6,
                completed: payloads[0].respondents_complete,
                disabled: true,
                title: "Respondents",
              },
            ]);
            setUnsaved(false);
            if (type === 1) {
              setToast(1);
              setSaved(true);
              navigate("/creator-dashboard/smart-interviews");
            }
            let submitReady = true;
            questions.map((question) => {
              if (question.text === "" || question.text.length < 4) {
                alert(
                  "Question text field(s) must be at least 4 chracteres in length"
                );
                submitReady = false;
              }
            });
            if (submitReady) {
              let tempQuestions = [...questions];
              questions.map((question, idx) => {
                if (question.add_or_update === "add")
                  addQuestion(
                    slate.interview_ids[0],
                    question
                  )(dispatch).then((res) => {
                    if (res && res.status) {
                      setApiStatus(res.status);
                    } else {
                      const { payloads } = res;
                      payloads[0].add_or_update = "update";
                      tempQuestions[idx] = payloads[0];
                      setQuestions(tempQuestions);
                    }
                  });
                else {
                  updateQuestion(
                    question.interview_id,
                    question.id,
                    question
                  )(dispatch)
                    .then((res) => {
                      if (res && res.status) {
                        setApiStatus(res.status);
                      }
                    })
                    .catch((err) => {
                      setToast(-1);
                      setSaved(false);
                      alert("Update Quiz Err" + err);
                    });
                }
              });
              setToast(1);
              setSaved(true);
              setInterview(payloads[0]);
            } else setToast(-1);
          } else {
            // alert("Input field(s) must be at least 4 chracteres in length");
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleActivate = (id = 0) => {
    updateSlateActivate(slate.id)(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          const { payloads } = res;
          setActivatedStatus(true);
          setCurrentSlate({ ...payloads[0] });
          if (id == 0) setActivateModal(1);
          else
            navigate("/smartinterviews/" + payloads[0].code, {
              state: { slate: payloads[0], test: true, interview: interview },
            });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <DashboardWrapper>
      <EditHeader
        title={"Smart Interview Slates"}
        subTitle={transcriptObj.title}
        editBtn={"Test Drive"}
        disable={unCompletedCounts > 0 || !activatedStatus ? true : false}
        onPrevMain={(e) => {
          if (unCompletedCounts > 0 || !activatedStatus) {
          } else {
            if (e === 2) {
              if (unCompletedCounts != 0) {
                setCompletedFlag(1);
              } 
            } else if (unSaved) setSaveCancelFlag(1);
            else if (!unSaved) navigate("/creator-dashboard/smart-interviews");
          }

          // setTranscript(null);
        }}
        slateId={slate.id}
        saved={saved}
      />
      <div className="scroll-container">
        <InterviewSetup>
          <StepBar>
            <h4 style={text_lg}>Smart Interview Setup</h4>
            {stepArr.map((subStep, index) => (
              <div
                className={`stepBtn ${subStep.no === step ? "selected" : ""} ${index == stepArr.length - 1 && "last-btn"}`}
                key={"step-" + index}
                onClick={() => handleStepClick(subStep.no)}
              >
                {/* <img
                  src={
                    subStep.completed
                      ? checkIcon
                      : subStep.no === step
                        ? uncheckIconSelect
                        : uncheckIcon
                  }
                /> */}

                {!subStep.completed && <div className="circle"></div>}
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
            ))}
            {completedFlag == 1 && (
              <div className="uncomplete-err">
                <img src={bugIcon} alt="bug" />
                <h4>
                  {unCompletedCounts} items need to be completed to activate
                  this interview.
                </h4>
              </div>
            )}
          </StepBar>
          <MainSetup ref={containerRef}>
            {/* Headline */}
            <div className="card" ref={headlineRef}>
              <h3 style={{ ...text_lg, fontWeight: 700 }}>Headline</h3>
              <p style={text_sm_regular}>
                Messaging on the first screen, encouraging the respondent to
                participate in the interview
              </p>
              <input
                type="text"
                //className="form-control"
                className={`form-control ${inputFlag === 1 && headline.length < 4 && "form-validation"}`}
                value={headline}
                onChange={(e) => {
                  setHeadline(e.target.value);
                  setUnsaved(true);
                }}
                placeholder={"Please tell us what you think"}
              />
              {inputFlag === 1 && headline.length < 4 && (
                <p className="required-html">
                  Headline is required and must be at least four characters in
                  length.
                </p>
              )}
            </div>

            {/* Interview Goals */}
            <div className="card" ref={goalsRef}>
              <div className="card-header" ref={goalsRef}>
                <h3 style={{ ...text_lg, fontWeight: 700 }}>Interview Goals</h3>
                {!goals ? (
                  <Button
                    title={goals ? "Set Goals" : "Change Goals"}
                    icon="pen"
                    outline
                    onClickBtn={() => {
                      setGoals(null);
                      setUnsaved(true);
                    }}
                  />
                ) : (
                  <Button
                    title={"Set Goals"}
                    icon="pen"
                    outline
                    onClickBtn={() => {
                      setGoals("goal");
                      setUnsaved(true);
                    }}
                  />
                )}
              </div>
              <p style={text_sm_regular}>
                What do you want to learn from the Smart Interview respondents?
              </p>
              {/* {goals ? (
                <div className="goal-result">
                  <img src={panda} alt="panda" />
                  <div style={{ ...text_md_semibold, fontWeight: 800 }}>
                    What do you want to learn from this slate of Smart
                    Interviews? Click the Set Goals button and tell Panda what
                    you want!
                  </div>
                </div>
              ) : ( */}
              <div className="goal-list">
                <li style={text_sm_regular}>
                  Learn about color preferences; iron gray or storm gray?
                </li>
                <li style={text_sm_regular}>
                  Know what anvil weights people prefer
                </li>
                <li style={text_sm_regular}>
                  Understand how the anvil will be used
                </li>
              </div>
              {/* )} */}
              {/* <div className="goal-communication">
                <div className="main-communication">
                  <div className="left sentence">
                    <img src={pandaLogo} alt="pandaLogo" />
                    <div className="chat" style={{ ...text_md_semibold }}>
                      What else do you want to learn from these Smart
                      Interviews, in addition to preferences for color and
                      weight, and how the anvils will be used?
                    </div>
                  </div>
                  <div className="right sentence">
                    <div className="chat" style={{ ...text_md_semibold }}>
                      I want to understand what people think about our new line
                      of featherweight anvil products
                    </div>
                  </div>
                  <div className="left sentence">
                    <img src={pandaLogo} alt="pandaLogo" />
                    <div className="chat" style={{ ...text_md_semibold }}>
                      Opinions on your featherweight anvil products, got it. Are
                      there any specific things you want to learn?
                    </div>
                  </div>
                </div>
                <div className="goal-input-wrap">
                  <input
                    type="text"
                    className="form-control"
                    value={""}
                    placeholder={
                      "We’re concerned about pricing. Do they think it’s too high?"
                    }
                  />
                  <img src={sendYellow} alt="sendYellow" />
                </div>
              </div>
              <br />
              <div className="goal-change-list">
                {goalChangeLists.map((goalChangeItem, itemIndex) => (
                  <div className="goal-change-item" key={"item" + itemIndex}>
                    <h3 style={{ ...text_md_semibold, fontWeight: 800 }}>
                      {goalChangeItem.id}
                      {"  "}
                      <span style={font_dispaly_xs_regular}>
                        {goalChangeItem.date}
                      </span>
                    </h3>
                    <p style={text_sm_regular}>{goalChangeItem.description}</p>
                  </div>
                ))}
              </div> */}
            </div>
            {/* Panda behavior */}
            <div className="card" ref={pandaBehaviorRef}>
              <h3 style={{ ...text_lg, fontWeight: 700 }}>Panda behavior</h3>
              <p style={text_sm_regular}>
                What personality would you like the AI Panda character to
                present?
              </p>
              <label style={text_sm_regular}>Panda conversational tone</label>
              <select
                value={pandaBehavior}
                className="form-control"
                onChange={(e) => {
                  setPandaBehavior(e.target.value);
                }}
              >
                {Object.keys(pandaBehaviorList).map((index) => (
                  <option key={"subBehavior-" + index} value={index}>
                    {pandaBehaviorList[index]}
                  </option>
                ))}
              </select>
            </div>
            {/* Questions */}
            <div className="card" ref={questionsRef}>
              <div className="card-header">
                <h3 style={{ ...text_lg, fontWeight: 700 }}>Panda Questions</h3>
                <Button
                  title={"Add Questions"}
                  icon="plus"
                  outline
                  onClickBtn={() => {
                    setUnsaved(true);
                    setQuestions([
                      ...questions,
                      {
                        order: questions.length,
                        text: "",
                        add_or_update: "add",
                      },
                    ]);
                  }}
                />
              </div>
              <p style={text_sm_regular}>
                Create your own interview questions...
              </p>
              <hr />
              <div className="question-lists">
                {questions.map((question, questionIndex) => (
                  <div
                    key={"question-" + questionIndex}
                    className="questionCard"
                  >
                    <div className="questionCardHeader">
                      <h3
                        style={{
                          ...text_md_semibold,
                          fontWeight: 800,
                          color: globalColor.gray_900,
                        }}
                      >
                        Question #{question.order + 1}
                      </h3>
                      <img
                        src={trash}
                        alt="trash"
                        onClick={() => {
                          if (question.id !== undefined)
                            deleteQuestion(
                              slate.interview_ids[0],
                              question.id
                            )(dispatch).then((res) => {
                              if (res && res.status) {
                                setApiStatus(res.status);
                              }
                            });
                          let tempQuestions = [...questions];
                          tempQuestions.map((question, idx) => {
                            if (questionIndex < idx) {
                              question.order -= 1;
                            }
                          });
                          tempQuestions.splice(questionIndex, 1);
                          setQuestions([...tempQuestions]);
                        }}
                      />
                    </div>
                    <div className="questionCardContent">
                      <div className="form-group">
                        <label style={text_sm_regular}>
                          Write a question (required)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={question.text}
                          onChange={(e) => {
                            const tempQuestions = [...questions];
                            tempQuestions[questionIndex].text = e.target.value;
                            setQuestions([...tempQuestions]);
                          }}
                          placeholder={
                            "How important is the weight of an anvil?"
                          }
                        />
                      </div>
                      <div className="questionCardArrow">
                        {questionIndex != questions.length - 1 && (
                          <img
                            src={ArrowDown}
                            alt="arrow Icon"
                            onClick={() => {
                              updateQuestionOrder(1, questionIndex);
                            }}
                          />
                        )}
                        {questionIndex != 0 && (
                          <img
                            src={ArrowUp}
                            alt="arrow Icon"
                            onClick={() => {
                              updateQuestionOrder(-1, questionIndex);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {questions.length == 0 && <p>There is no questions.</p>}
              </div>
              <div className="question-btn">
                <Button
                  title={"Add Questions"}
                  icon="plus"
                  outline
                  onClickBtn={() => {
                    setUnsaved(true);
                    setQuestions([
                      ...questions,
                      {
                        order: questions.length,
                        text: "",
                        add_or_update: "add",
                      },
                    ]);
                  }}
                />
              </div>
            </div>
            {/* Incentive */}
            <div className="card" ref={incentiveRef}>
              <div className="card-header">
                <h3 style={{ ...text_lg, fontWeight: 700 }}>Incentive</h3>
                {incentive ? (
                  <Button
                    title={"Change Incentive"}
                    icon="pen"
                    outline
                    onClickBtn={() => {
                      setIncentive(null);
                    }}
                  />
                ) : (
                  <Button
                    title={"Add Incentive"}
                    icon="plus"
                    outline
                    onClickBtn={() => {
                      setIncentive("coupon");
                    }}
                  />
                )}
              </div>
              <p style={text_sm_regular}>
                Offer a compelling incentive to entice more respondents to
                participate in the Smart Interview
              </p>
              <div className="coupon-main">
                <img
                  className="coupon"
                  src={incentive ? coupon : sadCoupon}
                  alt="coupon"
                />
              </div>
              {incentive && (
                <div className="create-incentive">
                  <div className="create-incentive-radio-group">
                    <h3 style={{ ...text_md_semibold, fontWeight: 900 }}>
                      Who gets the incentive?
                    </h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault3"
                        id="flexRadioDefault1"
                        value={"no"}
                        checked={getIncentive === "no"}
                        onChange={handleGetIncentive}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        No incentive is offered
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault3"
                        id="flexRadioDefault1"
                        value={"Every respondent"}
                        checked={getIncentive === "Every respondent"}
                        onChange={handleGetIncentive}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Every respondent receives the incentive
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault3"
                        id="flexRadioDefault1"
                        value={"Winning respondent"}
                        checked={getIncentive === "Winning respondent"}
                        onChange={handleGetIncentive}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Winning respondents will receive the incentive
                      </label>
                      {getIncentive === "Winning respondent" && (
                        <div className="winning-respondent">
                          <input
                            className="form-control form-control-custom-amount"
                            value={3}
                            onChange={(e) => {}}
                          />
                          randomly selected respondents will win and receive the
                          incentive
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="create-incentive-radio-group">
                    <h3 style={{ ...text_md_semibold, fontWeight: 900 }}>
                      Choose incentive type:
                    </h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault2"
                        value={"giftCard"}
                        checked={incentiveType === "giftCard"}
                        onChange={handleIncentiveType}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Gift Card
                      </label>
                      {incentiveType == "giftCard" && (
                        <div>
                          <label
                            style={{ ...text_sm_regular, marginBottom: "6px" }}
                          >
                            Vendor
                          </label>
                          <CustomSelect
                            options={vendorOptions}
                            placeholder="Select an option"
                          />
                          <label
                            style={{ ...text_sm_regular, marginBottom: "6px" }}
                          >
                            Amount
                          </label>
                          <div className="amount-group">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"10"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $10
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"15"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $15
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"20"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $20
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"35"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $35
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"50"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $50
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"50"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                Other amount
                              </label>
                            </div>
                            <input
                              type="number"
                              className="form-control form-control-custom-amount"
                              value={"question.description"}
                              onChange={(e) => {}}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault2"
                        value={"Donation"}
                        checked={incentiveType === "Donation"}
                        onChange={handleIncentiveType}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Donation
                      </label>
                      {incentiveType == "Donation" && (
                        <div>
                          <label style={text_sm_regular}>
                            Choose an organization to donate
                          </label>
                          <CustomSelect
                            options={donationOptions}
                            placeholder="Select an option"
                          />
                          <label style={text_sm_regular}>Amount</label>
                          <div className="amount-group">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"10"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $10
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"15"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $15
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"20"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $20
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"35"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $35
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"50"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                $50
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault4"
                                id="flexRadioDefault4"
                                value={"50"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault4"
                              >
                                Other amount
                              </label>
                            </div>
                            <input
                              type="number"
                              className="form-control form-control-custom-amount"
                              value={"question.description"}
                              onChange={(e) => {}}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault2"
                        value={"Plant a Tree"}
                        checked={incentiveType === "Plant a Tree"}
                        onChange={handleIncentiveType}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Plant a Tree!
                      </label>
                      {incentiveType == "Plant a Tree" && (
                        <p style={text_sm_regular}>
                          {" "}
                          A tree will be planted on the respondent’s behalf
                          through OneTreePlanet.Org.
                        </p>
                      )}
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault2"
                        id="flexRadioDefault2"
                        value={"Create your own incentive"}
                        checked={incentiveType === "Create your own incentive"}
                        onChange={handleIncentiveType}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Create your own incentive
                      </label>
                      {incentiveType == "Create your own incentive" && (
                        <div className="form-group">
                          <label style={text_sm_regular}>
                            Description of the incentive
                          </label>
                          <textarea
                            className="form-control"
                            rows={4}
                            onChange={(e) => {}}
                            placeholder={
                              "Create your own incentive! Examples could be a shout out on social media, dinner with you, a paid trip for two, etc."
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="create-incentive-btn">
                    <Button title="Cancel" outline />
                    <Button title="Create Incentive" />
                  </div>
                </div>
              )}
            </div>
            {/* Exit message */}
            <div className="card" ref={exitMessageRef}>
              <h3 style={{ ...text_lg, fontWeight: 700 }}>Exit message</h3>
              <p style={text_sm_regular}>
                Messaging on the final screen, thanking the interviewee for
                participating in the interview
              </p>
              <input
                type="text"
                className={`form-control ${inputFlag === 1 && exitMessage.length < 4 && "form-validation"}`}
                value={exitMessage}
                onChange={(e) => {
                  setUnsaved(true);
                  setExitMessage(e.target.value);
                }}
                placeholder={"Thank you!"}
              />
              {inputFlag === 1 && exitMessage.length < 4 && (
                <p className="required-html">
                  Exit Message is required and must be at least four characters
                  in length.
                </p>
              )}
            </div>
            {/* Respondents */}
            <div className="card" ref={respondentsRef}>
              <h3 style={{ ...text_lg, fontWeight: 700 }}>Respondents</h3>
              <p style={text_sm_regular}>
                How many respondents would you like to participate in this
                interview?
              </p>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault7"
                    id="flexRadioDefault1"
                    value={"unlimit"}
                    checked={limitRadio === "unlimit"}
                    onChange={handleLimitRadio}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Unlimited respondents – keep running interviews until I
                    manually deactivate this Slate
                  </label>
                </div>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault7"
                  id="flexRadioDefault2"
                  value={"limit"}
                  checked={limitRadio === "limit"}
                  onChange={handleLimitRadio}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Limited respondents
                </label>
              </div>

              {limitRadio === "limit" && (
                <div className="form-group number">
                  <input
                    type="text"
                    className="form-control"
                    value={maxRespondent}
                    onChange={(e) => {
                      setUnsaved(true);
                      setMaxRespondent(e.target.value);
                    }}
                  />
                  respondents will complete smart interviews at a projected
                  incentive cost of $12,500
                </div>
              )}
            </div>
          </MainSetup>
        </InterviewSetup>
      </div>
      <Footer>
        <div>
          <Button
            icon={"trash"}
            title={"Delete"}
            outline
            onClickBtn={() => {
              deleteSlate(slate.id)(dispatch)
                .then((res) => {
                  if (res && res.status) {
                    setApiStatus(res.status);
                  } else {
                    setDelToast(1);
                    navigate("/creator-dashboard/smart-interviews/");
                  }
                })
                .catch((err) => {
                  alert(err);
                });
            }}
          />
          <Button
            icon={"save"}
            title={"Save Draft"}
            margin={"true"}
            onClickBtn={() => {
              // setToast(-1);
              submitFunc();
            }}
          />
          <Button
            icon={"active"}
            title={"Activate"}
            disable={unCompletedCounts > 0 || activatedStatus ? true : false}
            onClickBtn={() => {
              // updateSlate(
              //   slate.id,
              //   slate.name,
              //   "notActive"
              // )(dispatch)
              //   .then((res) => {
              //     setToast(1);
              if (unCompletedCounts > 0 || activatedStatus) {
              } else {
                if (unCompletedCounts == 0) {
                  handleActivate();
                } else {
                  setCompletedFlag(1);
                }
              }

              //     })
              //     .catch((err) => {
              //       alert(err);
              //     });
              //   // "notActive" "running" "completed"
            }}
          />
          {toast != -1 && (
            <SaveToast
              closeToast={() => {
                setToast(-1);
              }}
              toast={toast}
              pageType={"SmartInterview"}
            />
          )}
          {delToast != -1 && (
            <SaveToast
              closeToast={() => {
                setDelToast(-1);
              }}
              text="Deleted successfully!"
              toast={toast}
              pageType={"SmartInterview"}
            />
          )}
          {/* <SaveToast
            closeToast={() => {
              setToast(-1);
            }}
            toast={1}
            pageType={"SmartInterview"}
          /> */}
        </div>{" "}
      </Footer>

      {saveCancelFlag != -1 && (
        <SaveCancelModal
          closeModal={() => {
            setSaveCancelFlag(-1);
          }}
          text="Deleted successfully!"
          saveModal={(e) => {
            if (e === 1) navigate("/creator-dashboard/smart-interviews");
            else {
              submitFunc(1);
            }
          }}
        />
      )}
      {activateModal != -1 && (
        <ActivateModal
          closeModal={() => {
            setActivateModal(-1);
          }}
          text=""
          title={
            window.location.protocol +
            "//" +
            window.location.host +
            "/smartinterviews/" +
            currentSlate.code
          }
          saveModal={(e) => {
            if (e === 1) navigate("/creator-dashboard/smart-interviews");
            else {
              submitFunc(1);
            }
          }}
        />
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
  .scroll-container {
    scroll-padding-top: 80px; /* Adjust as needed */
  }
  .account-header {
    min-width: 524px;
  }
  .main-wrapper {
    min-width: 524px;
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
    max-width: 1065px;
    min-width: 524px;
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
    }
  }
  .transcript-card {
    border-radius: "16px";
    max-width: 688px;
    border: "1px solid ${globalColor.gray_200}";
    padding: "28px";
    background: ${globalColor.base_white};
    margin-bottom: 25px;
    margin-right: 16px;
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
  padding-right: 0;
  gap: 35px;
  height: calc(100vh - 120px);
  max-width: 1095px;
  .circle {
    width: 6px; /* Adjust the size of the circle */
    height: 6px; /* Adjust the size of the circle */
    background-color: #f04438; /* Red color */
    border-radius: 50%; /* Makes the shape circular */
    margin-right: 10px; /* Space after the circle, adjust as needed */
    padding: 5px;
    gap: 0px;
    display: inline-block; /* Allows the circle to be inline with text or other elements */
  }
`;
const StepBar = styled.div`
  img.uncheckIcon {
    filter: invert(1);
  }
  .uncomplete-err {
    border: 1px solid ${globalColor.gray_300};
    padding: 12px 8px;
    border-radius: 8px;
    background-color: white;
    display: flex;
    gap: 8px;
    margin-top: 30px;
    img {
      width: 20px;
      height: 20px;
    }
    h4 {
      margin: 0px;
      font-size: 14px;
      line-height: 20px;
      color: ${globalColor.gray_700};
      font-family: "Figtree";
    }
  }
  width: 188px;
  .stepBtn {
    position: relative;
    display: flex;
    padding: 8px 10px;
    border-radius: 4px;
    align-items: center;

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
  padding-bottom: 500px;
  .card {
    padding: 20px 32px;
    margin-right: 8px;
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
  .form-control {
    // border-color:
  }
  .form-control.form-validation {
    border-color: red;
    margin-bottom: 3px;
  }
  p.required-html {
    color: #d92d20;
    font-size: 14px;
    line-height: 24px;
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
