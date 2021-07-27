// CardUI() contains the main page for adding, searching, editing, and deleting assets.

import React, { useState } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import background from "../img/Topo.jpg";
import Edit from '@material-ui/icons/Edit';

function EditPopUp()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");
    const styles = {
        paperContainer: {
            backgroundImage: `url(${background})`,
            color: 'white',
            borderRadius: 10,
           
        },
        coolButton: {
            borderRadius: 10,
            textAlign:'center',
            marginRight:40,
            marginLeft:40,
            marginTop:10,
            
        }
    };
    
    var card = '';
    var search = '';
    var Name = '';
    var Brand = '';
    var Model='';
    var Category='';
    var Replacement='';
    var Location=''; 
    var Serial=''
    //document.getElementById('addSerialNumber').addEventListener("click",addInput);

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
	
    
    const addItem = async event => 
    {
       var tok = storage.retrieveToken();

       var input = document.getElementsByName('arr');
    
       alert("UserId: "+userId);

       var obj = {userId: userId, Name:Name.value, Brand:Brand.value, Model:Model.value, 
                  Category:Category.value, Location:Location.value, Quantity:input.length, 
                  Replacement:Replacement.value, Serial: Serial.value, jwtToken:tok }

       var js = JSON.stringify(obj);
        
       var config = 
       {
           method: 'post',
           url: bp.buildPath('api/additem'),	
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
               setMessage( "API Error:" + res.error );
           }
           else
           {
               
               setMessage('Item has been added');
               // storage.storeToken( {accessToken:retTok} );
           }
       })
       .catch(function (error) 
       {
           console.log(error);
       });

    };

    // const addSerialNumber = async event => 
    // {
    //  //   alert ("Adding s/n");
    // //    var newInput = '<input type="text"  placeholder="Serial Number" name="input'+num+'"/><br> <br>';
    // var newInput = '<input type="text"  placeholder="Serial Number" name="arr"/><br> <br>';
    //     document.getElementById('demo').innerHTML += newInput;  
    //     num++;
    // };

    // ===================================================================================
    // verifyTheSN() checks the database to see if the entered SN
    // is already in the DB. Throws error if there is. If it is a new
    // SN, then it calls the addItem() method and adds the asset to the
    // database. 
    // ===================================================================================
    const verifyTheSN = async event => 
    {
        event.preventDefault();
        var tok = storage.retrieveToken();
        var obj = {userId:userId,Serial:Serial.value,jwtToken:tok};
        var js = JSON.stringify(obj);
        alert(Serial.value);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/verifySN'),	
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
                addItem();
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    }

    

    return(
//         <Grid
//   container
//   spacing={0}
//   direction="column"
//   alignItems="right"
//   justify="right"
//   style={styles.paperContainer}
  
// >
//        <Grid item xs={3}> 
        <div style={styles.paperContainer} id="cardPopUp">
        
        <input style={styles.paperContainer} type="text" id="cardText" placeholder="Name" 
            ref={(c) => Name = c} />
            <br />
            <input style={styles.paperContainer} type="text" id="cardText" placeholder="Model" 
            ref={(c) => Model = c} />
            <br />
            <input style={styles.paperContainer} type="text" id="cardText" placeholder="Category" 
            ref={(c) => Category = c} />
            <br />
            <input style={styles.paperContainer} type="text" id="cardText" placeholder="Location" 
            ref={(c) => Location = c} />
            <br />
             <input style={styles.paperContainer} type="text" id="cardText" placeholder="Brand" 
            ref={(c) => Brand = c} />
            <br />
            <input style={styles.paperContainer} type="text" id="cardText" placeholder="Replacement" 
            ref={(c) => Replacement = c} />
            <br />
            <input style={styles.paperContainer} type="text"  placeholder="SerialNumber" ref={(c) => Serial = c} />
            <br />
            <br />
        <button style={styles.coolButton} type="button" id="addCardButton" className="buttons" 
            onClick={verifyTheSN}> Add Item </button><br />
        <span id="cardAddResult">{message}</span>
        </div>
        // </Grid>
        // </Grid>
    );
}

export default EditPopUp;
