import './App.css';
import React , {useState} from 'react';
import S3FileUpload from 'react-s3/lib/ReactS3';
import { uploadFile } from 'react-s3';
import ReactS3 from 'react-s3';
import S3 from "react-aws-s3";
import { json } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';  
import Feedback from "./Feedback";
import UploadRecipe from "./UploadRecipe";
import Home from "./home"
import RestaurantRecipes from "./RestaurantRecipes"
import SimilarRecipes from "./SimilarRecipes"
import CustomerHome from "./CustomerHome"
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const navigate = useNavigate();
  return ( 
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/uploadRecipe" element={<UploadRecipe />} />
          <Route path="/RestaurantRecipes" element={<RestaurantRecipes />} />
          <Route path="/RestaurantRecipes" element={<RestaurantRecipes />} />
          <Route path="/SimilarRecipes" element={<SimilarRecipes />} />
          <Route path="/CustomerHome" element={<CustomerHome/>}/>
      </Routes>
  )
}
export default App;