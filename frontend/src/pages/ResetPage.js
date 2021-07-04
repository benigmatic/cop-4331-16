import React from 'react';
import Reset from '../components/Reset';
const VerifyPage = () =>
{
    function goBack(){
        window.location.href = '/';
    }
    return(
      <div>
        <button id="back" onClick={goBack} >Go Back</button>
        <Verify />
        
      </div>
    );
};

export default Reset;