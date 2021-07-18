import React from 'react';
import VerifyEmail from '../components/VerifyEmail';
const VerifyEmailPage = () =>
{
    function goBack(){
        window.location.href = '/';
    }
    return(
      <div>
        <button id="back" onClick={goBack} >Go Back</button>
        <VerifyEmail />
        
      </div>
    );
};

export default VerifyEmailPage;