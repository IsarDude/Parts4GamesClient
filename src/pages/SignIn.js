import '../style/SignIn.css';
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { UseAuth } from '../context/auth';


function SignIn() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setAuthTokens } = useAuth();

    function postLogin() {
      axios.post("https://accounts.google.com/o/oauth2/v2/auth?",null, {params:{
        userName,
        password,
        client_id: '1012272884295-oj9v46cl35rssdargirp23k7a7n75gvg.apps.googleusercontent.com',
        client_secret: 'VkA-vIC38t3BQN9NMVRWQba5'
      }
      }).then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      }).catch(e => {
        setIsError(true);
      });
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
        <Test />
        <div> 
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </div>
      </div>
    );
}

function Test(){
    return(

      <div id="logreg-forms">
        <form className="form-signin">
            <h1 className="h5 mb-5 font-weight-normal" style={{textAlign: 'center'}}> Willkommen zu PARTS4GAMES</h1>
            <h2 className="h5 mb-5 font-weight-normal" style={{textAlign: 'center'}}> Du musst dich erst mit deinen Google-Account anmelden</h2>
            <div class="social-login" style={{textAlign:'center'}}>
                <button onClick={postLogin} class="btn google-btn social-btn" type="button" href=""><span><i className="fab fa-google-plus-g"></i> Anmelden mit Google</span> </button>
            </div>
        </form>
        <form action="/signup/" className="form-signup">
            <div className="social-login">
                <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign up with Google</span> </button>
            </div>
        </form>
      </div>

    );
  
}

export default SignIn;