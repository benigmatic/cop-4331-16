import React from 'react';
import Reset from '../components/Reset';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import NavBar from '../components/NavBar';
import Register from '../components/Register';
import Login from '../components/Login';
import background from "../img/Topo.jpg";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));


const ResetPage = () =>
{
    function goBack(){
        window.location.href = '/';
    }
    const classes = useStyles();
    return(
      <div className={classes.root}>
        
        <button id="back" onClick={goBack} >Go Back</button>
        <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '60vh' }}
>
  <Grid item xs={3} >
    <Reset />

  </Grid>
  </Grid>
        
        
      </div>
    );



};

export default ResetPage;