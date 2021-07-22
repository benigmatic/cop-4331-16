import React, { useState } from 'react';
import axios from 'axios';
function  VerifyEmail()
{
  
  var storage = require('../tokenStorage.js');
  const jwt = require("jsonwebtoken");
  
    var bp = require('./Path.js');
    

    var Code;
    
  
     
    const [message,setMessage] = useState('');
 

    const verifyEmail = async event => 
    {
        event.preventDefault();
 
        var tok = storage.retrieveTokenEmail();
        
        var regStr = JSON.parse(tok);
        var code = regStr.Code;
      var Login = regStr.Login;
      var CompName = regStr.CompanyName;
      var FirstName = regStr.FirstName;
      var LastName = regStr.LastName;
      var Email = regStr.Email;
      var Password = regStr.Password;
      var Phone = regStr.Phone;
     
       
         if (Code.value != code){
          alert ("Code is not correct. Please, try again: "+ Code.value +code );
          
        
         } else {
          
          // create an object fromthe rest and add the user
          var obj = {FirstName:FirstName,LastName:LastName,Email:Email,Login:Login, Password:Password, Phone: Phone, CompanyName: CompName};
        var js = JSON.stringify(obj);
        // alert(obj);
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
             // var retTok = res.jwtToken;
      
              if( res.error.length > 0 )
              {
                alert(res.error);
                  setMessage( "Error:" + res.error );
              }
              else
              {
                  
                  alert('User was added');
                  window.location.href = '/';
  
                
              }
          })
          .catch(function (error) 
          {
              console.log(error);
          });
          window.location.href = '/';
          }
  
    }
    

    return(
      <div id="loginDiv">
        <span id="inner-title">To verify your email, check your email for the code</span><br />
        <input type="text" id="code" placeholder="code" ref={(c) => Code = c}  /><br />
        
        <input type="submit" id="loginButton" className="buttons" value = "Submit"
          onClick={verifyEmail} />
        <span id="loginResult">{message}</span>
        
     </div>
    );
};



export default VerifyEmail;
