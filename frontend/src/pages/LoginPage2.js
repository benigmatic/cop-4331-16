import React from 'react';
import Login from '../components/Login';
const LoginPage2 = () =>
{
    function goBack(){
        window.location.href = '/';
    }

    function forgot(){
       
        window.location.href = '/forgotpassword';
    }
    return(
      <div>
        <button id="back" onClick={goBack} >Go Back</button>
        <Login />
        <button id="forgot" onClick={forgot} >Forgot Password</button>
      </div>
    );
};

export default LoginPage2;