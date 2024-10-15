import './App.scss';
import Login from './components/Login/login';
import Nav from './components/Navigation/Nav';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import Users from './components/ManageUsers/Users';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useEffect, useState } from 'react';
import _ from "lodash";



function App() {

  const [account, setAccount] = useState({});//ẩn hiện chức năng trên thanh Navigation

  useEffect(() => {

    let session = sessionStorage.getItem('account');//check xem người dùng đã đăng nhập vào hay chưa, account lấy trong F12/Application/SessionStogare
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <Router>
      <div className='app-container'>
        {
          account && !_.isEmpty(account) && account.isAuthenticated //check account không rỗng và check được account đã được kết nối
          && <Nav />
        }
        <Switch>
          <Route path="/news">
            news
          </Route>
          <Route path="/about">
            about
          </Route>
          <Route path="/contact">
            Contact
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="*">
            404 Not found
          </Route>
        </Switch>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      {/* Same as */}
    </Router>
  );
}

export default App;
