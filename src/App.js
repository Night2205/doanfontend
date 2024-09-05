import './App.scss';
import Login from './components/Login/login';
import Nav from './components/Navigation/Nav';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className='app-container'>
        <Nav />
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">
            404 Not found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
