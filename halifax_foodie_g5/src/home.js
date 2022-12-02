import './App.css';
import React , {useState} from 'react';
import S3FileUpload from 'react-s3/lib/ReactS3';
import { uploadFile } from 'react-s3';
import ReactS3 from 'react-s3';
import S3 from "react-aws-s3";
import { json } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';  
import Feedback from "./Feedback";
import UploadRecipe from "./UploadRecipe";
import e from 'cors';
window.Buffer = window.Buffer || require("buffer").Buffer;

function Home() {
  const navigate = useNavigate();
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const restaurantId = 'restaurant1@res.ca';
  
  return ( 
    <div className="home_title" align = "center">
        <div><h1>Halifax Foodies</h1></div>
        <div>
            <button onClick={() => navigate('/uploadRecipe', { state : {restaurantID : restaurantId} }) }> Upload Recipe</button>
            <button onClick={() => navigate('/feedback', { state : {restaurantID : restaurantId} }) }> Get Feedback</button>
            <button onClick={() => navigate('/RestaurantRecipes', { state : {restaurantID : restaurantId} }) }>Our Recipes</button>
        </div>
    </div>
  )
}
export default Home;