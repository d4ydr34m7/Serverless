import React, { Component } from "react";
import { withRouter } from "react-router";
import { Row, Button } from "react-bootstrap";
import axios from "axios";

export class FoodReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      foodRating: "",
      itemId: props.location.state.foodId,
    };
  }
  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveItem = async (event) => {
    event.preventDefault();
    const itemBody = {
      ratings: this.state.foodRating,
      username: this.state.user.username,
      foodId: this.state.itemId,
    };

    try {
      let response = await axios.post(
        "https://vpivmqqpa1.execute-api.us-east-1.amazonaws.com/default/rate",

        JSON.stringify(itemBody),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response)
      // this.cancel();
    } catch (error) {
      console.log(error)
    }
  };

  cancel = (e) => {
    this.props.history.push("/orderFood");
  };
  
  render() {
    return (
      <Row className="rating-content">
        <div>
          <h2>Please give your review</h2>
        </div>
        <div>
          <input
            type="text"
            palceholder="Add task"
            name="foodRating"
            value={this.state.foodRating}
            onChange={this.onValueChange}
          />
        </div>
        <div className="add-button">
          <Button className="primary-button" onClick={this.saveItem}>
            Submit
          </Button>
          <Button className="primary-button" onClick={this.cancel}>
            Cancel
          </Button>
        </div>
      </Row>
    );
  }
}
export default withRouter(FoodReview);