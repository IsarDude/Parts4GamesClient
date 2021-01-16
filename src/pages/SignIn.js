import '../style/SignIn.css';
import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { UseAuth } from '../context/auth';
import {Button} from "react-bootstrap";
import { render } from '@testing-library/react';


function SignIn() {

    const axios = require('axios');
    const oauth = require('axios-oauth-client');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setAuthTokens } = UseAuth();


    //HTML-Code ausgetauscht mit CSS-Klassen
    // <Buttton onClick={PostLogin} className="btn google-btn social-btn" type="button" href=""><span><i className="fab fa-google-plus-g"></i> Anmelden mit Google</span> </Button>



      const gResponse = (response) => {
        var res = response.profileObj;
        console.log("ResData = "+res.data);
        SignData(response);
       
      }

      function SignData(res){
        const googleresponse = {
          Name: res.profileObj.name,
          email: res.profileObj.email,
          token: res.googleId,
          ProviderId: 'Google'
        } 
        setAuthTokens(googleresponse.token);
        setLoggedIn(true)
        console.log("GoogleResponse = "+ googleresponse)
      }


      if (isLoggedIn) {
        return <Redirect to="/Parts4Games" />;
      }
    

    return (
      <div>
        <header>
            <title>SignIn - P4G</title>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
        </header>
        
        <div> 
            <div id="logreg-forms">
              <form className="form-signin">
                  <h1 className="h5 mb-5 font-weight-normal" style={{textAlign: 'center'}}> Willkommen zu PARTS4GAMES</h1>
                  <h2 className="h5 mb-5 font-weight-normal" style={{textAlign: 'center'}}> Du musst dich erst mit deinen Google-Account anmelden</h2>
                  <div className="social-login" style={{textAlign:'center'}}>
                      <GoogleLogin clientId="1012272884295-oj9v46cl35rssdargirp23k7a7n75gvg.apps.googleusercontent.com" buttonText= "Login with Google" onSuccess={gResponse}></GoogleLogin> 
                  </div>
              </form>
            </div>
            <div>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </div>
        </div>
      </div>
    );
};

export default SignIn