import '../App.css';
import React , {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useHistory, Link} from 'react-router-dom';  

window.Buffer = window.Buffer || require("buffer").Buffer;

function RestaurantHome() {
  const history = useHistory();
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const restaurantId = 'restaurant1@res.ca';
  
  return ( 
    <div className="home_title" align = "center">
        <div><h1>Halifax Foodies</h1></div>
        <div>
            <button onClick={() => history.push('/uploadRecipe', { state : {restaurantID : restaurantId} }) }> Upload Recipe</button>
            <button onClick={() => history.push('/feedback', { state : {restaurantID : restaurantId} }) }> Get Feedback</button>
            <button onClick={() => history.push('/RestaurantRecipes', { state : {restaurantID : restaurantId} }) }>Our Recipes</button>
        </div>
    </div>
  )
}
export default RestaurantHome;