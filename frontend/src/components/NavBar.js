import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
    },
    AppBar: {
        background: 'none',
    },
    icons: {
        color: 'white',
        fontSize: '2rem',
    },
    NavBarTitle: {
        flexGrow: '1',
        fontFamily: "League Spartan",
        letterSpacing: '-0.4', /* Not working yet */
    },
    NavBarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    leftContainer: {
        justifyContent: 'left',
        alignItems: 'center',
        color: 'white',
        fontFamily: "League Spartan",
    },
    pointsOfInterest: {
        color: 'white',
        fontFamily: "League Spartan",
        fontSize: '3rem',
    }
}));
export default function NavBar() {
    const classes = useStyles();
    return(
    <div className={classes.root}>

        <AppBar className={classes.AppBar} elevation='0'>
            <Toolbar className={classes.NavBarWrapper}>
                <h1 className={classes.NavBarTitle}>asset labs.</h1>
                <IconButton className={classes.icons}>
                    <SortIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        
        <div>
            <h1 className={classes.leftContainer}>
                manage your
            </h1>

            <h1 className={classes.pointsOfInterest}>
                <br /> gear.
                <br /> machinery.
                <br /> assets.
                <br /> vehicles.
                <br /> furniture.
            </h1>
        </div>
        
    </div>
    );
};