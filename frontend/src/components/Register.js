import React, { useState } from 'react';
import axios from 'axios';
import md5 from './md5.js';
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
  var Code=0;
  
    const [message,setMessage] = useState('');
 const doVerify = async event => {
    var hash = md5( passwordRegister );
//    const Code = Math.floor(Math.random()*90000+10000);
    
    var sendCode = JSON.stringify({ Email:email.value});         
   
    var config = 
      {
        method: 'post',
        url: bp.buildPath('api/verifyEmail'),	
        headers: 
          {
            'Content-Type': 'application/json'
          },
        data: sendCode
     };

    axios(config)
        .then(function (response) 
    {
        var res = response.data;
        var retTok = res.jwtToken;

        if( res.error.length > 0 )
        {
            setMessage( " Error:" + res.error );
        }
        else
        {
            
            Code = res.code;
            alert("Code: "+ Code);
            try {
            var obj = {FirstName:firstName.value,LastName:lastName.value,Email:email.value,Login:loginName.value, Password:hash, Phone: phone.value, CompanyName: companyName.value, Code:Code};
            var js = JSON.stringify(obj);
            localStorage.setItem('email_data',js);
            }
            catch (error){
                setMessage(error);
            }
            setMessage('User was added');
            window.location.href = '/verifyEmail';

          
        }
    })
    .catch (function (error){
        console.log(error);
    }) 
   
}

    const doRegister = async event => 
    {
        event.preventDefault();
  var flag =0 
      // Password check
      if(passwordRegister.value===passwordCheck.value){
       
        // TODO: Search for email and login  that are already in the database
        var checkObj = {Email:email.value, Login:loginName.value};
        var checkjs = JSON.stringify(checkObj);
        var configCheck = 
        {
            method: 'post',
            url: bp.buildPath('api/checkexistance'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: checkjs
        };
      //  alert("into fist axios");
       await  axios(configCheck)
            .then(function (response) 
        {
            var res = response.data;
            var retTok = res.jwtToken;
            if( res.error.length > 0 )
            {
                flag=1;
                alert("res.error");
                setMessage( "Error:" + res.error );
                
            } 
        })
         .catch (function (error)
         {
            console.log(error);
         })
      
        //Generated 5-digit code 
        if (flag === 0 ){
         const respone =  await  doVerify();
    } 
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
