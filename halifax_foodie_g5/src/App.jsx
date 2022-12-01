import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Order from "./Components/FoodItem";
import FoodReview from "./Components/FoodReview";
import MultiFactor from "./Components/MultiFac";
import ChatMod from "./Components/ChatMod";
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

          </Switch>
        </Router>
      )}
      
    {/* </div> */}
    </>
  );
}

export default withAuthenticator(App);