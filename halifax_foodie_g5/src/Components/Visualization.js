import '../App.css';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

function Visualization() {
  const navigate = useHistory();
  const { state } = useLocation();
  
  const state1 = JSON.parse(localStorage.getItem("user"))

  const userId = state1.email

  useEffect(() => {
    if (state == "" || state == null) {
      navigate.push('/');
    }
    else {
      const restaurantId = state.restaurantId
      const fetchFeedbacks = async () => {
        // https://www.freecodecamp.org/news/fetch-data-react/
        await fetch("https://tcwaak3y3in6wz5vv3xyg3h3xu0raiiy.lambda-url.us-east-1.on.aws/", {
          method: "POST",
          body: JSON.stringify({
            restaurantId: restaurantId
          })
        })
          .then((res) => res.json()).then((res) => {
            if (res.body) {
              
            }
            else {
              alert("Error in finiding data.")
            }
          })
      }
      fetchFeedbacks();
    }
  }, []);

  return (
    <div>
      <div className="home_title" align="center"><h1>Halifax Foodies</h1></div>
      <br></br>
      <div>
        <div className="home_title" align="center"><h2>Visualization</h2></div>
        <div align="center">
        <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/null" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  )
}
export default Visualization;