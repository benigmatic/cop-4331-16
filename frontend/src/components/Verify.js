import React, { useState } from 'react';
import axios from 'axios';
function  Verify()
{
  
  var storage = require('../tokenStorage.js');
  const jwt = require("jsonwebtoken");
  
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var code;
    
  
     
    const [message,setMessage] = useState('');
 

    const ValidateCode = async event => 
    {
        event.preventDefault();
 
        var tok = storage.retrieveTokenPassword();
        
        alert(tok);
        var storedCode = JSON.parse(tok);
        // received the code from the local storage
        var verifyCode = storedCode.code;
       
         if (verifyCode != code.value){
          alert ("Code is not correct. Please, try again");
          // alert (code.value+ "vs. "+ verifyCode);
        
         } else {
          // alert("Codes match");
          window.location.href = '/reset';
          }
   
    }
    

    return(
      <div id="loginDiv">
        <span id="inner-title">Check you email for a code.</span><br />
        <input type="text" id="code" placeholder="code" ref={(c) => code = c}  /><br />
        
        <input type="submit" id="loginButton" className="buttons" value = "Submit"
          onClick={ValidateCode} />
        <span id="loginResult">{message}</span>
        
     </div>
    );
};



export default Verify;
