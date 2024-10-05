// import React, { useEffect, useState, useRef } from "react";
// import styled from "styled-components";

// export default function TypingComponent(props) {
//   const { text, onTypingFinish, color } = props;
//   const [displayText, setDisplayText] = useState("");
//   const [showCursor, setShowCursor] = useState(true);
//   const [showCursorFlag, setShowCursorFlag] = useState(true);
//   const containerRef = useRef(null);
//   const textRef = useRef(null);
//   console.log(">text>, displa", text, "////", displayText);
//   useEffect(() => {
//     let currentIndex = 0;
//     let intervalSubId;
//     const typeText = () => {
//       if (currentIndex < text.length - 1) {
//         setDisplayText((prevText) => prevText + text[currentIndex]);
//         currentIndex++;
//       } else if (text != "") {
//         setShowCursorFlag(false);
//         clearInterval(intervalSubId);
//         onTypingFinish();
//       }
//     };
//     const intervalId = setTimeout(function () {
//       intervalSubId = setInterval(typeText, 17);
//     }, 200); // Adjust the typing speed here (in milliseconds)
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [text]);

//   useEffect(() => {
//     if (showCursor) {
//       const cursorIntervalId = setInterval(() => {
//         setShowCursor((prevShowCursor) => !prevShowCursor);
//       }, 350); // Adjust the cursor blink speed here (in milliseconds)
//       return () => {
//         clearInterval(cursorIntervalId);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (textRef.current !== null && containerRef.current !== null) {
//       const containerWidth = textRef.current.offsetWidth;
//       containerRef.current.style.width = `${containerWidth + 20}px`;
//     }
//   }, []);

//   return (
//     <div ref={containerRef} style={{ display: "inline" }}>
//       <>
//         {text !== "" ? (
//           <TypeContent color={color}>
//             {displayText}
//             {displayText === "" ? (
//               <div className="cursor-area">
//                 {showCursorFlag && showCursor && (
//                   <span className="blinking-cursor">|</span>
//                 )}
//               </div>
//             ) : (
//               showCursorFlag &&
//               showCursor && <span className="blinking-cursor">|</span>
//             )}
//           </TypeContent>
//         ) : (
//           <TypeContent color={color}>
//             <div className="cursor-area">
//               {showCursorFlag && showCursor && (
//                 <span className="blinking-cursor">|</span>
//               )}
//             </div>
//           </TypeContent>
//         )}
//       </>
//     </div>
//   );
// }

// const TypeContent = styled.div`
//   display: inline;
//   justify-content: center;
//   padding-left: 0px;
//   color: ${(props) => props.color};
//   .cursor-area {
//     width: 14px;
//     height: 16px;
//   }
// `;
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
export default function TypingComponent(props) {
  const { text, onTypingFinish, onTypingStart, color } = props;
  const [displayText, setDisplayText] = useState(""); // Keeps track of the currently typed text
  const [showCursor, setShowCursor] = useState(true); // Controls cursor blinking
  const [showCursorFlag, setShowCursorFlag] = useState(true); // Controls when to stop the cursor
  const containerRef = useRef(null); // Reference to the container element
  const textRef = useRef(null); // Reference to the text element
  useEffect(() => {
    console.log(".d.", displayText);
  }, [displayText]);
  useEffect(() => {
    console.log(">>text>>", text);
    let currentIndex = -1;
    let intervalSubId;
    const typeText = () => {
      if (currentIndex < text.length - 1) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>", text[currentIndex]);
        setDisplayText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
      } else {
        setShowCursorFlag(false);
        onTypingFinish();
        clearInterval(intervalSubId);
      }
    };

    const intervalId = setTimeout(function () {
      intervalSubId = setInterval(typeText, 100);
    }, 350); // Adjust the typing speed here (in milliseconds)

    return () => {
      clearInterval(intervalSubId);
      clearTimeout(intervalId);
    };
  }, [text]);

  useEffect(() => {
    onTypingStart();
    if (showCursor) {
      const cursorIntervalId = setInterval(() => {
        setShowCursor((prevShowCursor) => !prevShowCursor);
      }, 350); // Adjust the cursor blink speed here (in milliseconds)
      return () => {
        clearInterval(cursorIntervalId);
      };
    }
  }, []);

  useEffect(() => {
    if (textRef.current !== null && containerRef.current !== null) {
      const containerWidth = textRef.current.offsetWidth;
      containerRef.current.style.width = `${containerWidth + 20}px`;
    }
  }, []);

  return (
    <div ref={containerRef}>
      <TypeContent color={color}>
        {displayText}
        {showCursorFlag && showCursor && (
          <span className="blinking-cursor">|</span>
        )}
      </TypeContent>
    </div>
  );
}

const TypeContent = styled.div`
  display: inline;
  justify-content: center;
  padding-left: 0px;
  color: ${(props) => props.color};
  .cursor-area {
    height: 24px;
    width: 16px;
  }
`;
