import react from 'react';
import { Button } from "react-bootstrap";
import { UseAuth } from "../context/auth";
import GameList from "../components/GameList";

function PartsForGames(props){
    
    const { setAuthTokens } = UseAuth();

    function logOut() {
        setAuthTokens();
    }
    return(
        <div>
            <GameList />
           
        </div>
    );

}

export default PartsForGames;