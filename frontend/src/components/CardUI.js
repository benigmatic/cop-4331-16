// CardUI() contains the main page for adding, searching, editing, and deleting assets.

import React, { useState } from 'react';
import classNames from "classnames";
import axios from 'axios';
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Table from "./Table/Table.js";
//import Tasks from "../../components/Tasks/Tasks.js";
//import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
//import Danger from "../../components/Typography/Danger.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardIcon from "./Card/CardIcon.js";
import Book from "./Book.js";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Update from "@material-ui/icons/Update";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "./CustomInput/CustomInput.js";
import Button from "./CustomButtons/Button.js";
import Box from '@material-ui/core/Box';
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCardPopUp from './AddCardPopUp';

import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import SearchDash from './SearchDash';


import stylesTwo from "../assets/jss/material-dashboard-react/components/headerLinksStyle.js";

function CardUI()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const jwt = require("jsonwebtoken");
    
    var card = '';
    var search = '';
    var Name = '';
    var Brand = '';
    var Model='';
    var Category='';
    var Replacement='';
    var Location=''; 
    var Serial='';
    var itemId;
    var deleteTheItem = '';
    var searchNames = [];
    var allResults=[];
    var buttons = '';
    

    var itemIds = [];
    //document.getElementById('addSerialNumber').addEventListener("click",addInput);

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

    const useStyles = makeStyles(styles);
    const useStyles2 = makeStyles(stylesTwo);
    const classes = useStyles();
    const classesTwo = useStyles2();
    const [openNotification, setOpenNotification] = React.useState(null);

  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

    var editButton = <Edit
    className={
      classes.tableActionButtonIcon + " " + classes.edit
    }/>

    

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
	
    const addCard = async event => 
    {
	    event.preventDefault();

        var tok = storage.retrieveToken();
       var obj = {userId:userId,card:card.value,jwtToken:tok};
       var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/addcard'),	
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
                setMessage( "Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
                storage.storeToken( {accessToken:retTok} );
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });

	};
    const addItem = async event => 
    {
       var tok = storage.retrieveToken();

       var input = document.getElementsByName('arr');
    
       //alert("UserId: "+userId);

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
        //alert(Serial.value);
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

    // const deleteAsset = async event => 
    // {
    //     event.preventDefault();

        
        		
    //     var tok = storage.retrieveToken();
    //     // Currently sending a string
    //     var obj = {itemId:itemId.value,jwtToken:tok};
    //     var js = JSON.stringify(obj);

    //     alert(js);

    //     var config = 
    //     {
    //         method: 'post',
    //         url: bp.buildPath('api/deleteitem'),	
    //         headers: 
    //         {
    //             'Content-Type': 'application/json'
    //         },
    //         data: js
    //     };

    //     axios(config)
    //         .then(function (response) 
    //     {
    //         var res = response.data;
    //          // var retTok = res.jwtToken;
             
    
    //         if( res.error.length > 0 )
    //         {
    //             setMessage( "API Error:" + res.error );
    //         }
    //         else
    //         {
                
    //             setMessage('Item has been deleted');
    //             // storage.storeToken( {accessToken:retTok} );
    //         }
    //     })
    //     .catch(function (error) 
    //     {
    //         console.log(error);
    //     });

        

    // }
    

    const searchCard = async event => 
    {
        event.preventDefault();
        		
        var tok = storage.retrieveToken();
        var obj = {userId:userId,search:search.value,jwtToken:tok};
        var js = JSON.stringify(obj);

        //alert(search.value);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/searchassets'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
    
        // The results will now display a list of all the users assets in a long string
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
                var _results = res.results;
                //alert(Object.keys(_results[0]));
                var thisResult = String(Object.values(_results[0]));
                
                //alert(thisResult);
                var resultText = '';
                
                for( var i=0; i<_results.length; i++ )
                {
                    //alert("here: "+ _results);
                    resultText += Object.values(_results[i]);
                    allResults[i] = Object.values(_results[i]);
                    
                    
                    thisResult = Object.values(_results[i]);
                    //alert(thisResult[9]);
                         var name = thisResult[2];
                         var theItemId = thisResult[9];
                       
                         searchNames[i] = name;
                         itemIds[i] = theItemId;
                         //alert( searchNames[i]);
                    if( i < _results.length - 1 )
                    {
                        // thisResult = Object.values(_results[i]);
                        // var name = thisResult[2];
                        // alert(name);
                        
                        resultText += ', ';
                    }
                }
                var theCount = ' ';
               // for(var z = 0; z < searchNames.length; z++){
                    //alert(itemIds[z]);

                
                setResults(<GridContainer><GridItem xs={12} >
          
                    <Card>
                      <CardHeader color="warning" stats icon>
                        {/* <CardIcon color="warning">
                          <Icon>Total Assets</Icon>
                        </CardIcon> */}
                        {/* <p className={classes.cardLeft}>Used Space</p>
                        <h3 className={classes.cardTitle}>
                          250 <small>Vehicles</small>
                        </h3> */}
                        {/* <CardUI/>  */}
                     
          
                      </CardHeader>
                      
                      <CardBody>
                        
                          
            <ul>
               
      {_results.map((book, i) => <Book tableHead= {["Name", "Brand", "Model", "Category", "S/N", "Location", "Replacement", "Edit/Delete"]} title={book.Name} author={book.Brand} fellow={book.Model} fellowship={book.Category} feller={book.Serial} loca={book.Location} repla={book.Replacement} stoc={book.Stock} itemid={book.itemId} key={i} />)}
      
    </ul>
                        </CardBody>
                        
                      <CardFooter stats>
                      <div className={classes.stats}>
                          <Update />
                          Just Updated
                        </div>
                        <div className={classes.stats} value = "hi">
                          
                        </div>
                        
                        
                      </CardFooter>
                    </Card>
                  </GridItem></GridContainer>);

                    
             

                  

                setCardList(resultText);
               
                storage.storeToken( {accessToken:retTok} );
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });

    };


    return(
        
    <GridContainer>
      <Box  mt = {-5} mb = {-2} pl={2} display= "inline-block">
      <div >
       
      </div>

      </Box>
            
          
        

             <div id="cardUIDiv">
         <br />
         {/* <SearchDash/> */}
         <input type="text" id="searchText" placeholder="Asset to Search For" 
             ref={(c) => search = c} />
         <button type="button" id="searchCardButton" className="buttons" 
             onClick={searchCard}> Search </button><br />
         <span width="100%" id="cardSearchResult">{searchResults}</span>

         {/* <input type="text" id="deleteItem" placeholder="Item to delete" 
             ref={(c) => itemId = c} />
         <button type="button" id="deleteItem" className="buttons" 
             onClick={deleteAsset}> Delete Item</button><br />
         
         <p id="cardList">{cardList}</p><br /><br />
         <input type="text" id="cardText" placeholder="Card To Add" 
             ref={(c) => card = c} />
         <button type="button" id="addCardButton" className="buttons" 
             onClick={addCard}> Add Card </button><br /> */}
    <br />
    <br />
    <Box className = {classes.BoxBack}>
         <input type="text" id="cardText" placeholder="Name" 
             ref={(c) => Name = c} />
             <br />
             <input type="text" id="cardText" placeholder="Model" 
             ref={(c) => Model = c} />
             <br />
             <input type="text" id="cardText" placeholder="Category" 
             ref={(c) => Category = c} />
             <br />
             <input type="text" id="cardText" placeholder="Location" 
             ref={(c) => Location = c} />
             <br />
              <input type="text" id="cardText" placeholder="Brand" 
             ref={(c) => Brand = c} />
             <br />
             <input type="text" id="cardText" placeholder="Replacement" 
             ref={(c) => Replacement = c} />
             <br />
             <input type="text"  placeholder="SerialNumber" ref={(c) => Serial = c} />
             <br />
             <br />
         <button type="button" id="addCardButton" className="buttons" 
             onClick={verifyTheSN}> Add Item </button><br />
             </Box>
         <span id="cardAddResult">{message}</span>
         </div>
        </GridContainer>
    );
    //         else
    //         {
    //             var _results = res.results;
    //             var resultText = '';
    //             var testing = [];
                
    //             for( var i=0; i<_results.length; i++ )
    //             {
    //                 testing = Object.entries(_results[i]);
    //                 console.log(testing);
    //                 resultText += Object.keys(_results[i]) + "   and   "+ Object.entries(_results[i]) + "        ";
    //                 if( i < _results.length - 1 )
    //                 {
    //                     resultText += ', ';
                        
    //                 }
    //             // for (let value of Object.entries(_results[i]))
    //             // {
    //             //     alert(value);
    //             // }
    //             }
                
    //             setResults('Assets have been retrieved');
    //             setCardList(resultText);
    //             storage.storeToken( {accessToken:retTok} );
    //         }
    //     })
    //     .catch(function (error) 
    //     {
    //         console.log(error);
    //     });

    // };

    // return(
    //     <div id="cardUIDiv">
    //     <br />
    //     <input type="text" id="searchText" placeholder="Card To Search For" 
    //         ref={(c) => search = c} />
    //     <button type="button" id="searchCardButton" className="buttons" 
    //         onClick={searchCard}> Search Card</button><br />
    //     <span id="cardSearchResult">{searchResults}</span>
    //     <p id="cardList">{cardList}</p><br /><br />
    //     <input type="text" id="cardText" placeholder="Card To Add" 
    //         ref={(c) => card = c} />
    //     <button type="button" id="addCardButton" className="buttons" 
    //         onClick={addCard}> Add Card </button><br />

    //     <input type="text" id="cardText" placeholder="Name" 
    //         ref={(c) => Name = c} />
    //         <input type="text" id="cardText" placeholder="Model" 
    //         ref={(c) => Model = c} />
    //         <input type="text" id="cardText" placeholder="Category" 
    //         ref={(c) => Category = c} />
    //         <input type="text" id="cardText" placeholder="Location" 
    //         ref={(c) => Location = c} />
    //          <input type="text" id="cardText" placeholder="Brand" 
    //         ref={(c) => Brand = c} />
    //         <input type="text" id="cardText" placeholder="Replacement" 
    //         ref={(c) => Replacement = c} />
    //         <input type="text"  placeholder="SerialNumber" ref={(c) => Serial = c} />
    //         <br />
    //         <br />
    //     <button type="button" id="addCardButton" className="buttons" 
    //         onClick={verifyTheSN}> Add Item </button><br />
    //     <span id="cardAddResult">{message}</span>
    //     </div>a
    // );
}

export default CardUI;
