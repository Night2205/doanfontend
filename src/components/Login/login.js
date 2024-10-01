import { button } from 'bootstrap';
import './login.scss'
const Login = (props) => {
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row">
                    <div className="content-left col-7 d-none d-sm-block">
                        <div className='brand'>
                            IUH
                        </div>
                        <div className='detail'>
                            Innovation-Unity-Humanity
                        </div>
                    </div>
                    <div className="content-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <input type='text' className='form-control' placeholder='Email or phone number' />
                        <input type='password' className='form-control' placeholder='Password' />
                        <button className='btn btn-primary btn-lg'>login</button>
                        <span className='text-center'>Forgot your password?</span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Creat e new account</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;