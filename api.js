var token = require('./createJWT.js');

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
    
      const newCard = {Card:card,UserId:userId};
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
        
      const { FirstName, LastName, Email, Login, Password, Phone, CompanyName, jwtToken } = req.body;

     //var userId = 21;
    
      const newUser = { userId:getSequenceNextValue("1"), FirstName:FirstName, LastName:LastName, Email:Email, Login:Login, Password:Password, Phone:Phone, CompanyName:CompanyName};
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
        
        id = results[0].UserId;
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
   

	
function getSequenceNextValue(seqName) {
  var seqDoc = db.Users.findAndModify({
    query: { _id: seqName },
    update: { $inc: { seqValue: 1 } },
    new: true
  });

  return seqDoc.seqValue;
} 
}
