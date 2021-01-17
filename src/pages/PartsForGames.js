import React, {useState} from 'react';
import { Button } from "react-bootstrap";
import { UseAuth } from "../context/auth";
import GameList from "../components/GameList";
import RamList from '../components/RamList';
import ConfigList from '../components/ConfigList';

function PartsForGames(props){
    
    const { setAuthTokens } = UseAuth();
    const [newRamToAdd, setNewRamToAdd] = useState({});
    const [ramChanged,setRamChanged] = useState(false);

    function addRamToConfigList(aRam){
        setNewRamToAdd(aRam);
        setRamChanged(true);
    }

    function notifyRamCreated(){
        setRamChanged(false);
    }

    function logOut() {
        setAuthTokens();
    }
    return(
        <div>
        <div className="d-flex justify-content-between m-4">
            <GameList />
            <RamList  addRam ={addRamToConfigList}/>
        </div>
             <ConfigList newRam = {newRamToAdd} ramChanged={ramChanged} notifyParent={notifyRamCreated}/>
        </div>
    );

}

export default PartsForGames;