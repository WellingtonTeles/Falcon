import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "../basics/button";

export default function FitnessCriteriaModal(props) {
  const { closeModal, currentAccount, saveModal } = props;
  const [flag, setFlag] = useState(-1);
  const [addName, setAddName] = useState(currentAccount ? currentAccount.name : '');
  const saveFitnessCriteria = () => {
    if (addName !== '') {
      if (addName.length < 4)
        setFlag(1);
      else {
        saveModal({
          ...currentAccount,
          name: addName,
        });
      }
    }
  }

  return (<FitnessCriteriaModalWrapper>
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{currentAccount ? 'Edit' : 'Add  new'} Fitness Criteria List</h5>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor={"modal_title"}> Name</label>
                <input type="text" className={`form-control ${flag === 1 && addName.length < 4  && 'form-validation'}`} id="modal_title" aria-describedby="modal_title_input" placeholder="Enter name" value={addName} onChange={(e)=> {setAddName(e.target.value)}} />
                {flag === 1 && addName.length < 4  && <p className="required-html">This field required and over 4 letters.</p> }
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-btn">
                <Button title="Cancel" outline onClickBtn={closeModal} />
                <Button title={!currentAccount ? "Add Fitness Criteria List" : "Edit Fitness Criteria List"} onClickBtn={()=>{
                  setFlag(0);
                  saveFitnessCriteria();
                }} />
              </div>
            </div>
          </div>
        </form> 
      </div>
    </div>
  </FitnessCriteriaModalWrapper>)
}

const FitnessCriteriaModalWrapper = styled.div`
  .modal.fade {
    .modal-dialog-centered {
      display: grid;
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
