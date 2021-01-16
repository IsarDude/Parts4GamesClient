import react, {useState} from 'react';
import axios from 'axios';
import { ListGroup, InputGroup, FormControl, Button, ListGroupItem, Card, Form } from 'react-bootstrap';



function GameList(props){

    const[gameList, setGameList] = useState([]);
    const[gameName, setGameName] = useState();
    const[selectedGame, setSelectedGame]= useState({});
    const[gameInfoDetailMin, setGameInfoDetailMin] = useState();
    const[gameInfoDetailRec, setGameInfoDetailRec] = useState();
    const[reccomended, setReccomended] = useState(true);

    
    function selectGame(e) {
        setSelectedGame(gameList[e.target.dataset.key]);
        getGameDetails(gameList[e.target.dataset.key]);
    }

    function getGameDetails(game){
        
        
        
          var urlRec= 'localhos:8080/gameInfo/'+ game.gameId;
       
          var urlMin= 'localhos:8080/gameInfo/'+ game.gameId+'/min';
        
        axios.get(urlRec)
            .then(res => {
                const gameInfo = res.data;
                setGameInfoDetailRec(gameInfo);
            }
            );
        axios.get(urlMin)
            .then(res => {
                const gameInfo = res.data;
                setGameInfoDetailMin(gameInfo);
            })
    }

    function getGameList(){
        var url = 'localhos:8080/gameList/'+ gameName; 
        axios.get(url)
            .then(res => {
                const gameList = res.data;
                setGameList(gameList);
            }
            );
        }

    return(
        <div style={{width:"45%"}}>
            
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
                        <ListGroup.Item action data-key={j} onClick={selectGame}>game.name</ListGroup.Item>
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
                    {reccomended ? gameInfoDetailRec : gameInfoDetailRec}
                </Card.Body>
            </Card>
            </div>
        </div>
        </div>
    )
}

export default GameList;