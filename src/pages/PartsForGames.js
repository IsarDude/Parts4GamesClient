import react from 'react';
import { Button } from "react-bootstrap";
import { UseAuth } from "../context/auth";

function PartsForGames(props){
    
    const { setAuthTokens } = UseAuth();

    function logOut() {
        setAuthTokens();
    }
    return(
        <div>
            <Button onClick={logOut}>Log out</Button>
        </div>
    );

}

export default PartsForGames;