import React, { useState } from "react"
import styled from "styled-components"

export default function ButtonGroup(props) {
    const { items, onPrevMain, tag } = props;
    const [btnActive, setBtnActive] = useState(tag);
    return (<ButtonGroupWrapper>
            <div className="btn-group" role="group">
                {items.btngroup.map((btn, index) => (
                <button key={'btn-' + index} type="button" className={`btn btn-outline-secondary ${btn.name === btnActive ? 'active': ''}`}
                    onClick={()=> {setBtnActive(btn.name); onPrevMain(btn.name)}}
                >{btn.name}</button>
                ))}
            </div>   
    </ButtonGroupWrapper>)
}
const ButtonGroupWrapper = styled.div`
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
`
