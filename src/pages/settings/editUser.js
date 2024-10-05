import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Button from "../../components/basics/button";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData, updateUserData } from "../../action/api";

export default function EditUser(props) {
  const { propUser, updatedFunc, companyList } = props;
  const [showModal, setShowModal] = useState(false);
  const companies = [
    "Perceptive Panda",
    "ACME",
    "Branch.io",
    "Perceptive Company 3",
    "Perceptive Company 4",
    "Perceptive Company 5",
    "Perceptive Company 6",
    "Perceptive Company 7",
  ];
  const state = useSelector((state) => state.apiReducer);
  const roles = ["ADMIN"];
  const [flag, setFlag] = useState(-1);
  const [addUserName, setAddUserName] = useState(propUser.name);
  const [addUserCompany, setAddUserCompany] = useState(
    companyList.find((e) => e.id === propUser.account_id).name
  );
  const [addUserRole, setAddUserRole] = useState("ADMIN");
  const [addUserEmail, setAddUserEmail] = useState(propUser.email);
  const [addUserPassword, setAddUserPassword] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     getUsers(state.user_page, state.user_total)
  //   }, [dispatch]);
  //   const openModal = () => {
  //       setShowModal(true);
  //   };
  //   const getUsers = (page, rows) => {
  //     getUsersData(page, rows)(dispatch).then((res) => {
  //       if(res && res.objects) {
  //         setUsers([...res.objects])
  //       }
  //     });

  //   }
  useEffect(() => {
    if (flag == 0) {
      if (
        addUserName.length < 4 ||
        !validateEmail(addUserEmail) ||
        addUserPassword.length < 8
      )
        setFlag(1);
      else {
        updateUserData(propUser.id, {
          email: addUserEmail,
          name: addUserName,
          password: addUserPassword,
          password_confirm: addUserPassword,
          roles: ["ADMIN"],
        })(dispatch).then((res) => {
          updatedFunc();
        });
      }
    }
  }, [flag]);
  const closeModal = () => {
    setShowModal(false);
  };
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <EditUserWrapper>
      <Header
        title={"Edit"}
        subItem={{
          title: "Edit user",
          subTitle: "Edit user profile",
        }}
        onPrevMain={(name) => {
          updatedFunc();
        }}
        tag={""}
      />
      <BodyWrapper>
        <form>
          <div className="modal-content">
            <div className="form-group">
              <label htmlFor={"modal_title"}>Name</label>
              <input
                type="text"
                className={`form-control ${flag === 1 && addUserName.length < 4 && "form-validation"}`}
                id="modal_title"
                aria-describedby="modal_title_input"
                placeholder="Enter name"
                value={addUserName}
                onChange={(e) => {
                  setAddUserName(e.target.value);
                }}
              />
              {flag === 1 && addUserName.length < 4 && (
                <p className="required-html">
                  This field required and over 4 letters.
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={"modal_title"}>Company</label>
              <select
                value={addUserCompany}
                className="form-control"
                disabled
                onChange={(e) => {
                  setAddUserCompany(e.target.value);
                }}
              >
                {companyList.map((company, index) => (
                  <option key={"company-" + index} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group pt-1">
              <label htmlFor={"modal_title"}>Role</label>
              <select
                value={addUserRole}
                className="form-control"
                onChange={(e) => {
                  setAddUserRole(e.target.value);
                }}
              >
                {roles.map((role, index) => (
                  <option key={"role-" + index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={"modal_title"}>Email</label>
              <input
                type="email"
                className={`form-control ${flag === 1 && validateEmail(addUserEmail) == false && "form-validation"}`}
                id="modal_title"
                aria-describedby="modal_title_input"
                placeholder="Enter email"
                value={addUserEmail}
                onChange={(e) => {
                  setAddUserEmail(e.target.value);
                }}
              />
              {flag === 1 && !validateEmail(addUserEmail) && (
                <p className="required-html">
                  This field required and email validation.
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor={"modal_title"}>Password</label>
              <input
                type="password"
                className={`form-control ${flag === 1 && addUserPassword.length < 8 && "form-validation"}`}
                id="modal_title"
                aria-describedby="modal_title_input"
                placeholder="Enter password"
                value={addUserPassword}
                onChange={(e) => {
                  setAddUserPassword(e.target.value);
                }}
              />
              {flag === 1 && addUserPassword.length < 8 && (
                <p className="required-html">
                  This field required and over 8 letters.
                </p>
              )}
            </div>
            <div className="button-group">
              <button className="button-copy email">
                Send invite link
                <i className="fa fa-link" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
      </BodyWrapper>
      <FooterWrapper>
        <div className="modal-footer-btn">
          <Button
            title="Cancel"
            outline
            onClickBtn={() => {
              updatedFunc();
            }}
          />
          <Button
            title="Save changes"
            onClickBtn={() => {
              setFlag(0);
            }}
          />
        </div>
      </FooterWrapper>
    </EditUserWrapper>
  );
}
const EditUserWrapper = styled.div``;
const BodyWrapper = styled.div`
  padding: 16px 24px;
  .required-html {
    color: #d92d20;
    font-size: 14px;
    line-height: 24px;
  }
  h4 {
    font-family: Figtree;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
  }
  .transcript-item {
    margin-bottom: 4px;
    h2 {
      font-family: Figtree;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
      color: #3fabd7;
      &.orange {
        color: #ef6820;
      }
      span {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        color: #667085;
        margin-left: 12px;
      }
      margin-bottom: 0px;
    }
    p {
      font-family: Figtree;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      color: black;
      margin: 0px;
    }
  }
  .micro-interview {
    margin: 20px 0px;
    display: flex;
    justify-content: space-evenly;
    .micro-line {
      width: auto;
      min-width: 105px;
      border: 0.5px solid #d0d5dd;
      border-bottom: 0px;
      height: 0px;
      margin-top: auto;
      margin-bottom: auto;
    }
    .micro-badge {
      border: 1px solid #eaecf0;
      padding: 2px 8px;
      background: #f9fafb;
      font-family: Figtree;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: center;
      color: #344054;
      span {
        font-weight: 700;
      }
      border-radius: 12px;
      gap: 4px;
    }
  }
  .user-session-details {
    h3 {
      font-family: Figtree;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 8px;
    }
    .session-items {
      display: flex;
      flex-wrap: wrap;
    }
    .session-item {
      padding: 1px 8px;
      border-radius: 4px;
      background: #f2f4f7;
      margin: 4px;
      h2 {
        font-family: Figtree;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        color: #667085;
        span {
          font-family: Figtree;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0em;
          color: #101828;
          margin-left: 8px;
        }
        margin: 0px;
      }
    }
  }
  .modal-content {
    display: flex;
    max-width: 870px;
    width: 100%;
    padding: 24px;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border-radius: 8px;
    background: var(--base-white, #fff);
    box-shadow:
      0px 1px 2px 0px rgba(16, 24, 40, 0.06),
      0px 1px 3px 0px rgba(16, 24, 40, 0.1);
    label {
      padding-bottom: 6px;
    }
  }
  .form-control.form-validation {
    border-color: red;
    margin-bottom: 3px;
  }
  .button-copy {
    background: #1693c7;
    padding: 10px 16px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: Figtree;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    i {
      margin-left: 8px;
    }
    &.email {
      background: white;
      color: #344054;
      border: 1px solid #d0d5dd;
      margin-right: 10px;
    }
  }
`;
const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  background: white;
  width: 100%;
  display: flex;
  padding: 13px 24px;
  /* padding-right: 290px; */
  justify-content: end;
`;
