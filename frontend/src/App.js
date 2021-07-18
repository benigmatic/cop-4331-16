import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import LoginPage2 from './pages/LoginPage2';
import Register from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import Verify from './pages/VerifyPage';
import VerifyEmail from './pages/VerifyEmailPage';
import Reset from './pages/ResetPage';
function App() {
  return (
    <Router >
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Route path="/cards" exact>
        <CardPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage2 />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/forgotpassword" exact>
        <ForgotPassword />
      </Route>
      <Route path="/verify" exact>
        <Verify />
      </Route>
      <Route path="/verifyEmail" exact>
        <VerifyEmail />
      </Route>
      <Route path="/reset" exact>
        <Reset />
      </Route>
      <Redirect to="/" />
    </Switch>  
  </Router>
  );
}

export default App;

