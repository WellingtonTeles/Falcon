import React from "react";
import styled from "styled-components";
import image from "../assets/images/Union.png";

export default function Loading() {
  return (
    <LoadingWrapper>
      <div className="loading-container">
        <div className="circle-border"></div>
        <img src={image} alt="Loading" className="loading-icon" />
      </div>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  background-color: black;
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full height of the viewport */
    position: relative; /* Position relative for absolute children */
    background-color: #000; /* Background color */
  }

  .circle-border {
    width: 168px; /* Adjust size as needed */
    height: 168px; /* Adjust size as needed */
    border-radius: 50%; /* Make it circular */
    position: absolute; /* Position it absolutely */
    border: 1px solid #0d1121; /* Set border to transparent first */
    border-top-color: #fff; /* Top half color */
    border-right-color: #fff; /* Right half color */
    animation: rotate 2s linear infinite; /* Animation effect */
  }

  .loading-icon {
    width: 88px; /* Adjust size as needed */
    position: relative; /* Position relative to the container */
    z-index: 1; /* Ensure icon is above the circle */
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
