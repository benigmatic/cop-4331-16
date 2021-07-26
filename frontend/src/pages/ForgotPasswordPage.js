import React from 'react';
import ForgotPassword from '../components/ForgotPassword';
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

const ForgotPasswordPage = () =>
{

  const classes = useStyles();
    function goBack(){
        window.location.href = '/';
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

  <Grid item xs={6}>
    <h3 color="#ffffff">hi</h3>
    <ForgotPassword />
 
  </Grid>   

</Grid> 
        
       
      </div>
    );

    // return(
    //   <div className={classes.root}>
    //     <button id="back" onClick={goBack} >Go Back</button>
    //     <ForgotPassword />
        
    //   </div>
    // );
};

export default ForgotPasswordPage;