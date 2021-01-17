import React, {useState} from 'react';
import { Button } from "react-bootstrap";
import { UseAuth } from "../context/auth";
import GameList from "../components/GameList";
import RamList from '../components/RamList';
import ConfigList from '../components/ConfigList';

function PartsForGames(props){
    
    const { setAuthTokens } = UseAuth();
    const [newRamToAdd, setNewRamToAdd] = useState();

    function logOut() {
        setAuthTokens();
    }
    return(
        <div>
        <div className="d-flex justify-content-between m-4">
            <GameList />
            <RamList  addRam ={(aRam) => this.ConfigList.addRam(aRam)}/>
        </div>
             <ConfigList ref ={instance => {this.ConfigList= instance;}} />
        </div>
    );

}

export default PartsForGames;