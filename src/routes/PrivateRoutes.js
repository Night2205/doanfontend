import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
const PrivateRoutes = (props) => {
    let history = useHistory();

    useEffect(() => {
        let session = sessionStorage.getItem('account');//check xem người dùng đã đăng nhập vào hay chưa, account lấy trong F12/Application/SessionStogare
        if (!session) {//nếu không có thì sẽ đẩy về trang login
            history.push("/login");
            window.location.reload();
        }
        if (session) {
            //check role
        }

    }, []);

    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    )
}

export default PrivateRoutes;