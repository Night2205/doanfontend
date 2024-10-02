import { button } from 'bootstrap';
import './login.scss'
const Login = (props) => {
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
                                <a className='forgot-password' href='#'>Forgot your password?</a>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btn btn-success'>Create new account</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;