import './App.scss';
import Nav from './components/Navigation/Nav';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

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
      {/* //check account không rỗng và check được account đã được kết nối */}
      <div className='app-header'>
        <Nav />
      </div>
      <div className='app-container'>
        <AppRoutes />
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
