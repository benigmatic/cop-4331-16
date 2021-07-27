import React from 'react';
import Login from '../components/Login';
import background from "../img/Topo.jpg";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));




const LoginPage2 = () =>
{
    const classes = useStyles();
    function goBack(){
        window.location.href = '/';
    }

    function forgot(){
       
        window.location.href = '/forgotpassword';
    }
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

  <Grid item xs={3}>
    <h3 color="#ffffff">hi</h3>
  <Login />
  <button id="forgot" onClick={forgot} >Forgot Password</button>
  </Grid>   

</Grid> 
        
       
      </div>
    );
};

export default LoginPage2;