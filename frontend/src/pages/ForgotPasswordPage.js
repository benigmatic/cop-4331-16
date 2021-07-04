import React from 'react';
import ForgotPassword from '../components/ForgotPassword';
const ForgotPasswordPage = () =>
{
    function goBack(){
        window.location.href = '/';
    }
    return(
      <div>
        <button id="back" onClick={goBack} >Go Back</button>
        <ForgotPassword />
        
      </div>
    );
};

export default ForgotPasswordPage;