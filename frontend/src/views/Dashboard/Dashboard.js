import React from "react";
import classNames from "classnames";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Tasks from "../../components/Tasks/Tasks.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardUI from '../../components/CardUI';
import SearchDash from '../../components/SearchDash';

import TotalAssets from '../../components/TotalAssets';
import AddCardPopUp from '../../components/AddCardPopUp';

import Box from '@material-ui/core/Box';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Button from "../../components/CustomButtons/Button.js";
import Person from "@material-ui/icons/Person";

import { bugs, website, server } from "../../variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import stylesTwo from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(stylesTwo);
const useStyles3 =  makeStyles((theme) => ({
  manageYours: {
        // justifyContent: 'left',
        // alignItems: 'center',
        color: 'black',
        fontFamily: "League Spartan",
        fontSize: '1.5rem',
        marginTop: "-5px",
        marginBottom: "0px"
    },
    powered: {
      // justifyContent: 'left',
      // alignItems: 'center',
      color: 'grey',
      fontFamily: "League Spartan",
      fontSize: '.9rem',
      marginTop: "10px",
      marginBottom: "0px"
  },
}));

// this is where we will have to grab values from DB to put on dashboard
export default function Dashboard() {
  const classes = useStyles();
  const classesTwo = useStyles2();
  const classesThree = useStyles3();
 
  

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
  return (
    <div >
      <h3 className={classesThree.manageYours}><b>My Dashboard</b></h3>
      
      <Box marginLeft="93%" marginTop="-25px">
      {/* <button className={classes.cardTitle} type="button" id="addCardButton" className="buttons" 
            > Add Item </button><br /> */}

        <div className={classesTwo.manager}>
       
        <Button
          color={window.innerWidth > 959 ? "black" : "black"}
          //justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classesTwo.buttonLink}
        >
          Add Item
          <Hidden mdUp implementation="css">
            
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
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
                <AddCardPopUp />
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
        
      </div>
            
      </Box>
      <Box marginTop="-35px">
      <p className={classesThree.powered}><b>Asset Labs Powered Inventory System</b></p>
      </Box>
      
      
      <GridContainer>
        <GridItem xs={12} sm={8}>
          
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
              {/* <Table
                tableHeaderColor="black"
                tableHead={["Filter", "Name", "Brand", "Model", "Category", "S/N", "Location", "Replacement", "Stock"]}
                tableData={[
                  ["10:21", "Acura ILX", "No", "No", "Car", "12345", "Orlando", "40", "10"],
                  ["09:12", "Toyota Camry", "No", "No", "Car", "12345", "Orlando", "40", "10"],
                  ["13:21", "Dodge Charger", "No", "No", "Car", "12345", "Orlando", "40", "10"],
                  ["14:20", "Honda Civic", "No", "No", "Car", "12345", "Orlando", "40", "10"],
                  ["14:20", "Honda Civic", "No", "No", "Car", "12345", "Orlando", "40", "10"],
                  ["14:20", "Honda Civic", "No", "No", "Car", "12345", "Orlando", "40", "10"],
                  ["14:20", "Honda Civic", "No", "No", "Car", "12345", "Orlando", "40", "10"],

                ]}
              /> */}
              <SearchDash />
              </CardBody>
            <CardFooter stats>
            {/* <div className={classes.stats}>
                <Update />
                Just Updated
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total Assets</p>
              {/* <h3 className={classes.cardTitle}>175</h3> */}
              <TotalAssets />
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Just Updated
              </div>
            </CardFooter>
          </Card>

          {/* <Box  pt={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>Items Out</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked through matthew
              </div>
            </CardFooter>
          </Card>
          </Box> */}

          
          
        </GridItem>
       
      </GridContainer>
      <GridContainer>
      
      </GridContainer>
 
    </div>
  );
}