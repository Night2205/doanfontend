import {
    Switch,
    Route
} from "react-router-dom";
import Login from '../components/Login/login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from "./PrivateRoutes";

/**
 * ['/users/show','/users/update]
 * 
 * 
 * 
 * 
 */


const AppRoutes = (props) => {
    const Project = () => {
        return (
            <span>Project</span>
        )
    }
    return (
        <>
            <Switch>

                <PrivateRoutes path="/users" component={Users} /> {/*sử dụng private routes để phân quyền*/}
                <PrivateRoutes path="/projects" component={Project} /> {/*sử dụng private routes để phân quyền*/}


                <Route path="/" exact>
                    home
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="*">
                    404 Not found
                </Route>
            </Switch>

        </>
    )
}

export default AppRoutes;