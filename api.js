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
    app.post('/api/searchassets', async (req, res, next) =>
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
      const nameResults = await db.collection('Assets').find({userId: userId, Name:{$regex: ".*" + _search + ".*", $options: 'i'}}).toArray();
      const brandResults = await db.collection('Assets').find({userId: userId, Brand:{$regex: ".*" + _search + ".*", $options: 'i'}}).toArray();
      const modelResults = await db.collection('Assets').find({userId: userId, Model:{$regex: ".*" + _search + ".*", $options: 'i'}}).toArray();
      const catResults = await db.collection('Assets').find({userId: userId, Category:{$regex: ".*" + _search + ".*", $options: 'i'}}).toArray();
      const locResults = await db.collection('Assets').find({userId: userId, Location:{$regex: ".*" + _search + ".*", $options: 'i'}}).toArray();
      const replResults = await db.collection('Assets').find({userId: userId, Replacement:{$regex: ".*" + _search + ".*", $options: 'i'}}).toArray();

      var _ret = [];
      var seenIds = [];
      var seen = false;

      //*********************************************************************************************************************************************************************************
      //Name Results return
      for( var i=0; i<nameResults.length; i++ ){

        seenIds.push(nameResults[i]._id);
        _ret.push(nameResults[i].Name, nameResults[i].Brand, nameResults[i].Model, nameResults[i].Category,
          nameResults[i].Location, nameResults[i].Replacement);
      }
      //*********************************************************************************************************************************************************************************

      //*********************************************************************************************************************************************************************************
      //Brand Results return
      seen = false;
      for(var i = 0; i < brandResults.length; i++){

        for (var j = 0; j < seenIds.length; j++) {

          if (brandResults[i]._id.equals(seenIds[j])) {

            seen = true;
            break;
          }
        }

        if (seen == true) {

          seen = false;
        }
        else{

          seenIds.push(brandResults[i]._id);
          _ret.push(brandResults[i].Name, brandResults[i].Brand, brandResults[i].Model, brandResults[i].Category,
            brandResults[i].Location, brandResults[i].Replacement);
        }
      }
      //*********************************************************************************************************************************************************************************

      //*********************************************************************************************************************************************************************************
      //Model Results return
      seen = false;
      for(var i = 0; i < modelResults.length; i++){

        for (var j = 0; j < seenIds.length; j++) {

          if (modelResults[i]._id.equals(seenIds[j])) {

            seen = true;
            break;
          }
        }

        if (seen == true) {

          seen = false;
        }
        else{

          seenIds.push(modelResults[i]._id);
          _ret.push(modelResults[i].Name, modelResults[i].Brand, modelResults[i].Model, modelResults[i].Category,
            modelResults[i].Location, modelResults[i].Replacement);
        }
      }
      //*********************************************************************************************************************************************************************************

      //*********************************************************************************************************************************************************************************
      //Category Results return
      seen = false;
      for(var i = 0; i < catResults.length; i++){

        for (var j = 0; j < seenIds.length; j++) {

          if (catResults[i]._id.equals(seenIds[j])) {

            seen = true;
            break;
          }
        }

        if (seen == true) {

          seen = false;
        }
        else{

          seenIds.push(catResults[i]._id);
          _ret.push(catResults[i].Name, catResults[i].Brand, catResults[i].Model, catResults[i].Category,
            catResults[i].Location, catResults[i].Replacement);
        }
      }
      //*********************************************************************************************************************************************************************************

      //*********************************************************************************************************************************************************************************
      //Location Results return
      seen = false;
      for(var i = 0; i < locResults.length; i++){

        for (var j = 0; j < seenIds.length; j++) {

          if (locResults[i]._id.equals(seenIds[j])) {

            seen = true;
            break;
          }
        }

        if (seen == true) {

          seen = false;
        }
        else{

          seenIds.push(locResults[i]._id);
          _ret.push(locResults[i].Name, locResults[i].Brand, locResults[i].Model, locResults[i].Category,
            locResults[i].Location, locResults[i].Replacement);
        }
      }
      //*********************************************************************************************************************************************************************************

      //*********************************************************************************************************************************************************************************
      //Replacement Results return
      seen = false;
      for(var i = 0; i < replResults.length; i++){

        for (var j = 0; j < seenIds.length; j++) {

          if (replResults[i]._id.equals(seenIds[j])) {

            seen = true;
            break;
          }
        }

        if (seen == true) {

          seen = false;
        }
        else{

          seenIds.push(replResults[i]._id);
          _ret.push(replResults[i].Name, replResults[i].Brand, replResults[i].Model, replResults[i].Category,
            replResults[i].Location, replResults[i].Replacement);
        }
      }
      //*********************************************************************************************************************************************************************************

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






}
