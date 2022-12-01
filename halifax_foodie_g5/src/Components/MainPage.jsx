import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {Auth} from 'aws-amplify';
import LexChat from "react-lex";
import { Col, Row, Button } from "react-bootstrap";


export default function MainPage() {
  let [loggedInUser,setLoggedInUser] = useState(null)           //const
  const getLoggedInUserRole = localStorage.getItem("Role");
  let navigate = useHistory();


  useEffect(() => {
      getLoggedInUser()
  }, [])

  let uploadRecipe = () => {
    navigate.push("/uploadRecipe");
  };

  let orderFood = () => {
    navigate.push("/orderFood");                          
  };


  let chatRoom = () => {
    navigate.push("/chatRoom");
  };
 
  let visualization = () => {
    navigate.push("/visualize");
  };


 async function getLoggedInUser() {
      try {
          let getUser = await Auth.currentAuthenticatedUser({
              bypassCache: false
          })
          setLoggedInUser({...getUser.attributes, role: getUser.storage?.getItem('Role')});
          localStorage.setItem('currentUser', JSON.stringify({...getUser.attributes, role: getUser.storage?.getItem('Role')}))
      } catch(error) {
          navigate.push('/')
      }
  }

  let logOut = () => {
    localStorage.clear();
    window.location.reload();
    navigate.push("/");
  };


  
  return (
    <div className="p-5">
      <Col className="card-item-content"> 
        <Row className="card-item">
          {getLoggedInUserRole.toLowerCase() == "customer" ? (
            <Button className="add-button" onClick={() => orderFood()}>
              Order Food
            </Button>
          ) : (<div></div>
          )}
        </Row>
        
        <Row className="card-item">
          <Button className="add-button" onClick={() => visualization()}>
            Visualization
          </Button>
        </Row>
        <Row className="card-item">
          {getLoggedInUserRole.toLowerCase() == "customer" ? (<div></div>
          ) : (
            <Button className="add-button" onClick={() => uploadRecipe()}>
              Recipe Upload
            </Button>
          )}
        </Row>
        <Row className="card-item">
          <Button className="add-button" onClick={() => logOut()}>
            Logout
          </Button>
        </Row>
        <Row className="card-item">
          <Button className="add-button" onClick={() => chatRoom()}>
            Chat
          </Button>
        </Row>
      </Col>
      
    </div>
   
  );
}