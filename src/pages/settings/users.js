import React, { useState, useEffect } from "react"
import styled from "styled-components"
import pen1 from './../../assets/images/pen1.png';
import square1 from './../../assets/images/trash-02.png';
import Button from "../../components/basics/button";
import Badge from "../../components/basics/badge";
import Sidebar from "./../../components/sidebar";
import Header from "./../../components/header";
import Pagination from "../../components/basics/pagination";
import UserModal from "../../components/modals/user";
import CancelModal from "../../components/modals/cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveAccountsData,
  addAccountData,
  updateAccountData,
  getUsersData,
  deleteUserData
} from "../../action/api";
import { addUserData, updateUserData } from "../../action/api";
import EditUser from "./editUser";
import SaveToast from "../../components/toast/save";

export default function Users(props) {
  //   const [ search, setSearch] = useState('');
  const {updateTag} = props;
  const state = useSelector((state) => state.apiReducer);
  const [tag, setTag] = useState('Users');
  const [toast, setToast] = useState(-1);
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(-1)
      }, 3000);
    }
  }, [toast])
  const [currentPage, setCurrentPage] = useState(state.user_page || 1);
  const [companyList, setCompanyList] = useState([]);
  const [totalPage, setTotalPage] = useState(state.user_total);
  const dispatch = useDispatch();
  useEffect(() => {
    getUsers(state.user_page, state.user_limit);
    receiveAccountsData(state.account_page, state.account_limit)(dispatch).then(res=> {
      if (res && res.objects) setCompanyList([...res.objects]);
    });
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);
  const [cancelModal, setCancelModal] = useState('-1');
  const closeModal = () => {
        setShowModal(false);
  };
  const closeCancelModal = () => {
    setCancelModal('-1');
  };
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const getName = () => {
    const tempArr = users.filter(user => user.id == cancelModal);
    if (tempArr.length > 0)
      return tempArr[0].name;
    return '';
  }
  const getUsers = (page, rows) => {
    getUsersData(page, rows)(dispatch).then((res) => {
      if (res && res.objects) setUsers([...res.objects])
      if (res && res.total) setTotalPage(res.total)
    });
  }

  return !selectedUser ? (
    <SettingsWrapper>
      <Header title={'Settings'} subItem={ {
          'btngroup': [{name: 'Global settings for all clients',active: true}, {name:'Roles & Permission'}, {name:'Users'}],
          'subTitle': '',
        } } onPrevMain={(name)=>{updateTag(name)}} tag={tag} />
      <SettingsBodyWrapper>
        <UsersWrapper className='container-fluid'>
          <div className="row flex-nowrap">
              <BodyWrapper>
                <div className="body-card">
                  <div className="wrapper-header">
                      <div className="header-title">
                          Users
                      </div>         
                      <div className="header-btns">
                          <Button title="Add Users" onClickBtn={()=>{setShowModal(true);}}/>
                      </div>       
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Role</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody> 
                      {users.map((user,index) => (
                        <tr key={'account-' + index} onClick={()=> {
                          localStorage.setItem('account_id', user.account_id);
                          localStorage.setItem('user_id', user.id);
                          window.location.href="/client";
                        }}>
                          <td className="account-company">
                            <h3>{user.name}</h3>
                          </td>
                          <td>{companyList.find((e) => e.id === user.account_id) !== undefined ? companyList.find((e) => e.id === user.account_id).name : ''}</td>
                          <td>{user.roles.map((sub, key1)=>(
                            <span key={key1}>{sub}</span>
                          ))}</td>
                          <td>{user.email}</td>
                          <td>
                            <Badge title={'active'}/>
                          </td>
                          <td className="account-action">
                            <img src={square1} alt="square" className={'trash'} onClick={(e)=> {
                              e.stopPropagation(); setCancelModal(user.id);
                            }}/>
                            <img src={pen1} alt="pen" onClick={(e)=> {
                              e.stopPropagation(); setSelectedUser({...user});
                            }}/> 
                          </td>
                        </tr>
                      ))}
                      {users.length == 0 && (
                        <tr><td className="table-empty" colSpan="6">No users yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                  {users && users.length > 0 && <div className="table-pagination">
                    <Pagination pos={currentPage} total={totalPage} rows={state.user_limit} onPageChange={(eVal)=> {
                        setCurrentPage(eVal)
                        getUsers(eVal, state.user_limit)
                    }}/>
                  </div>}
                  {toast != -1 && (<SaveToast closeToast={()=>{setToast(-1)}} toast={toast} pageType={'table'} />)}
                </div>
                {showModal && (<UserModal closeModal={closeModal} companyList={companyList} saveModal={(obj)=>{
                        addUserData(obj)(dispatch).then(res => {
                          closeModal();
                          setToast(1);
                          getUsers();
                        }).catch(err => {
                          setToast(2)
                        });
                  }}/>)}
                {showModal && <div className="modal-backdrop show" onClick={closeModal}></div>}
                {cancelModal != '-1' && (<CancelModal closeModal={closeCancelModal} name={getName()} saveModal={()=>{
                    deleteUserData(cancelModal)(dispatch).then(res => {
                      getUsers();
                      closeCancelModal();
                      setToast(1);
                    }).catch(err => {
                      setToast(2)
                    });
                }}/>)}
                {cancelModal!= '-1'  && <div className="modal-backdrop show" onClick={closeCancelModal}></div>}
              </BodyWrapper>
          </div>
        </UsersWrapper>
      </SettingsBodyWrapper>
    </SettingsWrapper>) : <EditUser propUser={selectedUser} companyList={companyList} updatedFunc = {() => {
    setSelectedUser(null);
    getUsers(1, state.user_limit);
  }}/>
}
const UsersWrapper = styled.div`
`
const BodyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    display: flex;
    width: 100%;
    justify-content: space-between;
    p {
        color: var(--gray-600, #475467);
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
        margin-bottom: 0px;
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
  .body-card {
    display: flex;
    cursor: pointer;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    background:  #FFF;
    border-radius: 16px;
    margin: 20px;
    table {
      border-collapse: collapse;
      border-radius: 1em;
      overflow: hidden;
      width: 100%;
      padding: 12px;
      color: var(--gray-600, #475467);
      font-family: Figtree;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px; /* 150% */
      thead {
        background: #F9FAFB;
        tr{
          th{
            padding: 12px 24px;
          }
        } 
      }
      tbody {
        tr {
          border-bottom: 1px solid var(--gray-200, #EAECF0);
          td {
            padding: 16px 24px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: #475467;
            h3 {
              color: var(--gray-900, #101828);
              font-family: Figtree;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px; 
              margin: 0px;
            } 
            p {
              color: var(--gray-600, #475467);
              font-family: Figtree;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px; /* 142.857% */
            }
        }
        .account-action, .account-badges{
            display: flex;
            img.trash {
              height: 20px!important;
              margin-top: auto;
              margin-bottom: auto;
            }
          }
        }
      }
      margin-bottom: 0px;
    }
  }
  .filter-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 18px 20px;
    .filter-btn {
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid var(--gray-300, #D0D5DD);
      background: var(--base-white, #FFF);
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      img {
        width: 20px;
        margin-right: 8px;
      }
    }
    color: var(--gray-700, #344054);
    font-family: Figtree;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
    input {
      border-radius: 8px;
      padding: 10px 14px;
      border: 1px solid var(--gray-300, #D0D5DD);
      background: var(--base-white, #FFF);
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    }
  }
  td.table-empty {
    padding: 16px 24px;
    color: rgba(71, 84, 103, 0.50);
    font-family: Figtree;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    margin: 0px;
  }
  .table-pagination {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 24px;
    .filter-btn {
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid var(--gray-300, #D0D5DD);
        background: var(--base-white, #FFF);
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      img {
        width: 20px;
      }
      color: var(--gray-700, #344054);
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 142.857% */
     }
    }
    ul.pagination {
      margin-bottom: 0px;
      li.page-item a {
        border: 0px;
        color: var(--gray-800, #1D2939);
        text-align: center;
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
      }
      li.page-item.active a {
        border-radius: 8px;
        background: var(--gray-50, #F9FAFB);
      }
    }
  }
  .modal.fade {
    background:none;
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
`
const SettingsWrapper = styled.div`
  .bg-sidebar {
    background-color: #0A5987;
  }
  .col.body {
    background: #F2F4F7;
    overflow: auto;
    position: relative;
    height: 100vh;
    max-width: 1096px;
  }
`
const SettingsBodyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .body-card {
    display: flex;
    cursor: pointer;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    background:  #FFF;
    border-radius: 16px;
    margin: 20px;
    table {
      border-collapse: collapse;
      border-radius: 1em;
      overflow: hidden;
      width: 100%;
      padding: 12px;
      color: var(--gray-600, #475467);
      font-family: Figtree;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px; /* 150% */
      thead {
        background: #F9FAFB;
        tr {
          th {
            padding: 12px 24px;
          }
        } 
      }
      tbody {
        tr {
          border-bottom: 1px solid var(--gray-200, #EAECF0);
          td {
            padding: 16px 24px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: #475467;
            h3 {
              color: var(--gray-900, #101828);
              font-family: Figtree;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px; 
              margin: 0px;
            } 
            p {
              color: var(--gray-600, #475467);
              font-family: Figtree;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px; /* 142.857% */
            }
            .badge {
              border: 1px solid #CAEBF9;
              padding: 2px 10px;
              background: #E7F7FF;
              border-radius: 16px;
              color: #007AAB;
              text-align: center;
              font-family: Figtree;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: 20px; /* 142.857% */
              margin-right: 5px;
              margin-bottom: 2px;
            }
          }
          .account-action {
            display: flex;
          }
        }
      }
      margin-bottom: 0px;
    }
  }
  .filter-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 18px 20px;
    .filter-btn {
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid var(--gray-300, #D0D5DD);
      background: var(--base-white, #FFF);
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      img {
        width: 20px;
        margin-right: 8px;
      }
    }
    color: var(--gray-700, #344054);
    font-family: Figtree;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
    input {
      border-radius: 8px;
      padding: 10px 14px;
      border: 1px solid var(--gray-300, #D0D5DD);
      background: var(--base-white, #FFF);
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    }
  }
  .table-pagination {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 24px;
    .filter-btn {
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid var(--gray-300, #D0D5DD);
      background: var(--base-white, #FFF);
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      img {
        width: 20px;
      }
      color: var(--gray-700, #344054);
      font-family: Figtree;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 142.857% */
    }
    ul.pagination {
      margin-bottom: 0px;
      li.page-item a{
        border: 0px;
        color: var(--gray-800, #1D2939);
        text-align: center;
        font-family: Figtree;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
      }
      li.page-item.active a{
        border-radius: 8px;
        background: var(--gray-50, #F9FAFB);
      }
    }
  }
  .modal.fade {
    background:none;
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
`