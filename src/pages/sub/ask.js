import React, { useState } from "react";
import styled from "styled-components";
import Plus from "./../../assets/images/plus.png";
import Minus from "./../../assets/images/minus.png";

export default function FrequesntlyAsk(props) {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const questions = [
    {
      question: "Which chains does Falcon support?",
      answer: "Falcon supports Ethereum (ETH) and Solana (SOL) chains.",
    },
    {
      question: "What is the Falcon mini-app?",
      answer: "Falcon supports Ethereum (ETH) and Solana (SOL) chains.",
    },
    {
      question: "Which chains are supported?",
      answer: "Falcon supports Ethereum (ETH) and Solana (SOL) chains.",
    },
    {
      question: "How does FalconAI work?",
      answer:
        "Falcon is a Telegram trading bot that enables users to execute trades instantly within the app; simply fund your wallet with ETH or SOL and start trading immediately!",
    },
    {
      question: "Is Falcon free to use?",
      answer:
        "Yes, Falcon employs robust security measures to protect your data and funds.",
    },
    {
      question: "Will there be a Falcon token airdrop?",
      answer:
        "Details about tokens and potential airdrops will be announced in the future.",
    },
    {
      question: "What are Falcon points?",
      answer: "Falcon supports Ethereum (ETH) and Solana (SOL) chains.",
    },
    {
      question: "How do I connect a CEX?",
      answer: "Falcon supports Ethereum (ETH) and Solana (SOL) chains.",
    },
    {
      question: "Can I export my wallet from Falcon?",
      answer: "Falcon supports Ethereum (ETH) and Solana (SOL) chains.",
    },
  ];
  const toggleAnswer = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };
  return (
    <AskWrapper>
      <div className="ask-wrapper">
        <h1>Frequently Asked Questions</h1>
        <div className="question-list">
          {questions.map((quiz, quizIndex) => (
            <div className="quiz" key={"quiz" + quizIndex}>
              <div
                className="quiz-question"
                onClick={() => toggleAnswer(quizIndex)}
              >
                {/* <div className="quiz-bg">
                  <img src={Plus} alt="plus" />
                  <img src={Minus} alt="plus" />
                </div> */}
                <span className="plus">
                  {expandedIndices.includes(quizIndex) ? "-" : "+"}
                </span>
                {quiz.question}
              </div>
              <div
                className={`quiz-answer ${expandedIndices.includes(quizIndex) ? "show" : ""}`}
                onClick={() => toggleAnswer(quizIndex)}
              >
                {quiz.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AskWrapper>
  );
}

const AskWrapper = styled.div`
  padding: 68px;
  margin-bottom: 40px;
  .ask-wrapper {
    display: flex;
    gap: 153px;
    justify-content: center;
    h1 {
      // font-family: Inter;
      font-size: 38px;
      font-weight: 500;
      line-height: 45.99px;
      text-align: left;
      color: #e8e8e8;
      max-width: 280px;
      margin: 0px;
    }
    .question-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .quiz {
        .quiz-bg {
          width: 14px;
          height: 14px;
          cursor: pointer;
        }
        // font-family: Inter;
        font-size: 16px;
        font-weight: 500;
        line-height: 26px;
        text-align: left;
        color: #e8e8e8;
        margin: 0px;
        .quiz-question {
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          max-width: 438px;
        }
        .quiz-answer {
          max-width: 438px;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition:
            max-height 0.1s ease,
            opacity 0.3s ease;
        }

        .quiz-answer.show {
          max-height: 200px;
          padding-top: 10px;
          opacity: 1;
        }

        .plus {
          margin-right: 14px;
          font-size: 23px;
          line-height: 26px;
          transition: transform 1s ease;
        }
      }
    }
  }
  @media (max-width: 880px) {
    padding: 68px 20px;
    .ask-wrapper {
      flex-wrap: wrap;
      gap: 55px;
      h1 {
        max-width: 100%;
        padding: 0px 13px;
        text-align: center;
      }
      .question-list {
        width: 100%;
        column-gap: 0px;
      }
    }
  }
`;
