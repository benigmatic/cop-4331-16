var token = require('./createJWT.js');
const user = require('./models/user.js');
const sgMail = require('@sendgrid/mail');
const crypto = require ('crypto');
const jwt = require("jsonwebtoken");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
templates = {
  password_reset: "d-5de23122a18f426b9d59f4196edeed51",
 
};

exports.setApp = function ( app, client )
{


    app.post('/api/addcard', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
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
   
    app.post('/api/register', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
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
    
    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, firstName, lastName, error
    
     var error = '';
    
      const { login, password } = req.body;
    
      const db = client.db();
      const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
      var id = -1;
      var fn = '';
      var ln = '';

      var ret;
    
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
    app.post('/api/validateEmail', async (req, res, next) => 
    {
      // incoming: email
      // outgoing: id, email
    
     var error = '';
    
      var { email } = req.body;
      //console.log(email);
      //console.log(req.body);
      const db = client.db();
      const results = await db.collection('Users').find({Email:email}).toArray();
      var id = -1;
      var email ='';

      var ret;
   //  console.log(results);
      if( results.length > 0 )
      {
        
        id = results[0].userId;
        email = results[0].Email;
        

        try
        {
          
          ret = {email:email, id:id};
          // console.log(email);
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
    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
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
    app.post('/api/recover', async (req, res, next) => 
    {
      // Sends email with the verification code
    // console.log(req);
    var { email } = req.body;
    console.log(email);
    const db = client.db();
    const results = await db.collection('Users').find({Email:email}).toArray();
      var id = 0;
      var ret;
        //id = results[0].UserId;
        //console.log('ID: '+id);
        var ret;
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
    
      ret.resetPasswordToken=code

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
     
     sendTemplate(email, 'asset.labs.app@gmail.com', 'd-5de23122a18f426b9d59f4196edeed51', emailCode);
   
      res.status(200).json(ret);
   
    });
    app.post('/api/verify', async (req, res, next) => 
    {
      const { code, jwtToken } = req.body;
      console.log(req.body);
      console.log('Code in verify: '+code);
     //compares the token from the input with the token saved to the user
    });
    app.post('/api/reset', async (req, res, next) => 
    {
      const { Email, Password } = req.body;
     //console.log(Password);
      //console.log("Adding to "+ Email);
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

    }

	


  

