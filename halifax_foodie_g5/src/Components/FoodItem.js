import React, { Component } from "react";
import { withRouter } from "react-router";
import { useLocation } from "react-router";
import { useState } from "react";
import axios from "axios";
import "./foodItem.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";



export class OrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //https://blog.logrocket.com/localstorage-javascript-complete-guide/
      user: JSON.parse(localStorage.getItem("user")),
      items: [],
    };
  }

  async componentDidMount() {
    // var body = {
    //   body: this.state.user.username,
    // };

    await axios
      .post(
        "https://vpivmqqpa1.execute-api.us-east-1.amazonaws.com/default/getfood",

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            },

          // body: JSON.stringify(body),
        }
      )
      .then((response) => {
        response = JSON.parse(response.data.body);
        this.setState({
          items: response[0].food,
        });
      });
  }

  //https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
  async orderitem(row) {
    const itemBody = {
      foodName: row["foodName"],
      foodId: row["foodId"],
      price: row["price"],
      userName: this.state.user.email,
    };

    try {
      let result = await axios.post(
        "https://vpivmqqpa1.execute-api.us-east-1.amazonaws.com/default/addorder",

        JSON.stringify(itemBody),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("re", result);
      
      alert("Ordered " + row["foodName"] + " Successfully");
      this.props.history.push("/giveratings", { foodId: itemBody.foodId });
    } catch (error) {
      console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
    }
  }



  render() {
    return (
      <Container>
        <Row className="to-do-list-items">
          <Col md={12} lg={6}>
            <div>
              <h3>Order Your Food</h3>
              {/* https://react-bootstrap.github.io/components/cards/ */}
              {this.state.items.map((row) => (
                <Card className="card-content-incomplete">
                  <Row className="card-item">
                    <Col xs={3} md={5} className="card-item-content">
                      <Card.Body>
                        <Card.Title>Food: {row.foodName}</Card.Title>
                        <Card.Title>Price: ${row.price}</Card.Title>
                      </Card.Body>
                    </Col>
                    <Col xs={3} md={5} className="card-item-content">
                      <Button
                        className="add-button"
                        onClick={() => this.orderitem(row)}
                      >
                        Place your Order
                      </Button>
                      <div></div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    );
  }
}

export default withRouter(OrderFood);