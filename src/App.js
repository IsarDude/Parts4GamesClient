import React, {useState} from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { AuthContext } from "./context/auth";
import PartsForGames from './pages/PartsForGames';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={false}>
      <Router>
        <div>
          <Route exact path="/" component={PartsForGames} />
          <PrivateRoute path="/Parts4Games" component={PartsForGames} />
        </div>
      </Router>
    </AuthContext.Provider>
    

  );
}

export default App;
