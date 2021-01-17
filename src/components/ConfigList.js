import React, {useState} from 'react';
import axios from 'axios';
import { Card, CardDeck, Row, Col, Button } from 'react-bootstrap';



function ConfigList(props){
    const [configListing, setConfigListing] = useState([]);
    const [selectedConfig, setSelectedConfig] = useState({});
    
    function addNewRam(newRam){
        var url ="localhost:8080/Parts4Games/config/" + selectedConfig.configId + "/ram";
        if(Object.keys(selectedConfig).contains("selectedRAM")){
            axios.put(url, {data: {newRam}})
            .then(res => {
               if(JSON.stringify(newRam) === JSON.stringify(res.data)){
                   getConfig(selectedConfig.configId);
               }
            })
        }else {
            axios.post(url)
            .then(res => {
                var list = configListing.add(res.data);
                setConfigListing(list);
            })
        }
    }
    
    

    function createNewConfig(){
        var url = "localhost:8080/Parts4Games/config"
        axios.post(url)
        .then(res => {
            var list = configListing.add(res.data);
            setConfigListing(list);
        })
    }
    function getConfig(configId){
        var url = "localhost:8080/Parts4Games/config/" + configId;
        axios.get(url)
        .then(res => {
            var newConfig = res.data;
            configListing.forEach((config,k) => {
                if(config.configId === configId){
                    var list = configListing;
                    list[k]=newConfig;
                    setConfigListing(list);
                    setSelectedConfig(newConfig);
                }
            })
        })
    }

    function deleteConfig(){
        var configId= selectedConfig.configId;
        var url = "localhost:8080/Parts4Games/config/" + configId;
        axios.delete(url)
        .then(res => {
            if(res.status === 200){
                configListing.forEach((config,key) =>{
                    if(config.configId === configId){
                        var list = configListing.splice(key);
                        setConfigListing(list);
                    }
                })
            }
        })
    }

    function buildConfig(){
       var map =  configListing.map((config, k ) => {
        var ram = config.selectedRAM;
        return(
            <CardDeck data-key = {k} onClick={(e) => {setSelectedConfig(configListing[e.target.dataset.k])}} border={config.configId === selectedConfig.configId ? "primary":""}>
                    <Card.Header>Config {k}</Card.Header>
                    <Card.Body>
                        <Card.Title>{ram.brand + " " + ram.model}</Card.Title>
                        {Object.keys(ram).map(key => {
                           return(
                               <Row>
                                   <Col>{key}</Col>
                                   <Col>{ram[key]}</Col>
                               </Row>
                           )
                        })}
                    </Card.Body>
            </CardDeck>
        )
    })
    return map;
    }

    return(
        <div>
            {buildConfig}
        <Button variant="primary" onClick= {createNewConfig}>Add Config</Button>
        <Button variant="secondary" onClick={deleteConfig}>Delete</Button>
        </div>

    );
}

export default ConfigList;