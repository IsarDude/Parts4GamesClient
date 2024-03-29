import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import './App.css';

import SignIn from "./pages/SignIn";

import { AuthContext } from "./context/auth";
import PartsForGames from './pages/PartsForGames';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  console.log(localStorage);
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Route exact path="/" component={SignIn} />
          <PrivateRoute path="/Parts4Games" component={PartsForGames} />
        </div>
      </Router>
    </AuthContext.Provider>
    

  );
}

export default App;
