import react from 'react';
import { Button } from "react-bootstrap";
import { UseAuth } from "../context/auth";
import GameList from "../components/GameList";
import RamList from '../components/RamList';

function PartsForGames(props){
    
    const { setAuthTokens } = UseAuth();

    function logOut() {
        setAuthTokens();
    }
    return(
        <div className="d-flex justify-content-between m-4">
            <GameList />
            <RamList />
        </div>
    );

}

export default PartsForGames;