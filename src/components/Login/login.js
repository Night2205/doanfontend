// import { button } from 'bootstrap';
import './login.scss';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Login = (props) => {
    let history = useHistory();
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
                            <input type='text' className='form-control' placeholder='Email or phone number' />
                            <input type='password' className='form-control' placeholder='Password' />
                            <button className='btn btn-primary btn-lg'>login</button>
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