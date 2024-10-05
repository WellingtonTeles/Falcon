import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "../basics/button";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveAccountsData,
  addAccountData,
  updateAccountData
} from "./../../action/api";

export default function UserModal(props) {
  const { closeModal, saveModal, companyList } = props;
  const companies = ['Perceptive Panda', 'ACME', 'Branch.io', 'Perceptive Company 3', 'Perceptive Company 4', 'Perceptive Company 5', 'Perceptive Company 6' ,'Perceptive Company 7'];
  const roles = ['ADMIN'];
  // const roles = ['Admin', 'Editor', 'Read-only'];
  const [flag, setFlag] = useState(-1);
  const [addUserName, setAddUserName] = useState('');
  const [addUserCompany, setAddUserCompany] = useState('');
  const [addUserCompanyName, setAddUserCompanyName] = useState('');
  const [addAccountId, setAddAccountId] = useState('');
  const [addUserRole, setAddUserRole] = useState('');
  const [addUserEmail, setAddUserEmail] = useState('');
  const [addUserPassword, setAddUserPassword] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    receiveAccountsData()(dispatch);
  }, [dispatch]); 
  useEffect(() => {
    if (flag === 0) {
      if (addUserName.length < 4 || !validateEmail(addUserEmail) || addUserPassword.length < 8)
        setFlag(1);
      else {
        saveModal({
            "email": addUserEmail,
            "name": addUserName,
            "password": addUserPassword,
            "password_confirm": addUserPassword,
            "roles": roles,
            "account_id": addAccountId
        })
      }
    }
  }, [flag]);
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (<UserModalWrapper>
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add New User</h5>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor={"modal_title"}>Name</label>
                <input type="text" className={`form-control ${flag === 1 && addUserName.length < 4  && 'form-validation'}`} id="modal_title" aria-describedby="modal_title_input" placeholder="Enter name" value={addUserName} onChange={(e)=> {setAddUserName(e.target.value)}} />
                {flag === 1 && addUserName.length < 4  && <p className="required-html">This field required and over 4 letters.</p> }
              </div>
              <div className="form-group">
                <label htmlFor={"modal_title"}>Company</label>
                <select value={addUserCompany} className='form-control' onChange={(e)=>{
                  let val = e.target.value; const data = val.split('?!');  setAddUserCompany(val); setAddUserCompanyName(data[0]); setAddAccountId(data[1]);
                }}>
                  <option key={'company-select'} value="">Select</option>
                  {companyList.map((company, index) => (<option key={'company-' + index} value={company.name + '?!' + company.id}>
                    {company.name}
                  </option>))}
                </select>
                {flag === 1 && addUserCompany === ""  && <p className="required-html">This field required.</p> }
              </div>
              <div className="form-group pt-1">
                <label htmlFor={"modal_title"}>Role</label>
                <select value={addUserRole} className='form-control' onChange={(e)=>{
                  setAddUserRole(e.target.value)
                }}>
                  {roles.map((role, index) => (<option key={'role-' + index} value={role}>
                    {role}
                  </option>))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={"modal_title"}>Email</label>
                <input type="email" className={`form-control ${flag === 1 && validateEmail(addUserEmail) == false  && 'form-validation'}`} id="modal_title" aria-describedby="modal_title_input" placeholder="Enter email" value={addUserEmail} onChange={(e)=> {setAddUserEmail(e.target.value)}} />
                {flag === 1 && !validateEmail(addUserEmail)  && <p className="required-html">This field required and email validation.</p> }
              </div>
              <div className="form-group">
                <label htmlFor={"modal_title"}>Password</label>
                <input type="password" className={`form-control ${flag === 1 && addUserPassword.length < 8  && 'form-validation'}`} id="modal_title" aria-describedby="modal_title_input" placeholder="Enter password" value={addUserPassword} onChange={(e)=> {setAddUserPassword(e.target.value)}} />
                {flag === 1 && addUserPassword.length < 8  && <p className="required-html">This field required and over 8 letters.</p> }
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-btn">
                <Button title="Cancel" outline onClickBtn={closeModal} />
                <Button title="Add New User" onClickBtn={()=>{
                  setFlag(0);
                }} />
              </div>
            </div>
          </div>
        </form> 
      </div>
    </div>
  </UserModalWrapper>)
}

const UserModalWrapper = styled.div`
  max-width: 576px;
  width: 100%;
  .modal.fade {
    background:none;
    .modal-dialog-centered {
      display: grid;
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
        color:  #344054;
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
        margin-bottom:  6px;
      }
      input, textarea {
        border-radius: 8px;
        border: 1px solid #D0D5DD;
        background: #FFF;
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
    .modal-footer {
      display: block;
      h3 {
        color: var(--gray-900, #101828);
        font-family: Figtree;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 150% */
      }
      p {
        color: var(--gray-600, #475467);
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
      }
      .modal-footer-btn {
        display: flex;
        justify-content: flex-end;
      }
    }
    .button-copy {
      background: #1693C7;
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
        margin-right: 8px; 
      }
      &.email {
        background: white;
        color: #344054;
        border: 1px solid #D0D5DD;
        margin-right: 10px;
      }
    }
  }
  p.required-html {
    color: red!important;
    font-size: 12px;
  }
`
