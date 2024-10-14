import axios from 'axios';
const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:3001/api/v1/register', {
        email, phone, username, password
    })
}

const loginUser = (valueLogin, password) => {//tạo link login
    return axios.post('http://localhost:3001/api/v1/login', {
        valueLogin, password
    })
}

export {
    registerNewUser, loginUser
}