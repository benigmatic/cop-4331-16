var token = require('./createJWT.js');
const user = require('./models/user.js');
const sgMail = require('@sendgrid/mail');
const crypto = require ('crypto');
const jwt = require("jsonwebtoken");
const { DH_CHECK_P_NOT_PRIME } = require('constants');
//const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
//const { resolve } = require('path');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
templates = {
  password_reset: "d-5de23122a18f426b9d59f4196edeed51",
 
};

exports.setApp = function ( app, client )
{

    /*
     Incoming : userId, card, jwtToken
     Outgoing : error
     Adds a new card to the DB
    */
    app.post('/api/addcard', async (req, res, next) =>
    {

     const { userId, card, jwtToken } = req.body;
     try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }    
      const newCard = {Card:card,userId:userId};
      var error = '';    
      try
      {
      const db = client.db();  
        const result = db.collection('Cards').insertOne(newCard);
      }
       catch(e)
         {
        error = e.toString();
         }    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
// Incoming : userId, Name, Brand, Model, Category, Location, Replacement, Serial,  
//Outcoming:   itemId, error
    app.post('/api/additem', async (req, res, next) =>
    {
     
      
      var ret='';
      var error = '';    
     const { userId, Name, Brand, Model, Category, Location, Replacement, Serial,  jwtToken } = req.body;
  
     const db = client.db();     
    var count =  await db.collection('counterItem').find({name:"count"}).toArray();
    var index = count[0].index;
   
    var itemId =index +1;

    var newvalues = { $set: {index: itemId} };
   await db.collection('counterItem').updateOne({name:"count"}, newvalues, function(err, res){
      if (err) console.log("Error");
    //console.log("1 document updated");
  
    })
 
      const newItem = {userId:userId, Name:Name, Brand:Brand, Model:Model, Category:Category, Location:Location, Replacement:Replacement, Serial:Serial, itemId: itemId};
      
      try
      {
      const db = client.db();  
        const result = db.collection('Assets').insertOne(newItem);
      }
       catch(e)
         {
           
        error = e.toString();
         }    
      var refreshedToken = null;
     // console.log("In api");
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
 
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
    //Incoming: itemId, jwtToken
    app.post('/api/deleteitem', async (req, res, next) =>
    {

     const { itemId, jwtToken } = req.body;
     try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }    
      
      try
      {
      const db = client.db();  
       var myquery = {itemId: itemId};
       db.collection("Assets").deleteOne(myquery, function(err,obj){
         if (err) throw err;
         console.log("Item deleted");
       })
      }
       catch(e)
         {
        error = e.toString();
         }    
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
   // Incoming: FirstName, LastName, Email,Login, Password, Phone, Company Name ,  jwtToken (not required)
   // Ps. Password was already hashed in frontend with md5 file from LAMP stack
   // Outgoing : error

   //  Adds the user to the database, creates a token with First, Last names and id
    app.post('/api/register', async (req, res, next) =>
    {
      function getSequenceNextValue(sequenceOfName){
        const db = client.db();     
        var sequenceDoc = db.collection('counters').findAndModify({
          query:{_id: sequenceOfName },
           update: {$inc:{sequence_value:1}},
           new:true
         });
       return sequenceDoc.sequence_value;
    }
      const { FirstName, LastName, Email, Login, Password, Phone, CompanyName, jwtToken } = req.body;
     let id = getSequenceNextValue("user_id");
      const newUser = {  userId: id, FirstName:FirstName, LastName:LastName, Email:Email, Login:Login, Password:Password, Phone:Phone, CompanyName:CompanyName};
      var error = '';
    
      try
      {
        const db = client.db();
       
        const result = db.collection('Users').insertOne(newUser);
      }
      catch(e)
      {
        error = e.toString();
      }
      try
      {
        const token = require("./createJWT.js");
        ret = token.createToken( FirstName, lastName, id );
      }
      catch(e)
      {
        ret = {error:e.message};
      }
     
      var ret = { error: error};
      
      res.status(200).json(ret);
    });
     // incoming: login, password
      // outgoing: id, firstName, lastName, error
      // Checks if username with correct passwords are in database
    app.post('/api/login', async (req, res, next) => 
    {
       
     var error = '';
    
      const { login, password } = req.body;
    
      const db = client.db();
      const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
      var id = -1;
      var fn = '';
      var ln = '';

      var ret="";
    
      if( results.length > 0 )
      {
        id = results[0].userId;
        fn = results[0].FirstName;
        ln = results[0].LastName;

        try
        {
          const token = require("./createJWT.js");
          ret = token.createToken( fn, ln, id );
        }
        catch(e)
        {
          ret = {error:e.message};
        }
      }
      else
      {
          ret = {error:"Login/Password incorrect"};
      }
    
      res.status(200).json(ret);
    });
       // incoming: email
      // outgoing: id, email
      // Checks if the user with this email exists in the DB
    // I used it before i created api/checkexistance, i don't want to delete it yet just in case
    app.post('/api/validateEmail', async (req, res, next) => 
    {
       
      var error = '';
      var { email } = req.body;
      const db = client.db();
      const results = await db.collection('Users').find({Email:email}).toArray();
      var id = -1;
      var email ='';
      var ret;
       if( results.length > 0 )
        {
                id = results[0].userId;
                email = results[0].Email;
          try
            {
              ret = {email:email, id:id};
            }
           catch(e)
            {
             ret = {error:e.message};
             console.log("Error");
            }
        }
      else
      {
          ret = {error:"User not found"};
      }
    
      res.status(200).json(ret);
    });
     // incoming: userId, search (String)
      // outgoing: results[], error
      //Search for cards in DB, if user is still active, refreshes the token
    app.post('/api/searchcards', async (req, res, next) => 
    {     
      var error = '';    
      const { userId, search, jwtToken } = req.body;
      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }
      
      var _search = search.trim();      
      const db = client.db();
      const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();      
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Card );
      }
      
      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken).accessToken;
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { results:_ret, error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);
    });
   // Ingoing : email
   //Outgoing: reset password code (token.resetPasswordToken), error

   //Sends an email with generted code which is stored in token.resetPasswordToken.
    app.post('/api/recover', async (req, res, next) => 
    {

      var error = ''
    var ret ={};

    var { email } = req.body;
    console.log(email);
    const db = client.db();
    const results = await db.collection('Users').find({Email:email}).toArray();

    
      if (results.length===0){
        console.log("User with this email doesn't exist");

       ret = {error: "User with this email doesn't exist. Email: " , email : email};

       }else {

        const code = Math.floor(Math.random()*90000+10000);
        console.log('Code: '+ code);
        
        try
        {
          const token = require("./createJWT.js");
         token.resetPasswordToken=code;
         //console.log(token.resetPasswordToken);
          ret = token.resetPasswordToken;
          //console.log(token.resetPasswordToken);
        }
        catch(e)
        {
          
          ret = {error:e.message};
        }
    
     // ret.resetPasswordToken=code
    
      function getMessage(){
        const body = 'To reset your password, paste this code: '+code;
        return {
          to: email,
          from: 'asset.labs.app@gmail.com',
          subject: 'Reset your password',
          text: body,
          html: `<strong>${body}</strong>`,
        };
      }
       async function sendEmail() {
        try {
          await sgMail.send(getMessage());
          console.log('Test email sent successfully');
        } catch (error) {
          console.error('Error sending test email');
          console.error(error);
          ret = {error:error};
          if (error.response) {
            console.error(error.response.body)
          error = error.response;
          }
        }
      }
      sendEmail();
      /* SENDING with  TEMPLATE
           function sendTemplate  (to, from, templateId, dynamic_template_data){
               const msg = {
                 to, 
                 from: {name:'Asset labs', email: from},
                 templateId,
                 dynamic_template_data
               };
               console.log(msg);
               sgMail.send(msg)
               .then((response)=> {
                 //console.log('Email sent', {templateId, dynamic_template_data});
                 console.log("response",response);
               })
               .catch((error)=>{
                 console.log("SendGrid error: ", error)
               })

            }
     var emailCode = {"code":code};
     try {
     sendTemplate(email, 'asset.labs.app@gmail.com', 'd-5de23122a18f426b9d59f4196edeed51', emailCode);
     console.log("Email was sent");
    }
    catch (err){
console.log("Error sending the email "+ err);
    }
    */
   ret = {error:error, code:code, email:email};
  }
  console.log("Ret "+ ret);
        res.status(200).json(ret);
   
    });
    /*
    app.post('/api/verify', async (req, res, next) => 
    {
      const { code, jwtToken } = req.body;
      console.log(req.body);
      console.log('Code in verify: '+code);
     //compares the token from the input with the token saved to the user
    });
    */
  // Ingoing: Email, password
  // Outgoing error
  // Resets password in the DB
    app.post('/api/reset', async (req, res, next) => 
    {
      const { Email, Password } = req.body;
      var error = '';
     //reset password for the user
     try
      {
        const db = client.db();
    
     //  var id = -1;
      var myquery = {Email: Email};
      var newvalues = { $set: { Password: Password}};
    // console.log(newvalues);
      db.collection("Users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
       // console.log("Password updated");
      
    
      })
    }

  
      catch(e)
      {
        error = e.toString();
      }

      });
    //Ingoing : code, email
    // Outgoing:  error
    //Send an email with the code to verify email
    app.post('/api/verifyEmail', async (req, res, next) => 
    {
      const { Code, Email } = req.body;
   
      var error = '';
    
      console.log('Code: '+ Code);
  
  function getMessage(){
    const body = 'To verify your email, paste this code: '+Code;
    return {
      to: Email,
      from: 'asset.labs.app@gmail.com',
      subject: 'Verify your email',
      text: body,
      html: `<strong>${body}</strong>`,
    };
  }
  /*
         function sendTemplate  (to, from, templateId, dynamic_template_data){
             const msg = {
               to, 
               from: {name:'Asset labs', email: from},
               templateId,
               dynamic_template_data
             };
             console.log(msg);
             sgMail.send(msg)
             .then((response)=> {
               //console.log('Email sent', {templateId, dynamic_template_data});
               console.log("response",response);
             })
             .catch((error)=>{
               console.log("SendGrid error: ", error)
             })

          }
   var code = {"code":emailCode};
   console.log(Email+"Send here");
   sendTemplate(Email, 'asset.labs.app@gmail.com', 'd-5de23122a18f426b9d59f4196edeed51', code);
  */
   async function sendEmail() {
    try {
      await sgMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
  sendEmail();
    var ret = { error: error};
    
    res.status(200).json(ret);
     try
      {
     
    }
  
      catch(e)
      {
        error = e.toString();
      }
      });
    
  
// ingoing : Email, username
//outgoing: error 

// Checks if the user with username/email alredy exists. return corresponding error
    app.post('/api/checkexistance', async (req, res, next) => 
    {
      const { Email, Login } = req.body;
     console.log("Checking "+ Email +" " +Login + "for existed user");
     //compares the token from the input with the token saved to the user
     
     const db = client.db();
     const results = await db.collection('Users').find({Login:Login}).toArray();
     var id = -1;
     var username = "";
     var ret = "";
   
     if( results.length > 0 )
     {
      // id = results[0].userId;
      //console.log(results.length);
       username = results[0].Login;
      //console.log("The user exists with " + username);

      ret = {error:"This Username is already taken"};
      
     } else {
        const results2 = await db.collection('Users').find({Email:Email}).toArray();
    
     var email = "";

    //  var ret;
    console.log(results2.length);
     if( results2.length > 0 )
     {
      // id = results[0].userId;
       email = results2[0].Email;
     // console.log("The user exists with " + email);
      
      ret = {error:"The user with the same email already exists"};
      
     }
   
    }
    
    res.status(200).json(ret);
   });
   
  }
