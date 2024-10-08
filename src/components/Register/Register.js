// import { button } from 'bootstrap';
import './register.scss';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassWord, setConFirmPassWord] = useState("");

    let history = useHistory();
    const handldeAlreadyHasAccount = () => {
        history.push("/login");
    }

    useEffect(() => {
        // axios.get("http://localhost:3001/api/test-api").then(data => {
        //     console.log(">>> Check data axios: ", data)
        // })
    }, []);

    const handldeRegister = () => {
        let userData = { email, phone, username, password };
        console.log("Check user data:", userData);
    }

    return (
        <div className="register-container">
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
                            <div className='form-group'>
                                <label>Email:</label>
                                <input type='text' className='form-control' placeholder='Email'
                                    value={email} onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Phone Number:</label>
                                <input type='text' className='form-control' placeholder='Phone Number'
                                    value={phone} onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>User Name:</label>
                                <input type='text' className='form-control' placeholder='Use Name'
                                    value={username} onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input type='password' className='form-control' placeholder='Re-Password'
                                    value={password} onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Re-Password:</label>
                                <input type='password' className='form-control' placeholder='Password'
                                    value={confirmPassWord} onChange={(event) => setConFirmPassWord(event.target.value)}
                                />
                            </div>
                            <button className='btn btn-primary btn-lg' onClick={() => handldeRegister()}>Register</button>
                            <hr />
                            <div className='text-center'>
                                <button className='btn btn-success' onClick={() => handldeAlreadyHasAccount()}>
                                    Already Has Account?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Register;