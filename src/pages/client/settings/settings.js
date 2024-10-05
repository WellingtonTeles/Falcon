import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../../components/header";
import {
  burg_css,
  card_css,
  globalColor,
  text_lg,
  text_rg,
} from "../../../assets/variable/global";
import cloudIcon from "./../../../assets/images/upload-cloud-02.png";
import Button from "../../../components/basics/button";
import radio_check from "./../../../assets/images/radio_check.svg";
import usFlag from "./../../../assets/images/US.png";
import timezoneIcon from "./../../../assets/images/timezone.png";
import arrow from "./../../../assets/images/arrow_down.png";
import HamburgIcon from "../../../assets/images/hamburgIcon.png";
import CollaboratorDialog from "../../../components/cards/collaboratorDialog";
import SaveCancelModal from "../../../components/modals/discard";
import UploadError from "../../../components/modals/uploadError";
import { useDispatch, useSelector } from "react-redux";
import NotFoundErrorModal from "../../../components/modals/notFoundError";
import ServerErrorModal from "../../../components/modals/serverError";
import { useNavigate } from "react-router-dom";

import {
  getUserData,
  updateUserData,
  getCountries,
  getTimezones,
  getOneCompany,
  putOneCompany,
} from "../../../action/api";
import SaveToast from "../../../components/toast/save";

export default function Settings(props) {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  const [flag, setFlag] = useState(0);
  const [companyName, setCompanyName] = useState("ACME");
  const [flagNew, setFlagNew] = useState(false);
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("US/Eastern");
  const [language, setLanguage] = useState("English");
  const [currentPassword, setCurrentPassword] = useState("currentPasword");
  const [collaboratorStatus, setCollaboratorStatus] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState("www.aceme.com");
  const [saveCancelFlag, setSaveCancelFlag] = useState(-1);
  const [uploadModalFlag, setUploadModalFlag] = useState(-1);
  const [user, setUser] = useState({
    name: "Olivia Rhye",
    email: "olivia@aceme.com",
  });
  const [companyId, setCompanyId] = useState(null);
  const [notification, setNotification] = useState("0");
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const fileRef = useRef(null);
  const [iconFile, setIconFile] = useState(null);
  const [countryList, setCountryList] = useState(["United States"]);
  const [timezoneList, setTimezoneList] = useState(["PST"]);
  const languageList = ["English"];
  const [collaborator, setCollaborator] = useState("");
  const [collaboratorList, setCollaboratorList] = useState([
    {
      name: "Olivia Rhye",
      you: true,
      email: "olivia@email.com",
      status: "Owner",
    },
    { name: "Jane Cooper", email: "jane@email.com", status: "Collaborator" },
    { name: "", email: "darrell@email.com", status: "Collaborator" },
  ]);
  const [isCOpen, setIsCOpen] = useState(false);
  const [isTOpen, setIsTOpen] = useState(false);
  const [isLOpen, setIsLOpen] = useState(false);
  const handleCFocus = () => setIsCOpen(true);
  const handleCBlur = () => setIsCOpen(false);
  const handleTFocus = () => setIsTOpen(true);
  const handleTBlur = () => setIsTOpen(false);
  const handleLFocus = () => setIsLOpen(true);
  const handleLBlur = () => setIsLOpen(false);
  const onSelectFile = (e) => {
    var _URL = window.URL || window.webkitURL;
    const img = new Image();
    const file = fileRef.current?.files["0"];
    img.onload = function () {
      if (img.height < 800 && img.width < 800) setIconFile(img.src);
      else {
        setIconFile(null);
        setUploadModalFlag(1);
        // alert("image size overflow!");
      }
    };
    img.src = _URL.createObjectURL(file);
  };
  //   const onSelectFile = (e) => {
  //     const _URL = window.URL || window.webkitURL;
  //     const img = new Image();
  //     const file = fileRef.current?.files[0];

  //     if (!file) {
  //       alert("No file selected.");
  //       return;
  //     }

  //     const objectUrl = _URL.createObjectURL(file);

  //     img.onload = function () {
  //       if (img.height < 2000 && img.width < 2000) {
  //         setIconFile(objectUrl); // Update state with object URL
  //       } else {
  //         setIconFile(null);
  //         alert("Image size overflow!");
  //       }

  //       // Revoke URL after the image is loaded
  //     //  _URL.revokeObjectURL(objectUrl);
  //     };

  //     img.onerror = function () {
  //       alert("Failed to load image.");
  //       _URL.revokeObjectURL(objectUrl); // Revoke even on error
  //     };

  //     img.src = objectUrl;
  //   };

  const handleNotification = (event) => {
    setNotification(event.target.value);
  };
  const handleTimezone = (e) => {
    setTimezone(e.target.value);
    const flagURL = e.target.selectedOptions[0].getAttribute("data-flag");
    e.target.style.backgroundImage = `url(${flagURL})`;
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);

    // Dynamically change the background image
    const flagURL = e.target.selectedOptions[0].getAttribute("data-flag");
    e.target.style.backgroundImage = `url(${flagURL})`;
  };
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = React.useState(200);
  const getCompanyData = (id) => {
    getOneCompany(id)(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          setCompanyName(res.payloads[0].name);
          setCompanyWebsite(res.payloads[0].website);
        }
      })
      .catch((err) => {
        console.log("-getonecomopany-", err);
      });
  };
  const updateCompanyData = (id, obj) => {
    putOneCompany(
      id,
      obj
    )(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          setToast(1);
        }
        //setCompany({ ...res.payloads[0] });
      })
      .catch((err) => {
        console.log("-putonecomopany-", err);
      });
  };
  useEffect(() => {
    const id = localStorage.getItem("user_id");

    getCountries()(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else setCountryList(res.countries);
      })
      .catch((err) => {
        console.log("Err-Country", err);
      });
    getTimezones()(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else setTimezoneList(res.time_zones);
      })
      .catch((err) => {
        console.log("Err-Timezone", err);
      });
    getUserData(id)(dispatch)
      .then((res) => {
        if (res && res.status) {
          setApiStatus(res.status);
        } else {
          const { payloads } = res;
          setUserData({ ...payloads[0] });
          setCompanyId(payloads[0].company_id);
          getCompanyData(payloads[0].company_id);
          setUser({
            name: payloads[0].name,
            email: payloads[0].email,
          });
          setCountry(payloads[0].country || "United States");
          setTimezone(payloads[0].time_zone || "US/Eastern");
          setLanguage(payloads[0].language || "English");
          setNotification(payloads[0].notification_period.toString() || "0");
        }
      })
      .catch((err) => {
        console.log("Err:", err);
      });
  }, []);
  const [toast, setToast] = useState(-1);

  const updateData = (status = 0) => {
    const id = localStorage.getItem("user_id");

    if (
      status !== 0 &&
      (password == "" || newPass < 8 || newPass != confirmPass)
    ) {
      setFlag(1);
      return;
    }
    if (status === 0) {
      setFlag(0);
      updateCompanyData(companyId, {
        name: companyName,
        website: companyWebsite,
      });
      updateUserData(id, {
        country: country,
        time_zone: timezone,
        language: language,
        notification_period: parseInt(notification),
      })(dispatch)
        .then((res) => {
          if (res && res.status) {
            setApiStatus(res.status);
          } else setToast(1);
        })
        .catch((err) => console.log("Err", err));
    } else if (status !== 0)
      updateUserData(id, {
        // company_website: companyWebsite,
        // company_normalized_name: companyName,
        // email: user.email,
        // is_onboarded: true,
        // name: user.name,
        old_password: password,
        password: newPass,
        password_confirm: confirmPass,
        // roles: ["OWNER", "SUPER_ADMIN"],
        country: country,
        time_zone: timezone,
        language: language,
        notification_period: parseInt(notification),
      })(dispatch)
        .then((res) => {
          if (res && res.status) {
            setApiStatus(res.status);
          } else setToast(1);
        })
        .catch((err) => console.log("Err", err));
  };
  useEffect(() => {
    if (toast == 1) {
      setTimeout(() => {
        setToast(-1);
      }, 3000);
    }
  }, [toast]);
  return (
    <DashboardWrapper>
      <Header title={"Settings"} onPrevMain={() => {}} />
      <div className="main-wrapper">
        {/* Company */}
        <div className="body-card card-main">
          <div className="card-header">
            <h3>{"Company"}</h3>
          </div>
          <div className="card-body">
            <div className="card-section">
              <div>
                <div className="card-title">Company name</div>
                <div className="card-description">
                  This will be used to identify your company
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder=""
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="card-section">
              <div>
                <div className="card-title">Company logo</div>
                <div className="card-description">Update your company logo</div>
              </div>
              <div>
                <label
                  htmlFor="images"
                  className="cloud-icon"
                  id="dropcontainer"
                >
                  {!!iconFile ? (
                    <img src={iconFile} />
                  ) : (
                    <img src={cloudIcon} htmlFor="actual-btn" />
                  )}
                  <p style={{ width: "100%" }}>
                    <span>Click to upload </span> or drag and drop
                    <br />
                    SVG, PNG, JPG or GIF (max. 2000x2000px)
                  </p>
                  <input
                    ref={fileRef}
                    type="file"
                    id="images"
                    accept="image/*"
                    required
                    onChange={onSelectFile}
                  />
                </label>
              </div>
            </div>
            <hr />
            <div className="card-section">
              <div>
                <div className="card-title">Company website</div>
                <div className="card-description">
                  Panda will read and memorize your company's website
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder=""
                  value={companyWebsite}
                  onChange={(e) => {
                    setCompanyWebsite(e.target.value);
                  }}
                />
              </div>
            </div>
            <hr />
          </div>
        </div>
        {/* User */}
        <div className="body-card card-main">
          <div className="card-header">
            <h3>{"User"}</h3>
          </div>
          <div className="card-body">
            <div className="card-section">
              <div>
                <div className="card-title">Username</div>
                <div className="card-description">
                  This will be displayed on your profile.
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder=""
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="card-section">
              <div>
                <div className="card-title">Email</div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder=""
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="card-section">
              <div>
                <div className="card-title">Password</div>
                <div className="card-description">
                  Enter your current password and a new <br />
                  password to update your password.
                </div>
              </div>
              <div>
                <label>Current password</label>
                <input
                  type="password"
                  placeholder=""
                  value={password}
                  className={`form-control ${flag === 1 && password == "" && "form-validation"}`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {flag === 1 && password == "" && (
                  <label style={{ margin: "0", color: "red" }}>
                    Input the current password
                  </label>
                )}
                <br />
                <label>New password</label>
                <input
                  type="password"
                  placeholder=""
                  value={newPass}
                  className={`form-control ${flag === 1 && newPass.length < 8 && "form-validation"}`}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                />
                {flag === 1 && newPass.length < 8 && (
                  <label style={{ margin: "0", color: "red" }}>
                    Your new password must be more than 8 charcters
                  </label>
                )}
                <br />

                <label>Confirm new password</label>
                <input
                  type="password"
                  placeholder=""
                  value={confirmPass}
                  className={`form-control ${(flag === 1 || flagNew) && newPass != confirmPass && "form-validation"}`}
                  onChange={(e) => {
                    if (!flagNew) setFlagNew(true);
                    setConfirmPass(e.target.value);
                  }}
                />
                {(flag === 1 || flagNew) && newPass != confirmPass && (
                  <label style={{ margin: "0", color: "red" }}>
                    You need to match with new password.
                  </label>
                )}
                <br />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "20px",
                  }}
                >
                  <Button title="Cancel" outline onClickBtn={() => {}} />
                  <Button
                    title={"Update Password"}
                    onClickBtn={() => {
                      setFlag(1);
                      setFlagNew(false);
                      updateData(1);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="card-section">
              <div>
                <div className="card-title">Location</div>
                <div className="card-description">
                  The country and timezone you're doing <br />
                  business from
                </div>
              </div>
              <div className="select-container1">
                <label className="select-label">Country</label>
                <div className="custom-select1">
                  <select
                    value={country}
                    className="form-control"
                    onChange={handleCountryChange}
                    onFocus={handleCFocus}
                    onBlur={handleCBlur}
                  >
                    <option key={"country-select"} value="">
                      Select
                    </option>
                    {countryList.map((countryItem, index) => (
                      <option
                        key={"country-" + index}
                        value={countryItem}
                        //  data-flag={usFlag}
                      >
                        {countryItem}
                      </option>
                    ))}
                  </select>
                  {/* <span className={`custom-arrow ${isCOpen ? "open" : ""}`}>
                    <img src={arrow} />
                  </span> */}
                </div>

                <label className="select-label">Timezone</label>
                <div className="custom-select1 timezone">
                  <select
                    value={timezone}
                    className="form-control"
                    onChange={handleTimezone}
                    onFocus={handleTFocus}
                    onBlur={handleTBlur}
                  >
                    <option key={"timezone-select"} value="">
                      Select
                    </option>
                    {timezoneList.map((timezoneItem, index) => (
                      <option
                        key={"timezone-" + index}
                        value={timezoneItem}
                        // data-flag={timezoneIcon}
                      >
                        {timezoneItem}
                      </option>
                    ))}
                  </select>
                  {/* <span className={`custom-arrow ${isTOpen ? "open" : ""}`}>
                    <img src={arrow} />
                  </span> */}
                </div>

                <label>Language</label>
                <select
                  value={language}
                  className="form-control"
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  onFocus={handleLFocus}
                  onBlur={handleLBlur}
                >
                  <option key={"language-select"} value="">
                    Select
                  </option>
                  {languageList.map((languageItem, index) => (
                    <option key={"language-" + index} value={languageItem}>
                      {languageItem}
                    </option>
                  ))}
                </select>
                {/* <span className={`custom-arrow ${isLOpen ? "open" : ""}`}>
                  <img src={arrow} />
                </span> */}
              </div>
            </div>
            <hr />
          </div>
        </div>
        {/* Collaborators */}
        <div className="body-card card-main">
          <div className="card-header">
            <h3>{"Collaborators"}</h3>
          </div>
          <div className="card-body">
            <div className="card-section">
              <div>
                <div className="card-description">
                  Only people with access can edit and <br /> manage Smart
                  interviews
                </div>
              </div>
              <div>
                <label>Add collaborators</label>
                <div
                  style={{ display: "flex", gap: "20px", marginBottom: "20px" }}
                >
                  <input
                    type="text"
                    value={collaborator}
                    onChange={(e) => {
                      setCollaborator(e.target.value);
                    }}
                    placeholder={"Collaborator's email address"}
                  />
                  <Button
                    title="Invite"
                    onClickBtn={() => {
                      setCollaboratorList([
                        ...collaboratorList,
                        {
                          name: collaborator,
                          email: collaborator,
                          status: "Collaborator",
                        },
                      ]);
                      setCollaborator("");
                    }}
                  />
                </div>
                {collaboratorList.map((col, colIndex) => (
                  <div className="col-item" key={"col-" + colIndex}>
                    <div>
                      <h3>
                        {col.name} {col.you && <span>{"(You)"}</span>}
                      </h3>
                      <p style={{ paddingBottom: "12px" }}>{col.email}</p>
                    </div>
                    <div style={{ display: "flex", marginLeft: "8px" }}>
                      <p>{col.status}</p>
                      {col.status !== "Owner" && (
                        <div
                          style={{ position: "relative", marginLeft: "12px" }}
                        >
                          <img
                            style={burg_css.img}
                            src={HamburgIcon}
                            alt="hamburgIcon"
                            onClick={() => {
                              setCollaboratorStatus(colIndex);
                            }}
                          />
                          {collaboratorStatus == colIndex && (
                            <CollaboratorDialog
                              onClose={() => {
                                setCollaboratorStatus(false);
                              }}
                              clickFunc={(e) => {
                                if (e == -1) {
                                  const tempList = [...collaboratorList];
                                  tempList.splice(colIndex, 1);
                                  setCollaboratorList([...tempList]);
                                }
                              }}
                              status={0}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Notifications */}
        <div className="body-card card-main notification-card">
          <div className="card-header">
            <h3>{"Notifications"}</h3>
          </div>
          <div className="card-body">
            <div className="card-section">
              <div>
                <div className="card-title">Interview responses</div>
                <div className="card-description">
                  Notify me when someone response to a <br /> Smart Interview
                </div>
              </div>
              <div>
                <label>Notify me when there are new responses </label>
                <div className="form-c">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="notify"
                    name="notify"
                    checked={notification === "1"}
                    value="1"
                    onChange={handleNotification}
                  />
                  <label>Hourly</label>
                </div>
                <div className="form-c">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="notify"
                    name="notify"
                    value="2"
                    checked={notification === "2"}
                    onChange={handleNotification}
                  />
                  <label>Daily</label>
                </div>
                <div className="form-c">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="notify"
                    value="3"
                    name="notify"
                    checked={notification === "3"}
                    onChange={handleNotification}
                  />
                  <label>Weekly</label>
                </div>
                <div className="form-c">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="notify"
                    name="notify"
                    value="0"
                    checked={notification === "0"}
                    onChange={handleNotification}
                  />
                  <label>Never</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <div>
          <Button
            title={"Discard Changes"}
            outline
            onClickBtn={() => {
              setSaveCancelFlag(1);
            }}
          />
          <Button
            icon={"save"}
            title={"Save Settings"}
            margin="true"
            onClickBtn={() => {
              //submitFunc();
              // setFlag(1);
              updateData();
            }}
          />
        </div>
        {toast !== -1 && (
          <SaveToast
            closeToast={() => {
              setToast(-1);
            }}
            toast={toast}
            pageType={"SmartInterview"}
          />
        )}
      </Footer>
      {saveCancelFlag != -1 && (
        <SaveCancelModal
          closeModal={() => {
            setSaveCancelFlag(-1);
          }}
          text=""
          saveModal={(e) => {
            if (e === 1) navigate("/creator-dashboard/smart-interviews");
            else {
              updateData();
            }
          }}
        />
      )}
      {uploadModalFlag != -1 && (
        <UploadError
          closeModal={() => {
            setUploadModalFlag(-1);
          }}
          text=""
          saveModal={(e) => {}}
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
const Footer = styled.div`
  background: white;
  width: calc(100% - 10px);
  padding: 13px 0px;
  position: fixed;
  bottom: 0px;
  & > div {
    display: flex;
    justify-content: end;
    max-width: 900px;
    padding-right: 0px;
  }
`;
const DashboardWrapper = styled.div`
    .main-wrapper {
        padding: 32px;
    }
    input {
        border-radius: 8px;
        padding: 10px 14px;
        border: 1px solid var(--gray-300, #D0D5DD);
        background: var(--base-white, #FFF);
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        width: 100%;
    }
    .form-c {
        padding-bottom: 5px;
        label {
        margin: 0px;
            line-height: 20px;
        }
    }
    .form-check-input {
        width: 14px;
        height: 18px;
        margin: 0px;
        padding: 9px;
        margin-right: 12px;
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
        label {
        font-family: Figtree;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    margin: 0px;
                    color: ${globalColor.gray_600};
            margin-bottom: 6px;
            margin-top: 12px;

        }
    hr {
        margin: 0px 20px;
        color: ${globalColor.gray_300};
    }
    .card-main {
        border-radius: 8px;
        max-width: 870px;
        background: white;
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        margin-bottom: 24px;
        &.notification-card {
          margin-bottom: 100px;
        }
        .card-header  {
            h3 {
                padding: 20px; 24px;
                font-size: 20px;
                font-family: Figtree;
                font-weight: 600;
                line-height: 30px;
                margin: 0px;
                color: ${globalColor.gray_900};
            }
            border-bottom: 1px solid ${globalColor.gray_200};
        }
        .card-body {
            .card-section {
                padding: 20px 24px;
                display: flex;
                &>div {
                    width: 50%;
                }
                .card-title {
                    font-family: Figtree;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 28px;
                    margin: 0px;
                    margin-bottom: 4px;
                    color: ${globalColor.gray_900};
                }
                .card-description {
                    font-family: Figtree;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    margin: 0px;
                    color: ${globalColor.gray_600};
                }
            }
        }
    }
    .cloud-icon {
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;
        border-radius: 12px;
        padding: 16px 24px;
        border: 1px solid var(--gray-300, #D0D5DD);
        background: var(--base-white, #FFF);
        flex-wrap: wrap;
        flex-direction: column;
        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          border-radius: 8px;
          max-width: 150px;
          
          padding: 10px;
          border: 1px solid var(--gray-200, #EAECF0);
          background: var(--base-white, #FFF);
          box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        }
        p {
          color: var(--gray-600, #475467);
          text-align: center;
          font-family: Figtree;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 142.857% */
          span {
            color: var(--primary-700, #007AAB);
            font-family: Figtree;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 20px; /* 142.857% */
          }
        }
        input {
          display: none;
        }
      }


   .select-container {
  margin-bottom: 20px;
}

.select-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

/* Customize the select element */
.custom-select {
  position: relative;
  display: inline-block;
  width: 100%;
}

.custom-select select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  background-image: url(${usFlag}); 
 
//   background-image: url('path-to-default-flag.png');
  background-position: 10px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-left: 40px; /* Space for the flag */
}
 .custom-select.timezone select {
    background-image: url(${timezoneIcon}); 
  }
.custom-arrow {
  position: absolute;
  top: 10px;
  right: 15px;
  content: '';
  width: 10px;
  height: 10px;
}
.custom-arrow.open img {
 transform: rotate(180deg);
}
/* Change the background image based on selected option */
.custom-select select[data-flag] {
  background-image: url(${usFlag}); 
//    background-image: url('path-to-flag-image.png'); /* Update with the selected flag */
}   
.custom-select.timezone select[data-flag] {
  background-image: url(${timezoneIcon}); 
//    background-image: url('path-to-flag-image.png'); /* Update with the selected flag */
}  


//collaborator
.col-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    border-bottom: 1px solid ${globalColor.gray_300};
    h3 {
        color: ${globalColor.gray_900};
        font-family: Figtree;
        font-size: 16px;
        line-height: 24px;
        margin: 0px;
        span {
        font-size: 12px;
        line-height: 20px;
            color: #98A2B3;
        }
    } 
    p {
    color: ${globalColor.gray_600};
        font-family: Figtree;
        font-size: 14px;
        line-height: 20px;
        margin: 0px;
    }
}
.form-validation {
    border-color: red;
    margin-bottom: 3px;
  }
`;
