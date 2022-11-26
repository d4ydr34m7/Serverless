import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Order from "./Components/orderFood";
import FoodReview from "./Components/FoodReview";
import Recipe from "./Components/uploadRecipe";
import MultiFactor from "./Components/MultiFac";
import RealTimeChat from "./Components/RealTimeChat";

// import UserPool from './UserPool'


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
            <Route exact path="/order" component={Order} />
            <Route exact path="/chat" component={RealTimeChat} />
            <Route exact path="/recipeupload" component={Recipe} />

          </Switch>
        </Router>
      )}
      
    {/* </div> */}
    </>
  );
}

export default withAuthenticator(App);