import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { fetchGroup, createNewUser } from '../../services/userService';
import { toast } from "react-toastify";
import _ from "lodash";
import _default from 'react-bootstrap/Modal';
const ModalUser = (props) => {

    const { action, dataModalUser } = props;//giản lược hoá cú pháp của obj destructuring

    const [userGroups, setUserGroups] = useState([]);

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        group: '',
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        group: true,
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setvalidInputs] = useState(validInputsDefault);


    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.data.EM);
        }
    }

    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            // console.log("check data update:  ", props.dataModalUser)
            // console.log("check data org:  ", dataModalUser)
            // console.log("check data set:  ", { ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })

            //lấy ra id của group
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });
        }

    }, [dataModalUser]);
    //check lỗi khi bấm edit xong thì tạo mới user không được
    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })

            }

        }
    }, [action])

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);//cloneDeep co gia tri bao nhieu se copy bay nhieu
        _userData[name] = value;
        setUserData(_userData);

    }

    const checkValidateInputs = () => {
        //create user
        setvalidInputs(validInputsDefault);

        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                //cập nhật biên array input
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setvalidInputs(_validInputs);
                //hiển thị thông báo
                toast.error(`Không được để ${arr[i]} trống`);
                check = false;
                break;
            }
        }
        if (check) {
            if (!validateEmail(userData.email)) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs.email = false;
                setvalidInputs(_validInputs);

                toast.error("Email không hợp lệ");
                check = false;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {
        let check = checkValidateInputs()//check hàm validateinput
        if (check === true) {
            let res = await createNewUser({ ...userData, groupId: userData['group'] });
            // console.log("check res:", res);
            if (res.data && res.data.EC === 0) {
                props.onHide();
                toast.success("tạo người dùng thành công");
                props.onUserAdded();
                setUserData({ ...defaultUserData, group: userGroups[0].id })

            } if (res.data && res.data.EC !== 0) {//hiện ô input đỏ khi mà nhập sai hoặc nhập thông tin đã có sẵn
                toast.error(res.data.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.data.DT] = false;
                setvalidInputs(_validInputs);
            }
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleCloseModalUser = () => {

        props.onHide();
        setUserData(defaultUserData);
        setvalidInputs(validInputsDefault);

    }

    return (
        <>
            <Modal size="lg" show={props.show} onHide={() => handleCloseModalUser()} className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? 'Tạo người dùng mới' : 'Chỉnh sửa người dùng'}</span>
                        {/* hàm điều kiện khi sử dụng chung form validate nếu action= create thì Modal add sẽ hiện và ngược lại modal edit sẽ
                        xuất hiện */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email (<span className='red'>*</span>):  </label>
                            <input disabled={action === 'CREATE' ? false : true}
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type="email" value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, "email")}
                                onBlur={(event) => {
                                    const isValidEmail = validateEmail(event.target.value);
                                    setvalidInputs(prev => ({ ...prev, email: isValidEmail }));
                                }}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone Number (<span className='red'>*</span>): </label>
                            <input disabled={action === 'CREATE' ? false : true}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type="text" value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username : </label>
                            <input className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
                                type="text" value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, "username")}
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            {
                                action === 'CREATE'
                                &&
                                <>

                                    <label>Password (<span className='red'>*</span>): </label>
                                    <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                        type="password" value={userData.password}
                                        onChange={(event) => handleOnChangeInput(event.target.value, "password")}
                                    />
                                </>
                            }
                            {/* sử dụng hàm trên để ẩn ô input không cần thiết */}
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group (<span className='red'>*</span>): </label>
                            <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, "group")}
                                value={userData.group}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })


                                }


                            </select>
                        </div>
                        {/* <div className='col-12 col-sm-6 form-group'>
                            <label>Gender (<span className='red'>*</span>): </label>
                            <select className='form-select'>
                                <option defaultValue="Male">Male</option>
                                <option defaultValue="Female">Female</option>
                            </select>
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>Đóng</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Tạo mới' : 'Cập nhật'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;