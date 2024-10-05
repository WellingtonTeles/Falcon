import React, { useEffect, useMemo, useState }  from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import logo from './../assets/images/logo1.svg';
import logout from './../assets/images/logout2.png';
import { useDispatch, useSelector } from "react-redux";
import useToken from "../pages/auth/useToken";
import { getUsersData } from "../action/api";
import AvatarA from '../../src/assets/images/panda@3x.png';

export default function Sidebar(props) {
    const {page} = props;
    const {userId} = useToken();
    const [userInfo, setUserInfo] = useState({name: "", email: ""});
    const dispatch = useDispatch();
    const state = useSelector(state => state.apiReducer);
    useEffect(() => {
        getUsersData()(dispatch).then(res => {
            if (res && res.objects) {
                const _user = res.objects.find(o  => o.id  === userId);
                !!_user && setUserInfo({
                    name: _user.name,
                    email: _user.email
                });
            }
        })
    },  [])
    
    return (
    <SidebarWrapper className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100 pt-0">
        <div className="sidebar-header">
            <a href="/dashboard" className="logo-img d-flex align-items-center  mb-md-0 me-md-auto text-white text-decoration-none">
                <img src={logo} alt="LOGO" />
            </a>
            <div className='sidebar-header-title'>
                <h3 className="p-0 m-0 text-center">MISSON CONTROL</h3>
            </div>
        </div>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start px-3" id="menu">
            {/* <li className="nav-item">
                <a href="/dashboard" className={`nav-link align-middle ${page == 'dashboard' ? 'p-active': ''}`}>
                    <i className="fa fa-list-alt" aria-hidden="true"></i>
                    <span className="d-none d-sm-inline">Dashboard</span>
                </a>
            </li> */}
            <li className="nav-item">
                <Link to="/accounts" className={`nav-link align-middle ${page == 'accounts' ? 'p-active': ''}`}>
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <span className="d-none d-sm-inline">Accounts</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/settings" className={`nav-link align-middle ${page == 'settings' ? 'p-active': ''}`}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                    <span className="d-none d-sm-inline">Settings</span>
                </Link>
            </li>
        </ul>
        <hr/>
        <div className="pb-4 sidebar-bottom">
            <div className="d-flex align-items-center text-white">
                <div className="d-flex align-items-center align-self-center">
                    <img src={AvatarA} alt="Avartar" width="40" height="40" className="rounded-circle"/>
                </div>
                <p className="d-none d-sm-inline user-login">{userInfo.name} <br/>
                    <span>{userInfo.email}</span>
                </p>
            </div>
            <div className="d-flex align-items-center text-white text-decoration-none btn-out" onClick={()=> {
                localStorage.clear();
                window.location.href = '/';
            }}>
                <img src={logout} className="out" />
            </div>
        </div>
    </SidebarWrapper>)
}
const SidebarWrapper = styled.div`
    width: 100%;
    width: 280px;
    hr {

    }
    .sidebar-header {
        position: relative;
        width: 100%;
        a.logo-img{
            justify-content: center;
            padding-top: 24px;
            padding-bottom: 24px;
            img {
                height: 70px;
            }
        }
        a.return-link {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-shrink: 0;
            align-self: stretch;
            background: #007AAB;
            padding: 4px 16px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            color: #DAF1FA;
            img {
                width: 22px;
                height: 22px;
            }
            span {
                font-family: Figtree;
                font-size: 12px;
                font-style: normal;
                font-weight: 600;
                line-height: 18px; /* 150% */
            }
        }
        .sidebar-header-title {
            background: #007AAB;
            padding: 4px 16px;

            h3 {
                cursor: normal;
                color: #DAF1FA;
                font-family: Figtree;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 24px; /* 150% */
                letter-spacing: 1.12px;
            }
            margin-bottom: 24px;
        }
    }
    ul {
        width: 100%;
        li {
            width: 100%;
            a {
                padding: 12px;
                color: white;
                font-family: Figtree;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 20px; /* 125% */
                span {
                    margin-left: 10px;  
                }
                &:hover, &:active, &:focus, &.p-active {
                    border-radius: 6px;
                    background: #007AAB;
                    color: white;
                }
            }
            margin-bottom: 8px;
        }
    }
    .sidebar-bottom {
        display: flex;
        border-top: 1px solid var(--primary-700, #007AAB);
        justify-content: space-between;
        width: 100%;
        padding: 5px 25px;
        padding-top: 20px;
        div {
            img {
                width: 40px;
                height: 40px;
            }
            p.user-login {
                color: var(--Base-White, #FFF);
                font-family: Figtree;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 20px; /* 142.857% */
                margin: 0px;
                margin-left: 12px;
                margin-right: -12px;
                span {
                    color: var(--Primary-200, #CAEBF9);
                    font-family: Inter;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 20px; /* 142.857% */
                }
            }
            img.out {
                width: 32px;
                height: 32px;
            }
        }
        div.avatar {
            border-radius: 20px;
            width: 30px;
            height: 30px;
            background: gray;
        }
        div.btn-out {
            &:hover {
                background: #fff5;
                border-radius: 5px;
                cursor: pointer;
                // border: solid 2px #f00;
                transition: background .5s;
            }
        }
        i {
            line-height: 40px;
        }
    }
`
