import React, { useState } from 'react';
import axios from 'axios';
function Register()
{
    // autoincrementation in DB
   

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var companyName;
    var firstName;
    var lastName;
    var loginName;
    var email;
    var passwordRegister;
    var passwordCheck;
    var phone;
  
     
    const [message,setMessage] = useState('');
 

    const doRegister = async event => 
    {
        event.preventDefault();

      // Password check
      if(passwordRegister.value===passwordCheck.value){
        //setMessage("Passwords don't match");
        
       var obj = {FirstName:firstName.value,LastName:lastName.value,Email:email.value,Login:loginName.value, Password:passwordRegister.value, Phone: phone.value, CompanyName: companyName.value};
      alert(obj);
       var js = JSON.stringify(obj);
       alert(js);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/register'),	
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
            var retTok = res.jwtToken;
    
            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                
                setMessage('User was added');
              
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    } else {
        setMessage("Passwords (" +passwordRegister.value +" "+ passwordCheck.value+")don't match");
    }
 
    }

    return(
      <div id="loginDiv">
        <span id="inner-title">Register</span><br />
        <input type="text" id="companyName" placeholder="CompName" ref={(c) => companyName = c}  /><br />
        <input type="text" id="firstName" placeholder="Firstname" ref={(c) => firstName = c}  /><br />
        <input type="text" id="lastName" placeholder="Lastname" ref={(c) => lastName = c}  /><br />
        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br />
        <input type="text" id="email" placeholder="Email" ref={(c) => email = c}  /><br />
        <input type="text" id="phone" placeholder="Phone" ref={(c) => phone = c}  /><br />
        <input type="password" id="passwordRegister" placeholder="Password" ref={(c) => passwordRegister = c} /><br />
        <input type="password" id="passwordCheck" placeholder="Password" ref={(c) => passwordCheck = c} /><br />
        <input type="submit" id="loginButton" className="buttons" value = "Do It"
          onClick={doRegister} />
        <span id="loginResult">{message}</span>
     </div>
    );
};

// Autoincrement for MongoDB

export default Register;
