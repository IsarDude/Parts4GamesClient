import react, {useState} from 'react';
import axios from 'axios';
import { ListGroup, InputGroup, FormControl, Button, ListGroupItem, Card } from 'react-bootstrap';



function GameList(props){

    const[gameList, setGameList] = useState([]);
    const[gameName, setGameName] = useState();
    const[selectedGame, setSelectedGame]= useState({});
    const[gameInfoDetail, setGameInfoDetail] = useState();
    const[reccomended, setReccomended] = useState(true);

    
    function selectGame(e) {
        setSelectedGame(gameList[e.target.dataset.key]);
    }

    function getGameDetails(){
        
        var url;
        if(recomended){
            url= 'localhos:8080/gameInfo/'+ selectedGame.gameId;
        } else{
            url= 'localhos:8080/gameInfo/'+ selectedGame.gameId+'/min';
        }
        axios.get(url)
            .then(res => {
                const gameInfo = res.data;
                setGameInfoDetail(gameInfo);
            }
            );
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
        <div>
            
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
            <ListGroup>
                {gameList.map((game,j) => {
                    return(
                        <ListGroup.Item action data-key={j} onClick={selectGame}>game.name</ListGroup.Item>
                    )
                })}
            </ListGroup>
            <Card>
                <Card.Body style={{width:'18rem'}}>
                    <Card.Title>Anforgderungen</Card.Title>
                    {gameInfoDetail}
                </Card.Body>
            </Card>
            
        </div>
    )
}