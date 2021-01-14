import react from 'react';
import { Button } from "react-bootstrap";
import { useAuth } from "../context/auth";

function PartsForGames(props){
    
    const { setAuthTokens } = useAuth();

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