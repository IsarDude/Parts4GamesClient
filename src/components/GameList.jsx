import React, {useState} from 'react';
import axios from 'axios';
import { ListGroup, InputGroup, FormControl, Button, ListGroupItem, Card, Form } from 'react-bootstrap';



function GameList(props){

    const[gameList, setGameList] = useState([]);
    const[gameName, setGameName] = useState();
    const[selectedGame, setSelectedGame]= useState({});
    const[gameInfoDetailMin, setGameInfoDetailMin] = useState("");
    const[gameInfoDetailRec, setGameInfoDetailRec] = useState("");
    const[reccomended, setReccomended] = useState(true);

    
    function selectGame(e) {
        setSelectedGame(gameList[e.target.dataset.key]);
        getGameDetails(gameList[e.target.dataset.key]);
    }

    function getGameDetails(game){
        
        
        
          var urlRec= 'http://localhost:8080/Parts4Games/gameInfo/'+ game.gameId + "/rec";
       
          var urlMin= 'http://localhost:8080/Parts4Games/gameInfo/'+ game.gameId+'/min';
        
        axios.get(urlRec) 
            .then(res => {
                const gameInfo = res.data;
                console.log(gameInfo.hardwareRequirements);
                setGameInfoDetailRec(gameInfo.hardwareRequirements);
            }
            );
        axios.get(urlMin)
            .then(res => {
                const gameInfo = res.data;
                setGameInfoDetailMin(gameInfo.hardwareRequirements);
            })
    }

    function getGameList(){
        var url = 'http://localhost:8080/Parts4Games/gameList/'+ gameName; 
        axios.get(url)
            .then(res => {
                const gameList = res.data;
                setGameList(gameList);
            }
            );
        }

    return(
        <div style={{width:"45%"}}>
            <h3 className="mt-2 mb-2">Search for a Game</h3>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Search for a Game"
                aria-label="Search for a Game"
                aria-describedby="basic-addon2"
                onChange={function func(e){
                    setGameName(e.target.value);
                }}
                value={gameName}
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={getGameList}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
            <div className="d-flex">
            <ListGroup style={{width: "40%", minHeight:"15rem"}}>
                <ListGroup.Item><h5>Spiele</h5></ListGroup.Item>
                {gameList.map((game,j) => {
                    return(
                        <ListGroup.Item action data-key={j} onClick={selectGame}>{game.gameName}</ListGroup.Item>
                    )
                })}
            </ListGroup>
            <div className ="ml-5">
            <fieldset>
                <Form>
                    <Form.Group>
                        <Form.Check
                        type="radio"
                        label = "Minimum Requirements"
                        name="requirements"
                        id="minReq"
                        onClick = {() => setReccomended(false)}
                        />   
                        <Form.Check
                            type="radio"
                            label="Reccomended Requirements"
                            name="requirements"
                            id="recReq"
                            onClick = {() => setReccomended(true)}
                        />
                    </Form.Group>
                </Form>
            </fieldset>
            <Card style={{width:'100%', minHeight:"15rem"}}>
                <Card.Body >
                    <Card.Title>Anforgderungen</Card.Title>
                    {reccomended ? 
                    <div dangerouslySetInnerHTML={{__html: gameInfoDetailRec}}></div>
                    : <div dangerouslySetInnerHTML={{__html: gameInfoDetailMin}}></div>}
                </Card.Body>
            </Card>
            </div>
        </div>
        </div>
    );

    function buildRequirements(rec){
        var map = new Map();
       if(Object.keys(rec).length > 0){
        var arr = Object.entries(rec);
        map = arr.map(entrie =>{
            return (entrie.hardwareRequirement);
        });
        return map;
       }
       
    }
}

export default GameList;