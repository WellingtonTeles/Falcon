import React, { useEffect, useState } from "react"
import styled from "styled-components"
import coffeeImg from './../../assets/images/coffee.png';
import treeImg from './../../assets/images/Frame129630.png';
import empty from './../../assets/images/Frame129631.png';
import { useDispatch } from "react-redux";
import IncentiveCard from "../../components/cards/incentive";
import { getIncentiveList } from "../../action/api";

export default function GlobalSettings(props) {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getLists();
  }, [dispatch]);
  async function getLists() {
    getIncentiveList()(dispatch).then(res => {
      if (res && res.objects) {
        setList([...res.objects]);
      }
    });
  }

  return (<GlobalSettingsWrapper className='container-fluid'>
    <div className="wrapper-header">
      Incentive icons & description
    </div>
    <div className="wrapper-body">
        {list.map((item, index) => (
          <IncentiveCard
            key={index}
            title={item.name}
            desc={item.description}
            flag={item.id}
            type={index == 0 ? 'coffee' : index == 1 ? 'tree' : empty}
            img={index == 0 ? coffeeImg : index == 1 ? treeImg : empty}
            onCreated={getLists}
          />
        ))}
        {list.length < 1 && (<IncentiveCard title={''} desc={''} flag={''} type='coffee' img={coffeeImg} onCreated={()=> {getLists()}}/>)}
        {list.length < 2 && (<IncentiveCard title={''} desc={''} flag={''} type='tree' img={treeImg} onCreated={()=> {getLists()}}/>)}
        {list.length < 3 && (<IncentiveCard title={''} desc={''} flag={''} img={empty} onCreated={()=> {getLists()}}/>)}
    </div>
  </GlobalSettingsWrapper>)
}
const GlobalSettingsWrapper = styled.div`
  background: #fff;
  border-radius: 20px;
  margin: 32px;
  .wrapper-header {
    color: var(--gray-900, #101828);
    /* Text lg/Semibold */
    font-family: Figtree;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px; /* 155.556% */
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray-200, #EAECF0);
  }
  .wrapper-body {
    padding: 20px 24px;
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
`