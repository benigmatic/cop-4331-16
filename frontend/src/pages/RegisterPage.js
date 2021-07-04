import React from 'react';
import Register from '../components/Register';
const RegisterPage = () =>
{
    function goBack(){
        window.location.href = '/';
    }
    return(
      <div>
        <button id="back" onClick={goBack} >Go Back</button>
        <Register />
        
      </div>
    );
};

export default RegisterPage;