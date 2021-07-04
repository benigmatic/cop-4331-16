import React, { useState } from 'react';
import axios from 'axios';
function  Verify()
{
  
   
  
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var code;
    
  
     
    const [message,setMessage] = useState('');
 

    const ValidateCode = async event => 
    {
        event.preventDefault();
 
       alert(code.value);


       window.location.href = '/login';
   
    }
    

    return(
      <div id="loginDiv">
        <span id="inner-title">Check you email for a code.</span><br />
        <input type="text" id="code" placeholder="code" ref={(c) => code = c}  /><br />
        
        <input type="submit" id="loginButton" class="buttons" value = "Submit"
          onClick={ValidateCode} />
        <span id="loginResult">{message}</span>
        
     </div>
    );
};



export default Verify;
