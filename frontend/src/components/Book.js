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
import classNames from "classnames";
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

import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";

import stylesTwo from "../assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles2 = makeStyles(styles2);

const useStylesTwo = makeStyles(stylesTwo);
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

export default function CustomTable(props) {
  var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var flag = 0;
  const classes = useStyles();
  const classes2 = useStyles2();
  const classesTwo = useStylesTwo();
  const { tableHead, tableData, tableHeaderColor } = props;

  const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');
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
       

       
       var _ud = localStorage.getItem('user_data');
       var ud = JSON.parse(_ud);
       var userId = ud.id;
       alert("UserId: "+userId);
 
       alert("flag is: " +flag);
       
   
      
     
      var tok = storage.retrieveToken();
      // Currently sending a string
      var obj = {userId: userId, Name:props.title, Brand:props.author, Model:props.fellow, 
        Category:props.fellowship, Location:props.loca, 
        Replacement:props.repla, Serial: props.feller,itemId:flag, jwtToken:tok }
      var js = JSON.stringify(obj);
      alert(js);

     
      
        
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
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          
           
              <TableRow  className={classes.tableBodyRow}>
                
                
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                      {props.title}
                     
                    
                    </TableCell>

                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.author}
                     
                    
                    </TableCell>

                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.fellow}
                     
                    
                    </TableCell>

                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.fellowship}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.feller}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.loca}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.repla}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.stoc}
                     
                    
                    </TableCell>
                  
                  
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    <Tooltip
                id="tooltip-top"
                title="Edit"
                placement="top"
                classes={{ tooltip: classes2.tooltip }}
              >
                
                <IconButton
                  aria-label="Edit"
                  className={classes2.tableActionButton}
                  onClick={editItem}
                  color={window.innerWidth > 959 ? "black" : "black"}
                  //justIcon={window.innerWidth > 959}
                  simple={!(window.innerWidth > 959)}
                  aria-owns={openProfile ? "profile-menu-list-grow" : null}
                  aria-haspopup="true"
                  //onClick={handleClickProfile}
                  className={classesTwo.buttonLink}
                  
                >
                  
          {/* Add Item
          <Hidden mdUp implementation="css">
            
            <p className={classes.linkText}>Profile</p>
          </Hidden>
      
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          //disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                <EditPopUp />
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers> */}
                  
                  {/* <EditPopUp/> */}
                  
                  <Edit
                    className={
                      classes2.tableActionButtonIcon + " " + classes2.edit
                    }
                  />
                  
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                
                <IconButton
                  aria-label="Close"
                  className={classes.tableActionButton}
                  onClick={deleteAsset}
                 
                >
                  <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
                       
                      
                      </TableCell>

                    

                    
                     
                     
                  
               
              </TableRow>
            
          
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
