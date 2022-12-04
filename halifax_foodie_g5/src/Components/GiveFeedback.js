import '../App.css';
import React , {useState, useEffect} from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useHistory, Link, useLocation} from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

function GiveFeedback() 
{
  const navigate = useHistory();
  const { state } = useLocation();
  const [feedback,setFeedback] = useState("");
  const restaurantId = state.restaurantId
  const state1 = JSON.parse(localStorage.getItem("user"))
  const userId = state1.email

//   useEffect(() => {
    if( state == "" || state == null){
    navigate.push('/');
    }
    else{
        const restaurantId = state.restaurantId
    //   setRestaurantId(state.restaurantID)
      console.log(restaurantId)
      debugger
      const giveFeedbacktoRes =  async () =>{
            await fetch("https://czv4qrzjyxswse2tsyma7kbsfa0mymuv.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
            restaurantId: restaurantId,
            feedback: feedback,
            userId: userId
            })
        })
        .then((res) =>{
            debugger
            if(res.status){
                alert("Inserted...")
                // setListOfRecipes(res.data);
            }
            else{
            alert("Error in finiding feedbacks.")
            }
        })
        .catch((error) =>{
            debugger
        }); 
        }
        // giveFeedback();
    
// }, []);


  return ( 

    <div>
        <div className="home_title" align = "center"><h1>Halifax Foodies</h1></div>
        <div className="home_title" align = "center"><h3>Restaurant Id : {restaurantId}</h3></div>
        <br></br>
        <div align="center">
            <div>
            <form>
                <div>
                <input type="text" id="feedback" name="feedback" onChange={(e) => setFeedback(e.target.value)} placeholder="Give Your Feedback"></input>
                </div>
            </form>
            </div>
            <div>
                <button onClick={() => {giveFeedbacktoRes()}}> Give Feedback</button>
            </div>
        </div>
    </div>
  )
    }
}
export default GiveFeedback;