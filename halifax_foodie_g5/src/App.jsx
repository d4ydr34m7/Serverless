import React from "react";
import { Route,BrowserRouter as Router, Switch } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Order from "./Components/FoodItem";
import FoodReview from "./Components/FoodReview";
import MultiFactor from "./Components/MultiFac";
import ChatMod from "./Components/ChatMod";
import CustomerHome from "./Components/CustomerHome";
import RestaurantHome from "./Components/RestaurantHome";
import Feedback from "./Components/Feedback";
import RestaurantRecipes from "./Components/RestaurantRecipes";
import UploadRecipe from "./Components/UploadRecipe";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "../src/baseClass.css";
import './App.css'


function App() {
  return (
    // <div className="App">
    <>
      {/* <Router>
        <Routes>
          
        </Routes>
      </Router> */}

      {!JSON.parse(localStorage.getItem("IsQuestion")) ? (
        <Router>
          <Switch>
            <Route exact path="/" component={MultiFactor} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>    
            <Route exact path="/" component={MainPage} />
            <Route exact path="/question" component={MultiFactor} />
            <Route exact path="/giveratings" component={FoodReview} />
            <Route exact path="/orderFood" component={Order} />
            <Route exact path="/chatRoom" component={ChatMod} />
            <Route exact path="/customerHome" component={CustomerHome} />
            <Route exact path="/restaurantHome" component={RestaurantHome} />
            <Route exact path="/viewFeedback" component={Feedback} />
            <Route exact path="/recipesRestaurant" component={RestaurantRecipes} />
            <Route exact path="/uploadRecipe" component={UploadRecipe} />
            </Switch>
        </Router>
      )}
      
    {/* </div> */}
    </>
  );
}

export default withAuthenticator(App);