import React from 'react';
import Reset from '../components/Reset';
const ResetPage = () =>
{
    function goBack(){
        window.location.href = '/';
    }
    return(
      <div>
        <button id="back" onClick={goBack} >Go Back</button>
        <Reset />
        
      </div>
    );
};

export default ResetPage;