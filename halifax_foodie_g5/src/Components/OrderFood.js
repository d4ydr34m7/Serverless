import '../App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useHistory, Link, useLocation} from 'react-router-dom';
import { Container, Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
window.Buffer = window.Buffer || require("buffer").Buffer;

function OrderFood()
{
    const navigate = useHistory();
  const { state } = useLocation();
  const [listOfRecipes, setListOfRecipes] = useState([]);
  const restaurantId = state.restaurantId
  const userId = localStorage.getItem("user")

  useEffect(() => {
    if( state == "" || state == null){
    navigate.push('/');
    }
    else{
        const restaurantId = state.restaurantId

        const fetchRecipes = async () =>{
            await fetch("https://kjsdpccsruapocfyv3ogk4r3p40cxvnp.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
            restaurantId: restaurantId
            })
        })
        .then((res) => res.json()).then((res)=>{
            if(res.status){
                setListOfRecipes(res.data);
            }
            else{
            alert("Error in finiding feedbacks.")
            }
        }); 
        }
        fetchRecipes();
    }
}, []);

  return ( 
    <Container>
        <Row className="to-do-list-items">
          <Col md={12} lg={6}>
            <div>
              <h3>Order Your Food</h3>
              {/* https://react-bootstrap.github.io/components/cards/ */}
              {/* {this.state.items.map((row) => ( */}
                <Card className="card-content-incomplete">
                  <Row className="card-item">
                    <Col xs={3} md={5} className="card-item-content">
                      <Card.Body>
                        <Card.Title>Food: </Card.Title>
                        <Card.Title>Price: </Card.Title>
                      </Card.Body>
                    </Col>
                    <Col xs={3} md={5} className="card-item-content">
                      <Button
                        className="add-button"
                        onClick={() => this.orderitem()}
                      >
                        Place your Order
                      </Button>
                      <div></div>
                    </Col>
                  </Row>
                </Card>
              {/* ))} */}
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
  )
}

export default OrderFood;