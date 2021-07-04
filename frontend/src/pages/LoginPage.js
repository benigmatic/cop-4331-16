import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import NavBar from '../components/NavBar';
import Register from '../components/Register';
import Login from '../components/Login';
import background from "../img/Topo.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));


const LoginPage = () =>
{
  function loginButton(){
    window.location.href = '/login';
  }
  function regButton(){
    window.location.href = '/register';
  }
    const classes = useStyles();
    return(
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <button id="login" onClick={loginButton} >Login</button>
        <button id="login" onClick={regButton} >Register</button>
      </div>
    );
};

export default LoginPage;

