// import React, { useContext } from 'react'

// function Book(props) {
//   return (
//     <li>
//       <h2>{props.title}</h2>
//       <div>{props.author}</div>
//     </li>
//   )
// }

// export default Book;



import React, { useState } from 'react';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import axios from 'axios';
// core components
import styles from "../assets/jss/material-dashboard-react/components/tableStyle.js";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import styles2 from "../assets/jss/material-dashboard-react/components/tasksStyle.js";
import DeleteItem from "./DeleteItem.js"
import AddCardPopUp from './AddCardPopUp';
import EditPopUp from './EditPopUp.js';


const useStyles2 = makeStyles(styles2);


const useStyles = makeStyles(styles);
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

export default function Edit(props) {
  var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var flag = 0;
  const classes = useStyles();
  const classes2 = useStyles2();
  const { tableHead, tableData, tableHeaderColor } = props;

  const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');

  const deleteAsset = async event => 
  {
      event.preventDefault();

      
      flag = props.itemid;
      var tok = storage.retrieveToken();
      // Currently sending a string
      var obj = {itemId:flag,jwtToken:tok};
      var js = JSON.stringify(obj);

      var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;

      alert(flag);

      var config = 
      {
          method: 'post',
          url: bp.buildPath('api/deleteitem'),	
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
            console.log(res.arr+ "in the delete method");
              setMessage('Item has been deleted');
              // storage.storeToken( {accessToken:retTok} );
          }
      })
      .catch(function (error) 
      {
          console.log(error);
      });
  }

  const editItem = async event => 
    {
      //<EditPopUp/>
       var tok = storage.retrieveToken();

       var input = document.getElementsByName('arr');
    
       flag = props.itemid;

       var obj = {userId: userId, Name:Name.value, Brand:Brand.value, Model:Model.value, 
                  Category:Category.value, Location:Location.value, 
                  Replacement:Replacement.value, Serial: Serial.value,itemId:flag, jwtToken:tok }

       var js = JSON.stringify(obj);

      
      var tok = storage.retrieveToken();
      // Currently sending a string
      var obj = {itemId:flag,jwtToken:tok};
      var js = JSON.stringify(obj);

      var _ud = localStorage.getItem('user_data');
      var ud = JSON.parse(_ud);
      var userId = ud.id;
      alert("UserId: "+userId);

      alert("flag is: " +flag);
      
        
       var config = 
       {
           method: 'post',
           url: bp.buildPath('api/edititem'),	
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
            alert(Object.values(res));
   
           if( res.error.length > 0 )
           {
               setMessage( "API Error:" + res.error );
           }
           else
           {
            <ul>
                
            {_results.map((book, i) => <Book title={book.Name} author={book.Brand} fellow={book.Model} fellowship={book.Category} feller={book.Serial} loca={book.Location} repla={book.Replacement} stoc={book.Stock} itemid={book.itemId} key={i} />)}
            
          </ul>
               setMessage('Item has been edited');
               // storage.storeToken( {accessToken:retTok} );
           }
       })
       .catch(function (error) 
       {
           console.log(error);
       });

    };



  return (
    <div className={classes.tableResponsive}>
     hi
    </div>
  );
}


