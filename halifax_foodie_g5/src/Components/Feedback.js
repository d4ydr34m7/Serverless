import '../App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useHistory, useLocation} from 'react-router-dom'; 
window.Buffer = window.Buffer || require("buffer").Buffer;

export default function Feedback()
{
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const { state } = useLocation();
  const history = useHistory();
  
  useEffect(() => {
    if( state == "" || state == null){
    history.push('/home');
    }
    else{
        const restaurantId = state.restaurantID
        const fetchFeedbacks = async()  =>{
          await fetch("https://2qxf4xurjj355lmw7w3ghxb4pe0hdqmg.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
              restaurantId: restaurantId
            })
          })
          .then((res) => res.json()).then((res)=>{
            // debugger
            if(res.status){
                setListOfFeedbacks(res.data);
            }
            else{
              alert("Error in finiding feedbacks.")
            }
          })
          }
        fetchFeedbacks();
      }
},[]);

  return ( 
    <div>
        <div className="home_title" align = "center"><h1>Halifax Foodies</h1></div>
        <br></br>
        <div>
          <div className="home_title" align = "center"><h2>User Feedbacks</h2></div>
          <div align = "center">
            {/* {listOfFeedbacks.map((userFeedback) => {return (<div class="box" align = "left"><h3>FeedBack : {userFeedback.Feedback} <br></br> Polarity : {userFeedback.Polarity} <br></br> User id : {userFeedback.UserID}</h3></div>)})} */}
            <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/06e60249-dd2c-4e70-bf8d-253263059ad9/page/LuG9C" ></iframe>
          </div>
        </div>
    </div>
  )
}

