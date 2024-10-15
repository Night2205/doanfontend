import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Users = (props) => {
    let history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem('account');//check xem người dùng đã đăng nhập vào hay chưa, account lấy trong F12/Application/SessionStogare
        if (!session) {//nếu không có thì sẽ đẩy về trang login
            history.push("/login");
        }
    }, [])
    return (
        <div>
            users component
        </div>
    )
}

export default Users;