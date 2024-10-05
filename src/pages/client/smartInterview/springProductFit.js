import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/header";
import WelcomeModal from "../components/modals/welcome";
import { globalColor, display_sm } from "./../../assets/variable/global";
import Button from "../../components/basics/button";

export default function SpringProductFit(props) {
  const [showModal, setShowModal] = useState(-1);
  const [search, setSearch] = useState("");
  const closeModal = () => {
    setShowModal(-2);
  };
  return (
    <DashboardWrapper>
      <Header title={"Smart Interview Slates"} onPrevMain={() => {}} />
      {showModal > -2 && (
        <WelcomeModal
          closeModal={closeModal}
          currentAccount={null}
          saveModal={(obj) => {
            closeModal();
          }}
        />
      )}
      {showModal > -2 && (
        <div className="modal-backdrop show" onClick={closeModal}></div>
      )}
      <div className="main-wrapper">
        <div className="filter-wrapper">
          <div>
            <Button title="Filters" icon="filter" outline />
            <Button title="Most recent first " icon="filter" outline />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              // setSearch(e.target.value);
            }}
            placeholder="Search"
          />
        </div>
        <div className="body-card"></div>
      </div>
    </DashboardWrapper>
  );
}
const DashboardWrapper = styled.div`
  .main-wrapper {
    padding: 16px 32px;
    .filter-wrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin: 18px 20px;
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
`;
