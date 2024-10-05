import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import WelcomeModal from "../../components/modals/welcome";
import Button from "../../components/basics/button";
import searchIcon from "./../../assets/images/search_md.png";
import clearIcon from "./../../assets/images/close.png";
import NewSlate from "../../components/cards/slates/newSlate";
import useToken from "./auth/useToken";
import NotFoundErrorModal from "../../components/modals/notFoundError";
import ServerErrorModal from "../../components/modals/serverError";
import {
  putWelcome,
  getSlates,
  addSlate,
  deleteSlate,
  getInterviewFunc,
  getSlateUrlCode,
} from "../../action/api";
import { useDispatch } from "react-redux";
import PublishedSlate from "../../components/cards/slates/publishedSlate";
import CompletedSlate from "../../components/cards/slates/completedSlate";
import DatePicker from "../../components/cards/datePicker";
import { globalColor } from "../../assets/variable/global";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { getHHMMSS } from "../../config/common.js";
import ActivateModal from "../../components/modals/activate";

export default function SmartInterviews(props) {
  const [showModal, setShowModal] = useState(-1);
  const [search, setSearch] = useState("");
  const [activateModal, setActivateModal] = useState(-1);
  const [code, setCode] = useState("");
  const [slateOpen, setSlateOpen] = useState(false);
  const [slates, setSlates] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const scrollableRef = useRef(null);
  const { is_onboarded, token, userId, saveOnboarded } = useToken();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [apiStatus, setApiStatus] = React.useState(200);

  const closeModal = (obj = {}) => {
    setShowModal(-2);
    putWelcome(
      obj,
      userId,
      token
    )(dispatch).then((res) => {
      if (res && res.status) {
        setApiStatus(res.status);
      } else saveOnboarded();
    });
  };
  const getBoard = () => {
    if (is_onboarded === true || is_onboarded === "true") return true;
    return false;
  };
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    fetchSlates(page + 1);
  };
  const fetchSlates = (pageNo = 0, rows = 10) => {
    // if (loading || !hasMore) return;
    setLoading(true);
    if (pageNo === 0) setSlates([]);
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
      if (
        !(
          checkedItems.notActivated === false &&
          checkedItems.running === false &&
          checkedItems.completed === false
        )
      ) {
        query += '&query={"$in": {"status": [';
        let arr = [];
        if (checkedItems.notActivated === true) arr.push('"notActive"');
        if (checkedItems.running === true) arr.push('"running"');
        if (checkedItems.completed === true) arr.push('"completed"');
        query += arr.toString() + "]}}";
      }
    } else {
      query += '&query={"$like": {"name": "' + search + '"}}';
    }
    getSlates(
      pageNo,
      rows,
      query
    )(dispatch)
      .then(async (res) => {
        if (res) {
          if (res && res.status) {
            setApiStatus(res.status);
          } else {
            const { payloads } = res;

            if (payloads.length === 0) {
              setHasMore(false);
            } else {
              if (pageNo > 0) {
                setSlates((prevSlates) => [...prevSlates, ...payloads]);
              } else setSlates([...payloads]);
            }
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [checkedItems, setCheckedItems] = useState({
    notActivated: false,
    running: false,
    completed: false,
  });
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const toggleFilterDropdown = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  const selectFilter = () => {
    setSearch("");
    fetchSlates();
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
    setLoading(false);
    setHasMore(true);
    setPage(0);
  };
  const newSlate = localStorage.getItem("new_slate") || "";

  useEffect(() => {
    setLoading(false);
    setHasMore(true);
    setPage(0);
    fetchSlates();
    if (search !== "")
      checkedItems.notActivated =
        checkedItems.running =
        checkedItems.completed =
          false;
  }, [search, selectedItemTitle]);

  return (
    <DashboardWrapper>
      <Header
        title={"Smart Interview Slates"}
        onPrevMain={() => {
          const slateName = getHHMMSS();
          addSlate("New Slate " + slateName)(dispatch).then((res) => {
            if (res && res.status) {
              setApiStatus(res.status);
            } else if (res.payloads) {
              const { payloads } = res;
              setSlates([
                {
                  id: payloads[0].id,
                  name: "New Slate " + slateName,
                  badge_title: "Not Activated",
                  badge_color: "danger",
                  summary: "Summary",
                  status: "notActive",
                  interview_ids: payloads[0].interview_ids,
                },
                ...slates,
              ]);
              navigate(
                "/creator-dashboard/smart-interviews/" + payloads[0].id,
                {
                  state: { ...payloads[0], new_slate: true },
                }
              );
            }
          });
        }}
      />
      {!getBoard() && showModal > -2 && (
        <WelcomeModal
          closeModal={() => {
            closeModal({});
          }}
          currentAccount={null}
          saveModal={(obj) => {
            closeModal(obj);
          }}
        />
      )}
      {!getBoard() && showModal > -2 && (
        <div className="modal-backdrop show"></div>
      )}
      <div className="main-wrapper">
        <div className="filter-wrapper">
          <div>
            <div className="checkbox-dropdown-filter">
              <Button
                title="Filters"
                icon="filter"
                outline
                onClickBtn={toggleFilterDropdown}
              />
              {isOpenFilter && (
                <div className="dropdown-menu dropdown-menu-filter">
                  <ul className="dropdown-list-filter">
                    <li className="dropdown-item dropdown-item-filter">
                      <label>
                        <input
                          type="checkbox"
                          name="notActivated"
                          checked={checkedItems.notActivated}
                          onChange={handleCheckboxChange}
                        />
                        Not Activated
                      </label>
                    </li>
                    <li className="dropdown-item dropdown-item-filter">
                      <label>
                        <input
                          type="checkbox"
                          name="running"
                          checked={checkedItems.running}
                          onChange={handleCheckboxChange}
                        />
                        Running
                      </label>
                    </li>
                    <li className="dropdown-item dropdown-item-filter">
                      <label>
                        <input
                          type="checkbox"
                          name="completed"
                          checked={checkedItems.completed}
                          onChange={handleCheckboxChange}
                        />
                        Completed
                      </label>
                    </li>
                  </ul>
                  <div className="dropdown-actions-filter">
                    <button
                      className="dropdown-button-filter"
                      onClick={toggleFilterDropdown}
                    >
                      Cancel
                    </button>
                    <button
                      className="dropdown-button-filter btn_done"
                      onClick={selectFilter}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
              {/* {isOpenFilter && (
                <DatePicker
                  onClose={() => {
                    setIsOpenFilter(!isOpenFilter);
                  }}
                  onApply={(obj) => {}}
                />
              )} */}
            </div>
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
              placeholder="Search slate name"
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
        <div
          id="scrollableDiv"
          // ref={scrollableRef}
          style={{
            height: 900,
            overflow: "auto",
            paddingRight: "17px",
            boxSizing: "content-box",
          }}
        >
          <InfiniteScroll
            dataLength={slates.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 style={{ height: "100px" }}></h4>}
            scrollableTarget="scrollableDiv"
          >
            <div className="body-card">
              {slates &&
                slates.map((slate, slateIndex) =>
                  slate.status === "notActive" ? (
                    <NewSlate
                      newSlate={newSlate === slate.id}
                      key={"Slate-" + slateIndex}
                      title={slate.name}
                      id={slate.id}
                      code={slate.code}
                      badge_title={"Not Activated"}
                      badge_color={slate.badge_color}
                      description={slate.summary}
                      headline_complete={slate.headline_complete}
                      incentive_complete={slate.incentive_complete}
                      goals_complete={slate.goals_complete}
                      behavior_complete={slate.behavior_complete}
                      questions_complete={slate.questions_complete}
                      exit_message_complete={slate.exit_message_complete}
                      respondents_complete={slate.respondents_complete}
                      onEdit={(e) => {
                        if (e > 399) {
                          setApiStatus(e);
                        } else if (e === -1) {
                          deleteSlate(slate.id)(dispatch).then((res) => {
                            if (res && res.status) {
                              setApiStatus(res.status);
                            } else {
                              const temp = [...slates];
                              temp.splice(slateIndex, 1);
                              setSlates([...temp]);
                            }
                          });
                        } else {
                          navigate(
                            "/creator-dashboard/smart-interviews/" + slate.id,
                            { state: slate }
                          );
                        }
                      }}
                    />
                  ) : slate.status === "running" ? (
                    <PublishedSlate
                      key={"Slate-" + slateIndex}
                      title={slate.name}
                      code={slate.code}
                      id={slate.id}
                      badge_title={slate.badge_title}
                      badge_color={slate.badge_color}
                      description={slate.summary}
                      start={slate.start_at}
                      max_respondents={slate.max_respondents}
                      participants={slate.participants}
                      completions={slate.completions}
                      completion_rate={
                        slate.completion_rate === "NaN"
                          ? 0
                          : slate.completion_rate
                      }
                      budget={slate.budget}
                      interview_id={slate.interview_ids[0]}
                      cost={slate.cost}
                      currency={slate.currency}
                      onEdit={(e) => {
                        if (typeof e == "string") {
                          setCode(e);
                          setActivateModal(1);
                        } else {
                          if (e > 399) {
                            setApiStatus(e);
                          } else if (e === -1) {
                            deleteSlate(slate.id)(dispatch).then((res) => {
                              if (res && res.status) {
                                setApiStatus(res.status);
                              } else {
                                const temp = [...slates];
                                temp.splice(slateIndex, 1);
                                setSlates([...temp]);
                              }
                            });
                          } else if (e === 5) {
                            navigate(
                              "/creator-dashboard/smart-interviews/" + slate.id,
                              { state: { slate: slate, completed: true } }
                            );
                          } else {
                            navigate(
                              "/creator-dashboard/smart-interviews/" + slate.id,
                              { state: slate }
                            );
                          }
                        }
                      }}
                    />
                  ) : slate.status === "completed" ? (
                    <CompletedSlate
                      key={"Slate-" + slateIndex}
                      title={slate.name}
                      id={slate.id}
                      code={slate.code}
                      badge_title={slate.badge_title}
                      badge_color={slate.badge_color}
                      description={slate.summary}
                      start={slate.start_at}
                      end={slate.end_at}
                      participants={slate.participants}
                      onEdit={(e) => {
                        if (e > 399) {
                          setApiStatus(e);
                        } else if (e === 2) {
                          navigate(
                            "/creator-dashboard/smart-interviews/" + slate.id,
                            { state: slate }
                          );
                        } else if (e === -1) {
                          deleteSlate(slate.id)(dispatch).then((res) => {
                            if (res && res.status) {
                              setApiStatus(res.status);
                            } else {
                              const temp = [...slates];
                              temp.splice(slateIndex, 1);
                              setSlates([...temp]);
                            }
                          });
                        } else if (e === 5) {
                          navigate(
                            "/creator-dashboard/smart-interviews/" + slate.id,
                            { state: { slate: slate, completed: true } }
                          );
                        } else {
                          navigate(
                            "/creator-dashboard/smart-interviews/" + slate.id,
                            { state: slate }
                          );
                        }
                      }}
                    />
                  ) : (
                    <></>
                  )
                )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
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
      {activateModal != -1 && (
        <ActivateModal
          closeModal={() => {
            setActivateModal(-1);
          }}
          text=""
          title={code}
          saveModal={(e) => {}}
        />
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
      max-width: 1065px;
      min-width: 524px;
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
    & .card-main:nth-child(even) {
      margin-right: 0 !important;
    }
    @keyframes showBorder {
      0% {
        border: 2px solid #1693c7;
      }
      100% {
        border: 2px solid transparent;
      }
    }
    #newCreated {
      animation: showBorder 4s ease forwards;
    }
  }
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }
  .search-box input {
    padding-left: 37px !important;
  }
  .search-box .search-icon {
    position: absolute;
    left: 10px; /* Adjust to fit the input */
    width: 20px; /* Adjust based on icon size */
    height: 20px; /* Adjust based on icon size */
  }
  .search-box .clear-icon {
    position: absolute;
    right: 5px; /* Adjust to fit the input */
    width: 30px; /* Adjust based on icon size */
    height: 30px; /* Adjust based on icon size */
    cursor: pointer;
  }
  .card-main {
    display: flex;
    flex-direction: column;
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
    left: 142px;
    top: 150px;
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
  #scrollableDiv::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;
