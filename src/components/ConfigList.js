import React, {useState} from 'react';
import axios from 'axios';
import { Card, CardDeck, Row, Col, Button } from 'react-bootstrap';



function ConfigList(props){
    const [configListing, setConfigListing] = useState([]);
    const [selectedConfig, setSelectedConfig] = useState({});
    const [requestinProgress, setRequestInProgress] = useState(false);
    
    
    if(props.ramChanged && !requestinProgress){
        setRequestInProgress(true);
        addNewRam(props.newRam);
        props.notifyParent();

    }

    function addNewRam(newRam){
        var url ="http://localhost:8080/Parts4Games/config/" + selectedConfig.configID + "/ram";
        
        if('selectedRAM' in selectedConfig){
            axios.put(url, newRam)
            .then(res => {
               if(JSON.stringify(newRam) === JSON.stringify(res.data)){
                   getConfig(selectedConfig.configID);
               }
            })
        }else {
            axios.post(url, newRam)
            .then(res => {
                var ram = res.data;
                var list = [...configListing];
                getConfig(selectedConfig.configID);
                setRequestInProgress(false);
            })
        }
        
    }
    
    

    function createNewConfig(){
        var url = "http://localhost:8080/Parts4Games/config"
        axios.post(url)
        .then(res => {
            var list = [...configListing];
            list.push(res.data);
            setConfigListing(list);
            setSelectedConfig(res.data);
        })
    }
    function getConfig(configID){
        var url = "http://localhost:8080/Parts4Games/config/" + configID;
        axios.get(url)
        .then(res => {
            var newConfig = res.data;
            configListing.forEach((config,k) => {
                if(config.configID === configID){
                    var list = configListing;
                    list[k]=newConfig;
                    setConfigListing(list);
                    setSelectedConfig(newConfig);
                }
            })
        })
    }

    function deleteConfig(){
        var configID= selectedConfig.configID;
        var url = "http://localhost:8080/Parts4Games/config/" + configID;
        axios.delete(url)
        .then(res => {
            if(res.status === 200){
                configListing.forEach((config,key) =>{
                    if(config.configID === configID){
                        var list = [...configListing];
                        list.splice(key,1);
                        setConfigListing(list);
                    }
                })
            }
        })
    }

    function ram(aRam){
        return (
            <Card>
                 <Card.Body>
                        <Card.Title>{aRam.brand + " " + aRam.model}</Card.Title>
                        {Object.keys(aRam).map(key => {
                           return(
                               <Row>
                                   <Col>{key}</Col>
                                   <Col>{aRam[key]}</Col>
                               </Row>
                           )
                        })}
                    </Card.Body>
            </Card>
        )
    }   

    function buildConfig(){
       var map =  configListing.map((config, k ) => {
        var ramRepresentation = new Map();
        if('selectedRAM' in config){
            ramRepresentation.set(0,ram(config.selectedRAM));
        }
        

        return(
            <CardDeck data-key = {k}  style={{width:"100%", minHeight:"100px"}} className="ml-2">
                    
                    <Card.Header style={{width: "100%"}}>Config {k}</Card.Header>
                    {ramRepresentation}
                    <Button onClick={() => {setSelectedConfig(configListing[k])}}>Select</Button>
            </CardDeck>
        )
    })
    return map;
    }
    var map = buildConfig();
    return(
        <div className="ml-2">
            {map}
        <Button variant="primary" onClick= {createNewConfig}>Add Config</Button>
        <Button variant="secondary" onClick={deleteConfig}>Delete</Button>
        </div>

    );
}

export default ConfigList;