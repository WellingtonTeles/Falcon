import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import logo from "./../../assets/images/LOGO.png";
import tree_coupon from "./../../assets/images/tree_coupon.png";
import answer_footer from "./../../assets/images/answer_footer.png";
import communicationIcon from "./../../assets/images/goal_communication_panda.png";
import send from "./../../assets/images/sendYellow.png";
import white_mobile from "./../../assets/images/white_mobile.png";
import white_pc from "./../../assets/images/white_pc.png";
import black_mobile from "./../../assets/images/black_mobile.png";
import black_pc from "./../../assets/images/black_pc.png";
import coupon from "./../../assets/images/coupon.png";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/basics/button";
import TypingComponent from "./typing";
import {
  getSlate,
  getTokenData,
  getTranscript,
  getUsersData,
  refreshToken,
  createProspectSession,
  getInterview,
  getQuestion,
  startTestDrive,
  advanceTestDrive,
  postTranscript,
  updateTranscript,
} from "../../action/api";
import { globalColor } from "../../assets/variable/global";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useToken from "../client/auth/useToken";
import { getCookie } from "../../config/common";
import NotFoundErrorModal from "../../components/modals/notFoundError";
import ServerErrorModal from "../../components/modals/serverError";
const primary_800 = "#0A5987";
const gray_900 = "#101828";
const gray_600 = "#475467";
const gray_200 = "#EAECF0";
const error_600 = "#D92D20";

export default function AnswerText(props) {
  const chatBodyRef = useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const [slate, setSlate] = useState(
    location.state && location.state.slate ? location.state.slate : null
  );
  const test =
    location.state && location.state.test ? location.state.test : false;
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [pos, setPos] = useState(0);
  const [mainArr, setMainArr] = useState([]);
  const [curArr, setCurArr] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [typing, setTyping] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const [doneFlag, setDoneFlag] = useState(false);
  const [disabled, setDisabled] = useState("");
  const [interview, setInterview] = useState(
    location.state && location.state.interview ? location.state.interview : {}
  );
  const [apiStatus, setApiStatus] = React.useState(200);

  const [curFlag, setCurFlag] = useState(true);
  const getSlateData = () => {
    if (!slate) {
      const slateID = localStorage.getItem("slateId");
      getSlate(slateID)(dispatch)
        .then((res) => {
          console.log(">>>res>>", res);
          if (res && res.status) {
            setApiStatus(res.status);
          } else {
            const { payloads } = res;
            setSlate(payloads[0]);
            if (interview.headline === undefined) {
              getInterview(
                payloads[0].id,
                payloads[0].interview_ids[0]
              )(dispatch).then((res) => {
                if (res && res.status) {
                  setApiStatus(res.status);
                } else {
                  const { payloads } = res;
                  setInterview(payloads[0]);
                }
              });
            }
          }
        })
        .catch((err) => {
          console.log("getSlate error ->", err);
        });
    } else {
      if (interview.headline === undefined) {
        getInterview(
          slate.id,
          slate.interview_ids[0]
        )(dispatch).then((res) => {
          if (res && res.status) {
            setApiStatus(res.status);
          } else {
            const { payloads } = res;
            setInterview(payloads[0]);
          }
        });
      }
    }
  };
  useEffect(() => {
    getSlateData();
  }, []);
  const handleToggle = () => {
    setIsDesktop(!isDesktop);
  };
  useEffect(() => {
    if (typing && text != "") {
      checkScroll();
    }
  }, [typing]);
  useEffect(() => {
    console.log(">mainArr", mainArr);
  }, [mainArr]);
  const getData = (code) => {
    if (test) {
      startTestDrive(code)(dispatch)
        .then((res) => {
          console.log(">>getData>>", res);
          if (res && res.status) {
            setApiStatus(res.status);
          } else {
            const { payloads } = res;
            setMainArr([...payloads[0].transcript]);
            setTranscript(payloads[0]);
            setTyping(true);
            for (let i = 0; i < payloads[0].transcript.length; i++) {
              if (payloads[0].transcript[i].answer_text === "") {
                setPos(i);
                break;
              }
            }
          }
        })
        .catch((err) => console.log("startTestDrive", err));
    } else {
      postTranscript(
        code,
        {}
      )(dispatch)
        .then((res) => {
          console.log(">postTranscript>", res);
          if (res && res.status) {
            setApiStatus(res.status);
          } else {
            const { payloads } = res;
            setMainArr([...payloads[0].transcript]);
            setTranscript(payloads[0]);
            setTyping(true);
            for (let i = 0; i < payloads[0].transcript.length; i++) {
              if (payloads[0].transcript[i].answer_text === "") {
                setPos(i);
                break;
              }
              // if (i === payloads[0].transcript.length) {
              //   setPos(payloads[0].transcript.length - 1);
              //   setDoneFlag(true);
              //   setTyping(false);
              // }
            }
          }
        })
        .catch((err) => console.log("getTransaction", err));
    }
  };
  const updateData = (obj) => {
    if (test) {
      advanceTestDrive(
        id,
        obj
      )(dispatch)
        .then((res) => {
          {
            console.log(">>transcriptupdate>>", res);
            if (res && res.status) {
              setApiStatus(res.status);
            } else {
              setText("");
              const { payloads } = res;
              if (pos < mainArr.length - 1) {
                setPos(pos + 1);
                setCurFlag(true);
                // setTimeout(() => {
                setTyping(true);
                // }, 350);
              } else if (pos == mainArr.length - 1) {
                setPos(pos + 1);
                setDoneFlag(true);
              }
              setMainArr([...payloads[0].transcript]);
            }
          }
        })
        .catch((err) => console.log("updateTranscript", err));
    } else {
      const tempOBj = { ...obj };
      const fieldsToRemove = ["answer_id", "answered_at"];

      // Create a new array without the specified fields
      const newArray = tempOBj.transcript.map((obj) => {
        const newObj = { ...obj }; // Create a shallow copy of the object
        fieldsToRemove.forEach((field) => {
          delete newObj[field]; // Delete each specified field
        });
        return newObj; // Return the modified object
      });
      updateTranscript(
        id,
        { trnascript: [...newArray], transcript_id: transcript.id },
        transcript.id
      )(dispatch)
        .then((res) => {
          console.log("updatetranscipt2", res);
          if (res && res.status) {
            setApiStatus(res.status);
          } else {
            setText("");
            const { payloads } = res;
            if (pos < mainArr.length - 1) {
              setPos(pos + 1);
              setCurFlag(true);
              // setTimeout(() => {
              setTyping(true);
              // }, 350);
            } else if (pos == mainArr.length - 1) {
              setPos(pos + 1);
              setDoneFlag(true);
            }
            setMainArr([...payloads[0].transcript]);
          }
        })
        .catch((err) => console.log("updateTranscript", err));
    }
  };
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter" && text !== "") {
        event.preventDefault();
        // if (!doneFlag) {
        sendFunc();
        // }
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });
  function formatDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const sendFunc = () => {
    if (text != "" && !doneFlag) {
      const tempMainArr = [];
      for (let i = 0; i < mainArr.length; i++)
        tempMainArr[i] = {
          ...mainArr[i],
          question_id: mainArr[i].question_id,
          question_text: mainArr[i].question_text,
          questioned_at: mainArr[i].questioned_at
            ? mainArr[i].questioned_at
            : formatDate(),
          answer_text: mainArr[i].answer_text,
        };

      tempMainArr[pos] = {
        ...mainArr[pos],
        question_id: mainArr[pos].question_id,
        question_text: mainArr[pos].question_text,
        questioned_at: mainArr[pos].questioned_at
          ? mainArr[pos].questioned_at
          : formatDate(),
        answer_text: text,
      };
      const obj1 = {
        transcript: [...tempMainArr],
      };
      setCurArr("");
      updateData(obj1);
      setTyping(true);
    } else if (doneFlag) {
      setTyping(false);
      const tempMainArr = [];
      for (let i = 0; i < mainArr.length; i++)
        tempMainArr[i] = {
          ...mainArr[i],
          question_id: mainArr[i].question_id,
          question_text: mainArr[i].question_text,
          questioned_at: mainArr[i].questioned_at
            ? mainArr[i].questioned_at
            : formatDate(),
          answer_text: mainArr[i].answer_text,
        };

      tempMainArr[mainArr.length - 1] = {
        ...mainArr[mainArr.length - 1],
        question_id: mainArr[mainArr.length - 1].question_id,
        question_text: mainArr[mainArr.length - 1].question_text,
        questioned_at: mainArr[mainArr.length - 1].questioned_at
          ? mainArr[mainArr.length - 1].questioned_at
          : formatDate(),
        answer_text: mainArr[mainArr.length - 1].answer_text + " " + text,
      };
      const obj1 = {
        transcript: [...tempMainArr],
      };
      setCurArr("");
      updateData(obj1);
      checkScroll();
      setDisabled("disabled");
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  const checkScroll = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.style.scrollBehavior = "smooth"; // Enable smooth scrolling
      chatBodyRef.current.style.transition = "scroll 500ms ease-in";
      chatBodyRef.current.scrollIntoView({ block: "end" });
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };
  const textareaRef = useRef(null); // Reference for the textarea
  const [lineCount, setLineCount] = useState(1); // Track the number of lines
  useEffect(() => {
    if (textareaRef.current) {
      // Get computed line height of the textarea
      const lineHeight = parseFloat(
        window.getComputedStyle(textareaRef.current).lineHeight
      );

      // Calculate the current number of lines
      const currentLineCount = Math.floor(
        textareaRef.current.scrollHeight / lineHeight
      );

      // If the number of lines changes, update the state
      if (currentLineCount !== lineCount) {
        setLineCount(currentLineCount);
        // console.log(`Number of lines: ${currentLineCount}`); // Listener effect: trigger when line count changes
      }

      // Adjust height up to 2.5 lines and allow scrolling after
      const maxHeight = lineHeight * 2.5;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
      textareaRef.current.style.overflowY = "hidden";
      // textareaRef.current.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [text, lineCount]); // Re-run the effect when the text or line count changes
  const handleChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    if (
      !test &&
      (getCookie("session_token") === null || getCookie("session_token") === "")
    ) {
      createProspectSession(id)(dispatch)
        .then((res) => {
          if (res && res.status) {
            setApiStatus(res.status);
          } else {
            getData(id);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      getData(id);
    }
  }, []);

  return (
    <AnswerTextWrapper>
      {test && (
        <NavBar>
          <h3 className="nav-item left">
            Test Drive | <span> {slate.name}</span>
          </h3>
          <div className="nav-item">
            <div className="toggle-button">
              <button
                className={`toggle-option ${isDesktop ? "active" : ""}`}
                onClick={() => setIsDesktop(true)}
              >
                <img src={isDesktop ? white_pc : black_pc} alt="pc" />
              </button>
              <button
                className={`toggle-option ${!isDesktop ? "active" : ""}`}
                onClick={() => setIsDesktop(false)}
              >
                <img src={!isDesktop ? white_mobile : black_mobile} alt="pc" />
              </button>
            </div>
          </div>
          <div className="nav-item right">
            <Button
              title="Close Test Drive "
              icon="closeIcon"
              onClickBtn={() => {
                if (slate)
                  navigate("/creator-dashboard/smart-interviews/" + slate.id, {
                    state: slate,
                  });
              }}
            />
          </div>
        </NavBar>
      )}
      {isDesktop && (
        <>
          <AnswerHeader>
            <img src={logo} alt="Logo" />
          </AnswerHeader>
          <AnswerBody>
            <h2> {interview.headline}</h2>
            {/* <img className="coupon" src={tree_coupon} /> */}
            <div className="chatBody">
              <div className="chatWrapper" ref={chatBodyRef}>
                {mainArr.map(
                  (quiz, qIndex) =>
                    pos > qIndex && (
                      <div key={"main-aui-" + qIndex}>
                        {/* {quiz.question_text !== "" && ( */}
                        {
                          <div
                            className="oneChat left-chat"
                            key={"chat-" + qIndex}
                          >
                            <img src={communicationIcon} alt="chat-panda" />
                            <p>{quiz.question_text || `Q` + (qIndex + 1)}</p>
                          </div>
                        }
                        {quiz.answer_text !== "" && (
                          <div
                            className="oneChat right-chat"
                            key={"chat-" + qIndex + "-answer"}
                          >
                            <p>{quiz.answer_text}</p>
                          </div>
                        )}
                      </div>
                    )
                )}
                {curFlag && curArr != "" && (
                  <div className="oneChat left-chat">
                    <img src={communicationIcon} alt="chat-panda" />
                    <p>{curArr}</p>
                  </div>
                )}
                {typing === true && pos <= mainArr.length - 1 && (
                  <div className={`typing oneChat left-chat`}>
                    {text == "" && (
                      <img src={communicationIcon} alt="chat-panda" />
                    )}
                    <TypingComponent
                      text={mainArr[pos].question_text || `Q` + (pos + 1)}
                      color={"black"}
                      onTypingFinish={() => {
                        checkScroll();
                        setTimeout(() => {
                          // setMainArr([
                          //   ...mainArr,
                          //   {
                          //     type: text !== "" ? "user" : "panda",
                          //     text: text !== "" ? text : questions[pos].text,
                          //   },
                          // ]);
                          setCurArr(
                            mainArr[pos].question_text || `Q` + (pos + 1)
                          );
                          setTyping(false);
                          checkScroll();
                        }, 500);
                      }}
                    />
                  </div>
                )}
                {typing === true && doneFlag && (
                  <div className={`typing oneChat left-chat`}>
                    {text == "" && (
                      <img src={communicationIcon} alt="chat-panda" />
                    )}
                    <TypingComponent
                      text={
                        "Great, thanks for the input! If you have any more feedback for us please type it below. If not, hit the DONE button."
                      }
                      color={"black"}
                      onTypingFinish={() => {
                        checkScroll();
                        setTimeout(() => {
                          setCurArr(
                            "Great, thanks for the input! If you have any more feedback for us please type it below. If not, hit the DONE button."
                          );
                          setTyping(false);
                          checkScroll();
                        }, 500);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="inputWrapper">
                <div className="form-input">
                  {/* <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                      //if (pos <= questions.length - 1) {
                      setText(e.target.value);
                      //}
                    }}
                    placeholder="Type your response here..."
                  /> */}
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleChange}
                    rows="1" // Initial rows set to 1
                    style={{
                      width: "100%",
                      resize: "none", // Prevent manual resizing
                    }}
                    placeholder="Type here..."
                    disabled={disabled}
                  />
                  <img
                    style={{ width: `20px` }}
                    src={send}
                    onClick={() => {
                      sendFunc();
                    }}
                  />
                </div>
                {doneFlag && (
                  <div
                    className="done"
                    onClick={() => {
                      navigate("/smartinterviews/thankyou/" + slate.id, {
                        state: {
                          interview: interview,
                          test: test,
                          slate: slate,
                        },
                      });
                    }}
                  >
                    Done
                  </div>
                )}
              </div>
            </div>
            <div className="answerFooter">
              <img src={answer_footer} alt="footer" />
            </div>
          </AnswerBody>
        </>
      )}
      {!isDesktop && (
        <div className="mobile-wrapper">
          <AnswerMobileHeader>
            <img src={logo} alt="Logo" />
          </AnswerMobileHeader>
          <AnswerMobileBody>
            <h2> {interview.headline}</h2>
            {/* <img className="coupon" src={tree_coupon} /> */}
            <div className="chatBody">
              <div className="chatWrapper" ref={chatBodyRef}>
                {mainArr.map(
                  (quiz, qIndex) =>
                    pos > qIndex && (
                      <div key={"main-aui-" + qIndex}>
                        {/* {quiz.question_text !== "" && ( */}
                        {
                          <div
                            className="oneChat left-chat"
                            key={"chat-" + qIndex}
                          >
                            <img src={communicationIcon} alt="chat-panda" />
                            <p>{quiz.question_text || `Q` + (qIndex + 1)}</p>
                          </div>
                        }
                        {quiz.answer_text !== "" && (
                          <div
                            className="oneChat right-chat"
                            key={"chat-" + qIndex + "-answer"}
                          >
                            <p>{quiz.answer_text}</p>
                          </div>
                        )}
                      </div>
                    )
                )}
                {curFlag && curArr != "" && (
                  <div className="oneChat left-chat">
                    <img src={communicationIcon} alt="chat-panda" />
                    <p>{curArr}</p>
                  </div>
                )}
                {typing === true && pos <= mainArr.length - 1 && (
                  <div className={`typing oneChat left-chat`}>
                    {text == "" && (
                      <img src={communicationIcon} alt="chat-panda" />
                    )}
                    <TypingComponent
                      text={mainArr[pos].question_text || `Q` + (pos + 1)}
                      color={"black"}
                      onTypingFinish={() => {
                        checkScroll();
                        setTimeout(() => {
                          // setMainArr([
                          //   ...mainArr,
                          //   {
                          //     type: text !== "" ? "user" : "panda",
                          //     text: text !== "" ? text : questions[pos].text,
                          //   },
                          // ]);
                          setCurArr(
                            mainArr[pos].question_text || `Q` + (pos + 1)
                          );
                          setTyping(false);
                          checkScroll();
                        }, 500);
                      }}
                    />
                  </div>
                )}
                {typing === true && doneFlag && (
                  <div className={`typing oneChat left-chat`}>
                    {text == "" && (
                      <img src={communicationIcon} alt="chat-panda" />
                    )}
                    <TypingComponent
                      text={
                        "Great, thanks for the input! If you have any more feedback for us please type it below. If not, hit the DONE button."
                      }
                      color={"black"}
                      onTypingFinish={() => {
                        checkScroll();
                        setTimeout(() => {
                          setCurArr(
                            "Great, thanks for the input! If you have any more feedback for us please type it below. If not, hit the DONE button."
                          );
                          setTyping(false);
                          checkScroll();
                        }, 500);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="inputWrapper">
                <div className="form-input">
                  {/* <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    placeholder="Type your response here..."
                  /> */}
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleChange}
                    rows="1" // Initial rows set to 1
                    style={{
                      width: "100%",
                      resize: "none", // Prevent manual resizing
                    }}
                    placeholder="Type here..."
                    disabled={disabled}
                  />
                  <img
                    style={{ width: `20px` }}
                    src={send}
                    onClick={() => {
                      sendFunc();
                    }}
                  />
                </div>
                {doneFlag && (
                  <div
                    className="done"
                    onClick={() => {
                      navigate("/smartinterviews/thankyou/" + slate.id, {
                        state: {
                          interview: interview,
                          test: test,
                          slate: slate,
                        },
                      });
                    }}
                  >
                    Done
                  </div>
                )}
              </div>
            </div>
            <div className="answerFooter">
              <img src={answer_footer} alt="footer" />
              <h4>Create a smart interview for your business!</h4>
            </div>
          </AnswerMobileBody>
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
    </AnswerTextWrapper>
  );
}

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${globalColor.gray_500};
  padding: 17px 32px;
  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    &.left {
      justify-content: start;
    }
    &.right {
      justify-content: end;
      align-items: center;
    }
  }
  h3 {
    color: ${globalColor.gray_600};
    margin: 0px;
    font-size: 30px;
    line-height: 38px;
    font-family: "Figtree";
    span {
      padding-left: 10px;
      font-weight: bold;
    }
  }
  .toggle-button {
    display: flex;
    border: 1px solid ${globalColor.gray_300};
    border-radius: 8px;
    overflow: hidden;
  }
  .toggle-option {
    flex: 1;
    padding: 12px 17px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
  }
  .toggle-option.active {
    background-color: ${globalColor.primary_600};
    color: #fff;
  }
  .toggle-option:not(.active):hover {
    background-color: #e0e0e0;
  }
`;
const AnswerHeader = styled.div`
  background-color: #dfe4ed;
  display: flex;
  padding: 12px;
  img {
    height: 60px;
  }
  justify-content: center;
`;
const AnswerMobileHeader = styled.div`
  background-color: #dfe4ed;
  display: flex;
  padding: 6px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  img {
    height: 40px;
  }
  justify-content: center;
`;
const AnswerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 165px);
  padding: 60px;
  .done {
    cursor: pointer;
    position: absolute;
    right: 15px;
    bottom: 26px;
    border-radius: 12px;
    /* border-top-left-radius: 0px;
    border-bottom-left-radius: 0px; */
    color: white;
    background-color: ${globalColor.primary_600};
    padding: 12px 16px;
  }
  h2 {
    max-width: 600px;
    text-align: center;
    font-size: 30px;
    line-height: 38px;
    font-weight: bold;
    font-family: "Figtree";
    margin: 0px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  img.coupon {
    padding: 40px 0px;
    max-width: 400px;
  }
  .chatBody {
    position: relative;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    padding: 20px;
    background-color: white;
    flex-grow: 1;
    min-height: 400px;
    .chatWrapper {
      position: absolute;
      width: 100%;
      left: 0px;
      padding: 20px;
      top: 0px;
      height: calc(100% - 72px);
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0px; /* Remove vertical scrollbar */
        height: 0px; /* Remove horizontal scrollbar */
      }

      /* Optionally, hide scrollbar track and thumb */
      &::-webkit-scrollbar-track {
        background: transparent; /* Make the track transparent */
      }

      &::-webkit-scrollbar-thumb {
        background: transparent; /* Make the thumb transparent */
      }
      .oneChat {
        display: flex;
        overflow: auto;
        gap: 16px;
        margin-bottom: 12px;
        img {
          width: 50px;
          height: 47px;
          margin-top: auto;
        }
        p,
        .typing-p {
          margin: 0px;
          background-color: ${globalColor.gray_50};
          padding: 12px 16px;
          font-size: 16px;
          line-height: 24px;
          color: black;
          max-width: 306px;
          word-break: break-word;
          border-radius: 12px;
        }
        &.left-chat {
          p,
          .typing-p {
            border-bottom-left-radius: 0px;
          }
        }
        &.right-chat {
          p,
          .typing-p {
            border-bottom-right-radius: 0px;
            margin-left: auto;
            background: #1693c7;
            color: white;
          }
        }
      }
    }
  }
  .form-input {
    position: absolute;
    width: calc(100% - 110px);
    bottom: 20px;
    textarea {
      width: 100%;
      padding: 12px 24px;
      border: 1px solid #dfe4ed;
      border-radius: 100px;
      padding-right: 40px;
    }
    img {
      position: absolute;
      right: 15px;
      top: 15px;
    }
  }
  .answerFooter {
    img {
      padding-bottom: 40px;
    }
  }
`;
const AnswerMobileBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 100px);
  padding: 12px 20px;
  .done {
    cursor: pointer;
    position: absolute;
    right: 15px;
    bottom: 26px;
    border-radius: 12px;
    color: white;
    background-color: ${globalColor.primary_600};
    padding: 10px 16px;
  }
  h2 {
    max-width: 600px;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
    font-family: "Figtree";
    margin: 0px;
    padding: 0px 30px;
  }
  img.coupon {
    padding: 12px 0px;
    max-width: 285px;
  }
  .chatBody {
    position: relative;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    padding: 20px;
    background-color: white;
    flex-grow: 1;
    .chatWrapper {
      position: absolute;
      width: 100%;
      left: 0px;
      padding: 20px;
      top: 0px;
      height: calc(100% - 72px);
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0px; /* Remove vertical scrollbar */
        height: 0px; /* Remove horizontal scrollbar */
      }

      /* Optionally, hide scrollbar track and thumb */
      &::-webkit-scrollbar-track {
        background: transparent; /* Make the track transparent */
      }

      &::-webkit-scrollbar-thumb {
        background: transparent; /* Make the thumb transparent */
      }
      .oneChat {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
        img {
          width: 50px;
          height: 47px;
          margin-top: auto;
        }
        p,
        .typing-p {
          margin: 0px;
          background-color: ${globalColor.gray_50};
          padding: 8px 12px;
          font-size: 14px;
          line-height: 20px;
          color: black;
          max-width: 190px;
          border-radius: 12px;
          border-bottom-right-radius: 0px;
        }
        &.right-chat {
          p {
            border-bottom-right-radius: 0px;
            margin-left: auto;
            background: #1693c7;
            color: white;
            overflow-wrap: break-word;
          }
        }
      }
    }
  }
  .form-input {
    position: absolute;
    width: calc(100% - 110px);
    bottom: 20px;
    textarea {
      width: 100%;
      padding: 12px 24px;
      border: 1px solid #dfe4ed;
      border-radius: 100px;
      padding-right: 40px;
      font-size: 14px;
      line-height: 20px;
    }
    img {
      position: absolute;
      right: 15px;
      top: 15px;
    }
  }
  .answerFooter {
    img {
      padding-bottom: 8px;
      padding-top: 24px;
      display: flex;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
    }
    h4 {
      color: ${globalColor.gray_500};
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      font-family: Figtree;
    }
  }
`;

const AnswerTextWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7f9fb;
  .mobile-wrapper {
    display: flex;
    justify-content: center;
    width: 375px;
    box-shadow: 4px 4px 30px; 0 rga(52,64,84, 0.15);
    border-radius: 12px;
    border: 0px;
    background-color: #f7f9fb;
    margin: 50px auto;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    height: calc(100vh - 183px);
  }
  form {
    width: 100%;
  }
  form .form-control.form-validation {
    border-color: red;
    margin-bottom: 3px;
  }
  form .form-group {
    label {
      color: #344054;
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
      margin-bottom: 6px;
    }
    input,
    textarea {
      border-radius: 8px;
      border: 1px solid #d0d5dd;
      background: #fff;
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      color: #667085;
      font-family: Figtree;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      margin-bottom: 16px;
    }
  }
`;
const LeftSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${primary_800};
  min-height: 100vh;
  height: 100%;
  img {
    display: block;
    max-width: 400px;
  }
`;
const RightSide = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  background-color: ${gray_200};
  min-height: 100vh;
  height: 100%;
  form {
    max-width: 400px;
    width: 100%;
    padding: 20px;
  }
  .required-html {
    color: ${error_600};
    font-size: 14px;
    line-height: 24px;
  }
`;
