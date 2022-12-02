import './App.css';
import React , {useState, useEffect} from 'react';
import S3FileUpload from 'react-s3/lib/ReactS3';
import { uploadFile } from 'react-s3';
import ReactS3 from 'react-s3';
import S3 from "react-aws-s3";
import { json } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom'; 
window.Buffer = window.Buffer || require("buffer").Buffer;

function SimilarRecipes()
{
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if( state == "" || state == null){
    navigate('/home');
    }
    // else{
    //     const recipeName = state.recipeName
    //     const fetchFeedbacks = async () =>{
    //       await fetch("https://2qxf4xurjj355lmw7w3ghxb4pe0hdqmg.lambda-url.us-east-1.on.aws/" , {
    //         method: "POST",
    //         body: JSON.stringify({
    //           recipeName: recipeName
    //         })
    //       })
    //       .then((res) => res.json()).then((res)=>{
            
    //         if(res.status){
    //             setListOfFeedbacks(res.data);
    //         }
    //         else{
    //           alert("Error in finiding feedbacks.")
    //         }
    //       });
    //       }
    //       fetchFeedbacks();
    //   }
}, []);

  return ( 
    <div>
        <div className="home_title" align = "center"><h1>Halifax Foodies</h1></div>
        <br></br>
        <div>
          <div className="home_title" align = "center"><h2>User Feedbacks</h2></div>
          <h1>{state.recipeName}</h1>
          {/* <div align = "center">
            {listOfFeedbacks.map((userFeedback) => {return (<div class="box" align = "left"><h3>FeedBack : {userFeedback.Feedback} <br></br> Polarity : {userFeedback.Polarity} <br></br> User id : {userFeedback.UserID}</h3></div>)})}
          </div> */}
        </div>
    </div>
  )
}

export default SimilarRecipes;