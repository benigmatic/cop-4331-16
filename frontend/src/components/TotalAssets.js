// CardUI() contains the main page for adding, searching, editing, and deleting assets.

import React, { useState, useEffect } from 'react';
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


import stylesTwo from "../assets/jss/material-dashboard-react/components/headerLinksStyle.js";

function TotalAssets()
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
    var assetCount = 0;
    
    

    var itemIds = [];
    //document.getElementById('addSerialNumber').addEventListener("click",addInput);

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');
    const [totalAsset, setTotalAsset] = useState(' ');
 
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
	


    useEffect (() =>
    {
        const SearchCard = async event => 
        {
            //event.preventDefault();
                    
            var tok = storage.retrieveToken();
            var obj = {userId:userId,search:" ",jwtToken:tok};
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
                  //  alert(Object.keys(_results[0]));
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
    
                    assetCount = _results.length;
                    //alert(assetCount);
                    setTotalAsset(assetCount);
    
                        
                      //}
    
                      
    
                    setCardList(resultText);
                   
                    storage.storeToken( {accessToken:retTok} );
                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    
        };
        SearchCard();

    }, []);


    return(
        
    <GridContainer>
      <Box  mt = {-5} mb = {-2} pl={2} display= "inline-block">
      <div >
        {/* <CustomInput
          formControlProps={{
            
          }}
          inputProps={{
            placeholder: "Search ...",
            inputProps: {
              "aria-label": "Search",
              ref: search
              
            },
          }}
        /> */}
        {/* <Button onClick={searchCard} color="white" aria-label="edit" justIcon round>
            
          <Search />
          
        </Button> */}
        {/* <button type="button" id="searchCardButton" className="buttons" 
             onClick={searchCard}> Search Card</button><br />
             
         <span id="cardSearchResult">{searchResults}</span> */}
      </div>

      </Box>
            
          
        

             <div id="cardUIDiv">
         {/* <br />
         <input type="text" id="searchText" placeholder="Card To Search For" 
             ref={(c) => search = c} />
         <button type="button" id="searchCardButton" className="buttons" 
             onClick={SearchCard}> Search Card</button><br /> */}
             
             <h1 style={{color:"black", fontSize:"2rem", fontFamily: "League Spartan"}} width="100%" id="cardSearchResult">{totalAsset} assets out</h1>
            
         

         {/* <input type="text" id="deleteItem" placeholder="Item to delete" 
             ref={(c) => itemId = c} />
         <button type="button" id="deleteItem" className="buttons" 
             onClick={deleteAsset}> Delete Item</button><br />
         
         <p id="cardList">{cardList}</p><br /><br />
         <input type="text" id="cardText" placeholder="Card To Add" 
             ref={(c) => card = c} />
         <button type="button" id="addCardButton" className="buttons" 
             onClick={addCard}> Add Card </button><br /> */}
    {/* <br />
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
         <span id="cardAddResult">{message}</span> */}
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

export default TotalAssets;
