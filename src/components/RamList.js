import React, {useState} from 'react';
import axios from 'axios';
import { ListGroup, InputGroup, FormControl, Button, ListGroupItem, Card, Form, Col, Row, Input } from 'react-bootstrap';



function RamList(props){

    const[ramList, setRamList] = useState([]);
    const[keyword, setKeyword] = useState();
    const[selectedRam, setSelectedRam]= useState({});
    const[budget, setBudget] = useState();


    function selectRam(e) {
        setSelectedRam(ramList[e.target.dataset.key]);
    }

    
    function getRamList(){
        var url = 'localhos:8080/Parts4Games/ramList'; 
        axios.get(url, {params: {keyword, budget}})
            .then(res => {
                setRamList(res.data);
            }
            );
        }

    return(
        <div style={{width:"45%"}}>
            
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Search for a RAM"
                aria-label="Search for a RAM"
                aria-describedby="basic-addon2"
                onChange={function func(e){
                    setKeyword(e.target.value);
                }}
                value={keyword}
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={getRamList}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
            <div className="d-flex">
            <ListGroup style={{width: "40%", minHeight:"15rem"}}>
                <ListGroup.Item>
                    <Row>
                        <Col><h6>Brand</h6></Col>
                        <Col><h6>Model</h6></Col>
                        <Col><h6>Capacity</h6></Col>
                    </Row>
                </ListGroup.Item>
                {ramList.map((ram,j) => {
                    return(
                        <ListGroup.Item action data-key={j} onClick={selectRam}>
                        <Row>
                            <Col>{ram.brand}</Col>
                            <Col>{ram.model}</Col>
                            <Col>{ram.totalcapacity}</Col>
                        </Row>
                               
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <div className ="ml-5">
            <Form.Label>Budget:</Form.Label>
            <Form.Control
                type= "number"
                placeholder="Budget"
                value = {budget}
                onChange = {(e) => setBudget(e.target.value)}
                className="mb-2"
            ></Form.Control>
            <Card style={{width:'100%', minHeight:"15rem"}}>
                <Card.Body >
                    <Card.Header>Details</Card.Header>
                    <ListGroup variant="flush">
                       { Object.keys(selectedRam).map(key => {
                           return(
                           <ListGroup.Item><h5>{key}:</h5> {selectRam[key]} </ListGroup.Item>
                           )
                       })    
                       }
    
                    </ListGroup>
                    
                </Card.Body>
            </Card>
            <Button onClick={() => props.addRam(selectedRam)}>Add to Config</Button>
            </div>
        </div>
        </div>
    )
}

export default RamList;