// import { button } from 'bootstrap';
import './register.scss';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { registerNewUser } from "../../services/userService";
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassWord, setConFirmPassWord] = useState("");
    const defaultValidInput = {//khai báo các biến input, check hop le hay khong
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    let history = useHistory();
    const handldeAlreadyHasAccount = () => {
        history.push("/login");
    }

    useEffect(() => {//test call duoc api hay chua
        // axios.get("http://localhost:3001/api/v1/test-api").then(data => {
        //     console.log(">>> Check data axios: ", data)
        // })



    }, []);

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);//setup cho cac bien deu hop le

        if (!email) {
            toast.error("Email Required");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });//được sử dụng để check khung input, nếu sai sẽ đổi màu(...)là object destrutering là copy giá trị của cái object này
            //lưu ý để trùng isvalid với tên khai báo ở trên
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            toast.error("Invalid Email");
            return false;
        }
        if (!phone) {
            toast.error("Phone Required");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!username) {
            toast.error("UserName Required");
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
            return false;
        }
        if (!password) {
            toast.error("Password Required");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassWord) {
            toast.error("Password is not same");
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }


        return true;
    }

    const handldeRegister = async () => {

        let check = isValidInputs();//kiem tra dieu kien

        if (check === true) {//neu hop le call len sever
            let response = await registerNewUser(email, phone, username, password)
            let serverData = response.data;
            if (+serverData.EC === 0) {//"+" convert chuỗi string về số nguyên 
                toast.success(serverData.EM);
                history.push("/login");
            } else {
                toast.error(serverData.EM);
            }
        }

    }

    const handleEmailValidation = (value) => {//check email khi 
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(value)) {
            setObjCheckInput(prevState => ({ ...prevState, isValidEmail: false }));
        } else {
            setObjCheckInput(prevState => ({ ...prevState, isValidEmail: true }));
        }
        setEmail(value); // Cập nhật giá trị email
    };

    const handlePhoneValidation = (value) => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
            setObjCheckInput(prevState => ({ ...prevState, isValidPhone: false }));
        } else {
            setObjCheckInput(prevState => ({ ...prevState, isValidPhone: true }));
        }
        setPhone(value); // Cập nhật giá trị phone
    };

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
                                <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email'
                                    value={email} onChange={(event) => setEmail(event.target.value)}//kiem tra dieu kien Email
                                    onBlur={(event) => handleEmailValidation(event.target.value)} // Kiểm tra khi rời khỏi
                                />
                            </div>
                            <div className='form-group'>
                                <label>Phone Number:</label>
                                <input type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone Number'
                                    value={phone} onChange={(event) => setPhone(event.target.value)}
                                    onBlur={(event) => handlePhoneValidation(event.target.value)} // Kiểm tra khi rời khỏi trường
                                />
                            </div>
                            <div className='form-group'>
                                <label>User Name:</label>
                                <input type='text' className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'} placeholder='Use Name'
                                    value={username} onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password'
                                    value={password} onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Re-Password:</label>
                                <input type='password' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Re-Password'
                                    value={confirmPassWord} onChange={(event) => setConFirmPassWord(event.target.value)}
                                />
                            </div>
                            <button className='btn btn-primary btn-lg' type="button" onClick={() => handldeRegister()}>Register</button>
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