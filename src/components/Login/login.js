// import { button } from 'bootstrap';
import react, { useState } from 'react';
import './login.scss';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");//state hoá các biến 
    const [password, setPassword] = useState("");

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

        await loginUser(valueLogin, password);

    }

    const handldeForgotPassWord = () => {
        alert("Vui lòng liên hệ với gmail nguyennhathuy176@gmail.com hoặc huukhen@gmail.com để được cấp lại tài khoản")
    }
    const handldeCreateNewAccount = () => {
        history.push("/register");
    }
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
                            />
                            <input type='password' className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'} placeholder='Password' value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
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