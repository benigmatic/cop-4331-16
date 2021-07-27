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
      
      </div>

      </Box>
            
          
        

             <div id="cardUIDiv">
       
             
             <h1 style={{color:"black", fontSize:"2rem", fontFamily: "League Spartan"}} width="100%" id="cardSearchResult">{totalAsset} Assets</h1>
            
         

        
         </div>
        </GridContainer>
    );
   
}

export default TotalAssets;
