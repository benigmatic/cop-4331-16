import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
function ForgotPassword()
{
  
   
  
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var email;
    
  
     
    const [message,setMessage] = useState('');
 

    const SendCode = async event => 
    {
        event.preventDefault();
      //Check if email is in the DB
        
       var obj = {email:email.value};
      
       var js = JSON.stringify(obj);
       //alert(js);
       
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/recover'),	
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
           //  alert(res);
            //Code stored in res

            storage.storeToken(res.code);
                var pass = {code:res.code, email:email.value};
               // alert('To storage: ' + JSON.stringify(pass));

                localStorage.setItem('pass_data', JSON.stringify(pass));
   // alert("Stored");
            if( res.error )
            {
               
                setMessage( "Error:" + res.error );
            }
            else
            {
                // alert(res);
                setMessage('Email was found');
                //TODO: Send email
             // alert("Sending email to: "+ email.value);
            }
        })
        .catch(function (error) 
        {
            //alert(error);
            console.log(error);
        });

        
   
    }
    const VerifyEmail = async event => 
    {
        window.location.href = '/verify';
    }

    return(
        <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '40vh' }}
>
<Grid item xs={6}>
      <div id="loginDiv">
        <span style={{color: "white"}} id="inner-title">Use the email you created your Asset Labs account with to reset your password</span><br /><br />
        <input type="text" id="email" placeholder="email" ref={(c) => email = c}  /><br />
        
        <input type="submit" id="loginButton" className="buttons" value = "Send Code"
          onClick={SendCode} />
        <span id="loginResult">{message}</span>
        <input type="submit" id="loginButton" className="buttons" value = "Verify Email"
          onClick={VerifyEmail} />
     </div>
     </Grid>
     </Grid>
    );
};



export default ForgotPassword;
