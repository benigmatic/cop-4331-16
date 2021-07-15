import React, { useState } from 'react';
import axios from 'axios';
function Reset()
{
  
   
  
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var password;
    var newpassword;
    
  
     
    const [message,setMessage] = useState('');
 

    const ResetPassword = async event => 
    {
        event.preventDefault();
      
        // retrieve email
      var tok = storage.retrieveTokenPassword();
    var storedCode = JSON.parse(tok);
    var email = storedCode.email;
        
        // send email with password to the /api/reset
        if(password.value===newpassword.value){
            var obj = {Email:email,Password:password.value};
       // alert(obj);
       var js = JSON.stringify(obj);
         alert(js);
       //Sends js to api
     var config = 
     {
         method: 'post',
         url: bp.buildPath('api/reset'),	
         headers: 
         {
             'Content-Type': 'application/json'
         },
         data: js
     };
 
     axios(config)
         .then(function (response) 
     {
         var res = response.data;
        
 
         if( res.error.length > 0 )
         {
             setMessage( "Error:" + res.error );
         }
         else
         {
             setMessage('Password was successfully updated');
           
         }
     })
     .catch(function (error) 
     {
         console.log(error);
     });
        }
        else {
            setMessage("Passwords don't match");
        }
    }
 

    return(
      <div id="loginDiv">
        <span id="inner-title">Reset your password</span><br />
        <input type="text" id="email" placeholder="password" ref={(c) => password = c}  /><br />
        <input type="text" id="email" placeholder="confirm password" ref={(c) => newpassword = c}  /><br />
        
        <input type="submit" id="loginButton" class="buttons" value = "Reset"
          onClick={ResetPassword} />
        <span id="loginResult">{message}</span>
        
     </div>
    );
};



export default Reset;