import React, { useState } from "react"
import styled from "styled-components"
import check from './../../assets/images/check.png';
import Button from "../../components/basics/button";

export default function RolePermission(props) {
  const setPermission = () => {

  }
  const [roles, setRoles] = useState([
    {role: 'View files/folders', admin: true, editor: true, representative: true},
    {role: 'Update files/folders', admin: true, editor: true, representative: false},
    {role: 'Create files/folders', admin: true, editor: true, representative: false},
    {role: 'Delete files/folders', admin: true, editor: false, representative: false},
    {role: 'View account', admin: true, editor: true, representative: true},
    {role: 'Update account', admin: true, editor: true, representative: false},
    {role: 'Create account', admin: true, editor: true, representative: false},
    {role: 'Delete account', admin: true, editor: false, representative: false},
    {role: 'View user', admin: true, editor: true, representative: true},
    {role: 'Update user', admin: true, editor: true, representative: false},
    {role: 'Create user', admin: true, editor: true, representative: false},
    {role: 'Delete user', admin: true, editor: false, representative: true},
    {role: 'View usage statistics', admin: true, editor: true, representative: true},
    {role: 'View analytics', admin: true, editor: true, representative: true},
  ])
  return (<RolePermissionWrapper className='container-fluid'>
    <div className="wrapper-header">
        <div className="header-title">
            Roles & Permission
            <p>Manage your roles and their account permissions here.</p>
        </div>         
        <div className="header-btns">
            <Button title={'Add role'} icon={'refresh'} outline/>
            <Button title={'Add permission'} icon={'save'}/>
        </div>       
    </div>
    <div className="wrapper-body">
       <table className="table table-striped">
        <thead>
            <tr>
                <th></th>
                <th>Admin</th>
                <th>Editor</th>
                <th>Represntative</th>
            </tr>
        </thead>
        <tbody>
            {roles.map((role,index) => (
                <tr key={'role-' + index}>
                    <td>{role.role}</td>
                    <td ><input id={'admin' + index} type="checkbox"  checked={role.admin} onChange={setPermission} /></td>
                    <td ><input id={'editor' + index} type="checkbox"  checked={role.editor} onChange={setPermission} /></td>
                    <td ><input id={'representative' + index} type="checkbox" checked={role.representative} onChange={setPermission} /></td>
                </tr>
            ))}
        </tbody>
       </table>
    </div>
  </RolePermissionWrapper>)
}
const RolePermissionWrapper = styled.div`
    background: #fff;
    border-radius: 20px;
    padding: 0px;
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
    }
    .wrapper-body {
        padding: 0px;
        table {
            thead {
                th {
                    color: var(--gray-600, #475467);
                    font-family: Figtree;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px; /* 142.857% */
                    padding: 12px 24px;
                }
            }
            tbody {
                tr td {
                    padding: 16px 24px;
                    color: var(--gray-900, #101828);
                    font-family: Figtree;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 20px; /* 142.857% */
                   
                }
                
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
    input:checked[type=checkbox] {
        border: 1px solid var(--primary-600, #1693C7);
        background: var(--primary-50, #E7F7FF);
        background-image: url(${check});
        background-size: contain;
    }
`