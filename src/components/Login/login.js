// import { button } from 'bootstrap';
import react, { useState, useRef, useEffect } from 'react';
import './login.scss';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';

const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");//state hoá các biến 
    const [password, setPassword] = useState("");

    // Sử dụng useRef để giữ tham chiếu đến ô password
    const passwordInputRef = useRef(null);

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
            toast.error("Please enter your email or your phone number")
            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
            toast.error("Please enter your password")
            return;
        }

        let response = await loginUser(valueLogin, password);

        if (response && response.data && +response.data.EC === 0) {
            //thành công
            let data = {//check trong f12 / application
                isAuthenticated: true,
                token: 'fake token'
            }

            sessionStorage.setItem('account', JSON.stringify(data));//quản lý một phiên đăng nhập của người dùng

            history.push('/users');
            window.location.reload();
        } if (response && response.data && +response.data.EC !== 0) {
            //thất bại
            toast.error(response.data.EM)
        }

    }

    const handldeForgotPassWord = () => {
        alert("Vui lòng liên hệ với gmail nguyennhathuy176@gmail.com hoặc huukhen@gmail.com để được cấp lại tài khoản")
    }
    const handldeCreateNewAccount = () => {
        history.push("/register");
    }
    const handldePressEnter = (event) => {//sử dụng phím Enter để đăng nhập thay vì phải bấm nút
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            passwordInputRef.current.focus(); // Chuyển focus đến ô password
        }
    }

    useEffect(() => {
        let session = sessionStorage.getItem('account');//check xem người dùng đã đăng nhập vào hay chưa, account lấy trong F12/Application/SessionStogare
        if (session) {//nếu không có thì sẽ đẩy về trang login
            history.push("/");
            window.location.reload();
        }
    }, [])
    return (
        <div className="login-container">
            <div className="container">
                <div className="row">
                    <div className="content-left col-7 d-none d-sm-block">
                        <div className='logo'>
                            <img src="/logo_IUH.png" alt="Logo IUH" />
                        </div>
                        <div className='detail'>
                            Innovation-Unity-Humanity
                        </div>
                    </div>
                    <div className='right-container col-12 col-sm-5'>
                        <div className="content-right  d-flex flex-column gap-3 py-3">
                            <div className='logo d-sm-none'>
                                <img src="/logo_IUH.png" alt="Logo IUH" />
                            </div>
                            <input type='text' className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'} placeholder='Email or phone number' value={valueLogin}
                                onChange={(event) => { setValueLogin(event.target.value) }}
                                onKeyPress={(event) => handleKeyDown(event)}
                            />
                            <input type='password' className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'} placeholder='Password' value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                onKeyPress={(event) => handldePressEnter(event)}
                                ref={passwordInputRef}
                            />
                            <button className='btn btn-primary btn-lg' onClick={() => handleLogin()}>login</button>
                            <span className='text-center'>
                                {/* <a href='#' className='forgot-password' onClick={() => handldeForgotPassWord()}>Forgot your password?</a> */}
                                <div className='forgot-password' onClick={() => handldeForgotPassWord()}>
                                    Forgot your password?
                                </div>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btn btn-success' onClick={() => handldeCreateNewAccount()}>
                                    Create new account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Login;