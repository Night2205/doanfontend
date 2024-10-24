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

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:3001/api/v1/user/read?page=${page}&limit=${limit}`, {//template string
    })
}

const deleteUser = (user) => {
    return axios.delete("http://localhost:3001/api/v1/user/delete", { data: { id: user.id } })
}

const fetchGroup = () => {
    return axios.get(`http://localhost:3001/api/v1/group/read`, {
    })
}

const createNewUser = (userData) => {
    return axios.post("http://localhost:3001/api/v1/user/create", { ...userData })
}

export {
    registerNewUser, loginUser, fetchAllUsers, deleteUser, fetchGroup, createNewUser
}