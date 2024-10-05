import React from "react"
import styled from "styled-components"
import close_icon from '../../assets/images/close-icon.png';
import sucess_icon from '../../assets/images/sucess-icon.png';

export default function SaveToast(props) {
  const { closeToast, toast, error, pageType } = props;

  return (<SaveToastWrapper style={pageType === 'form' ? {position: `fixed`, bottom: `70px`, right: `75px`} : pageType === 'table' ? {bottom: 0, right: `12px`} : pageType === 'incentive' ?  {position: `fixed`, bottom: `20px`, right: `30px`} : {}}>
    <div className="fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
                {toast === 1 && (<img src={sucess_icon} />)}
                  <div>
                    <h5 className="modal-title" id="exampleModalLongTitle">{toast === 1 ? 'Changes successfully saved!' : "Changes not saved!"}</h5>
                    <p>{toast === 1 ? `` : error}</p>
                </div>
                <img src={close_icon} onClick={closeToast} />
            </div>
          </div>
      </div>
    </div>
  </SaveToastWrapper>)
}

const SaveToastWrapper = styled.div`
  position: absolute;
  max-width: 441px;
  width: 100%;
  /* position: fixed; */
  margin-left: auto;
  /* margin-bottom: -75px; */
  margin-bottom: 15px;
  margin-right: 20px;
  /* bottom: 0px; */
  /* right: 30px; */
  right: -20px;
  bottom: -20px;
  .modal.show {
    height: auto;
  }
  .modal-dialog {
    max-width: 441px;
    /* margin-right: 20px; */
    margin-top: 20px;
    /* margin-bottom: 80px; */
  }
  .modal-content {
    /* margin: 1.75rem; */
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 5px 5px 20px 0px #8888886e;
    background-color: #ECFDF3;
  }
  .modal-header {
    align-items: start;
    div {
      width: 80%;
      margin-left: 10px;
      margin-top: 10px;
      h5 {
          color: var(--Gray-900, #101828);
          font-family: Figtree;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px; /* 150% */
          margin: 0px;
      }
      p {
          color: var(--Gray-600, #475467);
          font-family: Figtree;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 142.857% */
          margin: 0px;
      }
    }
    img {
      cursor: pointer;
    }
  }
`
