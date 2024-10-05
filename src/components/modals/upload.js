import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Button from "../basics/button";
import InputTags from "../tags";
import cloudIcon from './../../assets/images/upload-cloud-02.png'

export default function UploadModal(props) {
  const { closeModal, currentUpload, saveModal } = props;
  const [flag, setFlag] = useState(-1);
  const [addCompanyName, setAddCompanyName] = useState(currentUpload ? currentUpload.name : '');
  const [addCompanyWebsite, setAddCompanyWebsite] = useState(currentUpload ? currentUpload.website :'');
  const [addCompanyEmail, setAddCompanyEmail] = useState(currentUpload ? currentUpload.key_contacts :[]);

  useEffect(() => {
    if (flag === 0 ) {
      if (addCompanyName.length < 4 || !isValidUrlFormat(addCompanyWebsite) || !checkEmailList(addCompanyEmail))
        setFlag(1);
      else {
        saveModal({
          ...currentUpload,
          name: addCompanyName,
          key_contacts: [...addCompanyEmail],
          website:addCompanyWebsite
        })
      }
    }
  }, [flag])
  const isValidUrlFormat = (url) => {
    // Regular expression for basic URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const checkEmailList = (list) => {
    console.log('--checkemail--',list)
    if(list.length === 0 || list.length > 3) {
      return false;
    }
    for(let i = 0; i < list.length; i ++) {
      console.log(">>", list[i], validateEmail(list[i]))
      if (!validateEmail(list[i]) ) {

        return false;
      }
    }
    return true;
  }
  const fileRef = useRef(null);
  const [iconFile, setIconFile] = useState(null);
  const onSelectFile = (e) => {
    var _URL = window.URL || window.webkitURL;
    const img = new Image();
    const file = fileRef.current?.files['0'];
    img.onload = function () {
      if (img.height < 800 && img.width < 800)
        setIconFile(img.src);
      else {
        setIconFile(null);
        alert("image size overflow!");
      }
    };
    img.src = _URL.createObjectURL(file);
  }

  return (<UploadModalWrapper>
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <form>
          <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Change icon</h5>
                <div onClick={closeModal} className="close" data-dismiss="modal" aria-label="Close" style={{cursor:'pointer'}}>
                    <span aria-hidden="true">&times;</span>
                </div>
            </div>
            <div className="modal-body">
              {
                !!iconFile ? <img src={iconFile} /> : <label for="images" className="cloud-icon" id="dropcontainer">
                  <img src={cloudIcon} for="actual-btn" />
                  <p style={{width: '100%'}}>
                    <span>Click to select</span> an image or drag and drop it here<br />
                    SVG, PNG, JPG or GIF (max. 800x800px)
                  </p>
                  <input ref={fileRef} type="file" id="images" accept="image/*" required onChange={onSelectFile} />
                </label>
              }
            </div>
            <div className="modal-footer">
              <div className="modal-footer-btn">
                <Button title="Cancel" outline onClickBtn={closeModal} />
                <Button title="Upload" onClickBtn={()=>{
                  setFlag(0);
                }} />
              </div>
            </div>
          </div>
        </form> 
      </div>
    </div>
  </UploadModalWrapper>)
}

const UploadModalWrapper = styled.div`
  .modal.fade {
    background:none;
    .modal-dialog-centered {
      display: grid;
    }
    .modal-header {
      border: 0px;
      padding-bottom: 0px;
    }
    .modal-footer{
      border: 0px;
      padding-top: 0px;
    } 
    .modal-footer-btn {
      &>div {
        width: 50%;
        text-align: center;
      }
    }
    .modal-body {
      text-align: center;
      .cloud-icon {
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;
        border-radius: 12px;
        padding: 16px 24px;
        border: 2px solid var(--primary-600, #1693C7);
        background: var(--base-white, #FFF);
        flex-wrap: wrap;
        flex-direction: column;
        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          border-radius: 8px;
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
  .drop-container {
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    padding: 20px;
    border-radius: 10px;
    border: 2px dashed #555;
    color: #444;
    cursor: pointer;
    transition: background .2s ease-in-out, border .2s ease-in-out;
  }
  .drop-container:hover {
    background: #eee;
    border-color: #111;
  }
  .drop-container:hover .drop-title {
    color: #222;
  }
  .drop-title {
    color: #444;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color .2s ease-in-out;
  }
`
