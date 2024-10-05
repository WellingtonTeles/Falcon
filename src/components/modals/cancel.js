import React, { useState } from "react"
import styled from "styled-components"
import Button from "../basics/button";

export default function CancelModal(props) {
  const { closeModal, saveModal, title, description, name ='' } = props;
  const [flag, setFlag] = useState(-1);

  return (<CancelModalWrapper>
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <form>
          <div className="modal-content">
            <div className="modal-body">
             <h3>{title ? title :'Delete team member'}</h3>
             <p>{description ? description : `Are you sure you want to delete ${name}? There is no going back!`}</p>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-btn">
                <Button title="Cancel" outline onClickBtn={closeModal} />
                <Button title={"Delete"} red onClickBtn={()=>{
                  setFlag(0);
                  saveModal();
                }} />
              </div>
            </div>
          </div>
        </form> 
      </div>
    </div>
  </CancelModalWrapper>)
}

const CancelModalWrapper = styled.div`
  .modal.fade {
    background:none;
    h3 {
      color: var(--gray-900, #101828);
      font-family: Figtree;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px; /* 155.556% */
    }
    p {
      color: var(--gray-600, #475467);
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      margin-bottom: 0px;
    }
    .modal-footer {
      display: block;
      border: 0px;
      padding-top: 0px;
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
        .btn-red {
          background: #D92D20;    
        }
      }
    }
    .button-copy {
      background: #D92D20;
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
