import React from "react";
import styled from "styled-components";

export default function FrequesntlyAsk(props) {
  const questions = [
    { content: "Which chains does Falcon support?" },
    { content: "What is the Falcon mini-app?" },
    { content: "Which chains are supported?" },
    { content: "How does FalconAI work?" },
    { content: "Is Falcon free to use?" },
    { content: "Will there be a Falcon token airdrop?" },
    { content: "What are Falcon points?" },
    { content: "How do I connect a CEX?" },
    { content: "Can I export my wallet from Falcon?" },
  ];
  return (
    <AskWrapper>
      <div className="ask-wrapper">
        <h1>Frequently Asked Questions</h1>
        <div className="question-list">
          {questions.map((quiz, quizIndex) => (
            <div className="quiz" key={"quiz" + quizIndex}>
              <div className="quiz-bg"></div>
              <p>{quiz.content}</p>
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
      gap: 25px;
      .quiz {
        display: flex;
        gap: 14px;
        .quiz-bg {
          width: 24px;
          height: 24px;
          background: white;
        }
        p {
          // font-family: Inter;
          font-size: 16px;
          font-weight: 500;
          line-height: 26px;
          text-align: left;
          color: #e8e8e8;
          margin: 0px;
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
