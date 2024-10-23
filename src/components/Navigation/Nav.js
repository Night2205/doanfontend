import React, { useEffect, useState } from "react";
import './Nav.scss';
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom";

const Nav = (props) => {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();
    useEffect(() => {
        let session = sessionStorage.getItem('account');//check xem người dùng đã đăng nhập vào hay chưa, account lấy trong F12/Application/SessionStogare
        if (location.pathname === '/login') {//nếu không có thì sẽ đẩy về trang login
            setIsShow(false)
        }

    }, []);
    return (

        <>
            {isShow === true &&
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>

    );
}

export default Nav;
