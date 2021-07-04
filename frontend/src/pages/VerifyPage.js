import React from 'react';
import Verify from '../components/Verify';
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

export default VerifyPage;