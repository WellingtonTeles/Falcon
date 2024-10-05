import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Button from "../basics/button";
import UploadModal from "../modals/upload";
import { useDispatch } from "react-redux";
import { addIncentive, getIncentiveList, updateIncentive } from "../../action/api";
import SaveToast from "../../components/toast/save";

export default function IncentiveCard(props) {
  const { title, img, desc, onCreated, type, flag } = props;
  const [toast, setToast] = useState(-1);
  const dispatch = useDispatch();
  const [name, setName] = useState(title);
  const [description, setDescription] = useState(desc);
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(-1)
      }, 3000);
    }
  },[toast])
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (<IncentiveCardWrapper>
    <div className="gray-card-header">
      <div className="form-group">
        <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder={type == 'coffee' ? "Free Coffee" : type=='tree' ? 'Plant a tree' : 'Custom'}/>  
      </div>
      <div className="header-btns">
        <Button title={'Reset changes'} icon={'refresh'} outline onClickBtn={()=> {
          setName('');
          setDescription('');
        }}/>
        <Button title={'Save incentive'} icon={'save'} onClickBtn={()=> {
          if (name && description &&  name.length > 3 && description.length > 3) {
            if (flag == '') {
                addIncentive({
                name:name,
                description: description,
                account_id: localStorage.getItem('account_id')
              })(dispatch).then(res=> {
                // setName(''); setDescription('');
                onCreated();
                setToast(1);
              })
            } else {
              updateIncentive(flag, {
                name:name,
                description: description
              })(dispatch).then(res=> {
                onCreated();
                setToast(1);
              })
            }
          } else {
            setToast(2);
          }
        }}/>
      </div>       
    </div>
    <div className="gray-card-body">
      <div className="gray-card-left" onClick={()=> {setShowModal(true)}}>
        <img src={img} alt={title}/>
        <p>Change icon</p>
      </div>
      <div className="gray-card-right">
        <div className="form-group">
          <label htmlFor={"modal_email_input"}>Incentive description</label>
          <textarea className="form-control" rows={4} id="modal_email" aria-describedby="modal_email_input" value={description} onChange={(e) => {
            setDescription(e.target.value)
          }} placeholder="This is a place for your description, edit it here and make it your own!">
          </textarea>
        </div>
      </div>
    </div>
    {showModal && (<UploadModal closeModal={closeModal}/>)}
    {showModal && <div className="modal-backdrop show" onClick={closeModal}></div>}
    {toast != -1 && (<SaveToast closeToast={()=>{setToast(-1)}} toast={toast} pageType={'incentive'} />)}
  </IncentiveCardWrapper>)
}

const IncentiveCardWrapper = styled.div`
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  border-bottom: 1px solid var(--gray-300, #D0D5DD);
  background: var(--gray-100, #F2F4F7);
  .gray-card-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: var(--gray-900, #101828);
    font-family: Figtree;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px; /* 155.556% */
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray-200, #EAECF0);
    input::placeholder {
      color: #bbb;
    }
    .header-title {

    }
    .header-btns {

    }
  }
  .gray-card-body {
    display:flex;
    padding: 24px;
    .gray-card-left {
      display: flex;
      cursor: pointer;
      flex-direction: column;
      width: 100px;
      align-items: center;
      p {
          color: var(--gray-600, #475467);
          font-family: Figtree;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 20px; /* 142.857% */
          margin-top: 5px;
          margin-bottom: 0px;
      }
      margin-right: 20px;
    }
    .gray-card-right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      align-self: stretch;
      .form-group {
          width: 100%;
      }
      textarea {
          padding: 12px;
      }
    }
  }
`
