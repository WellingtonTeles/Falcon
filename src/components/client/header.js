import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrow_left from './../../../src/assets/images/arrow-left.png';
import code from './../../../src/assets/images/code-snippet.svg';

export default function Header(props) {
    const { title, subItem, onPrevMain, preview, tag } = props;
    const [btnActive, setBtnActive] = useState(tag);
    useEffect(() => {
        setBtnActive(tag);
    }, [tag])
    if (!subItem)
        return (<HeaderWrapper>
            <h2>{title}</h2>
            </HeaderWrapper>)
    return (<HeaderWrapper>
        {subItem.btngroup  ? (<div className="sub-page header">
            {!preview ? <h2>
                {title}
            </h2>: <div className="sub-btns">
                    <div className="sub-title">
                        <img src={arrow_left} alt="" onClick={()=> {onPrevMain();}} />
                        <h4>{title}</h4>
                    </div>
                    <div className="btn-groups">
                        <div className="button-copy email">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                            Preview
                        </div>
                        <div className="button-copy">
                            <img src={code} alt="" style={{marginRight: 5, width: 20}} />
                            Get JavaScript
                        </div>
                    </div>
                </div>
            }
            <p>{subItem.subTitle}</p>
            <div className="btn-wrapper">
                <div className="btn-group" role="group">
                    {subItem.btngroup.map((btn, index) => (
                    <button key={'btn-' + index} type="button" className={`btn btn-outline-secondary ${btn.name === btnActive ? 'active': ''}`}
                        onClick={()=> {setBtnActive(btn.name); onPrevMain(btn.name)}}
                    >{btn.name}</button>
                    ))}
                </div>   
            </div>
            
        </div>) : (
            <div className="sub-page">
                <div className="sub-title">
                    <img src={arrow_left} alt="" onClick={()=> {onPrevMain();}} />
                    <h4>{subItem.title ? subItem.title : subItem.prospect_company_name}</h4>
                </div>
                <div className="sub-badges">
                   {/* <p>Edit user prfile</p> */}
                </div>
            </div>
        )}
  </HeaderWrapper>)
}

const HeaderWrapper = styled.div`
    background: white;
    display: flex;
    padding: 20px 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    h2 {
        color: #101828;
        font-family: Figtree;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: 38px; /* 126.667% */
    }
    .sub-page.header {
        width: 100%;
        h2 {
            color: #101828;
            font-family: Figtree;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px; /* 155.556% */
        }
        p {
            color: #475467;
            font-family: Figtree;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 142.857% */
        }
        .btn-wrapper {
            width : 100%;
            border-radius: 8px;
            border: 1px solid #EAECF0;
            background: #F9FAFB;
            padding: 4px;
            .btn-group {
                .btn {
                    font-family: Figtree;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px; /* 142.857% */
                    border: 0px;
                    &.active, &:focus, &:hover {
                        color: #344054;
                        font-family: Figtree;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 20px; /* 142.857% */
                        border-radius: 6px;
                        background: #FFF;
                        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);
                    }
                    margin-right: 4px;
                }
            }
        }
    }
    .sub-page {
        .sub-title {
            display: flex;
            img {
                width: 24px;
                height: 22px;
                margin-right: 8px;
                margin-top: auto;
                margin-bottom: auto;
                cursor:pointer;
            }
            h4 {
                font-family: Figtree;
                font-size: 20px;
                font-weight: 600;
                line-height: 30px;
                letter-spacing: 0em;
                text-align: left;
                margin-bottom: 2px;
            }
            margin-bottom: 8px;

        }
        .sub-badges {
            display: flex;
            .badge {
                margin-right: 8px;
            }
        }
    }
    .badge{
        display: flex;
        padding: 2px 10px 2px 8px;
        height: 24px;
        align-items: center;
        gap: 4px;
        border-radius: 16px;
        mix-blend-mode: multiply;
        background: #E7F7FF;
        border: 1px solid #CAEBF9;
        color: #000;
        i {
            color: #3FABD7;
        }
        span {
            color: #0b5987;
        }
    }
    .btn-groups {
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
            i  {
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
    .sub-btns {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`
