import '../App.css';
import React , {useState, useEffect} from 'react';
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

  useEffect(() => {
    if( state == "" || state == null){
    navigate.push('/');
    }
    else{
        console.log(state.restaurantID)
        const restaurantId = state.restaurantID
    //   setRestaurantId(state.restaurantID)
      console.log(restaurantId)

      const giveFeedback = async () =>{
        debugger
        console.log(restaurantId)
            await fetch("https://kjsdpccsruapocfyv3ogk4r3p40cxvnp.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
            restaurantId: restaurantId,
            feedback: feedback
            })
        })
        .then((res) => res.json()).then((res)=>{
            if(res.status){
                // setListOfRecipes(res.data);
            }
            else{
            alert("Error in finiding feedbacks.")
            }
        }); 
        }
        giveFeedback();
    }
}, []);


  return ( 

    <div>
        <div className="home_title" align = "center"><h1>Halifax Foodies</h1></div>
        <div className="home_title" align = "center"><h3>Restaurant Id : {restaurantId}</h3></div>
        <br></br>
        <div align="center">
            <form>
                <div>
                <input type="text" id="feedback" name="feedback" onChange={(e) => setFeedback(e.target.value)} placeholder="Give Your Feedback"></input>
                </div>
                <div>
                <input type="submit" value="Submit"></input>
                </div>
            </form>
     </div>
    </div>
  )
}
export default GiveFeedback;