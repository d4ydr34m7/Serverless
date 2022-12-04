import '../App.css';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

function Visualization() {
  const navigate = useHistory();
  const { state } = useLocation();
  
  const state1 = JSON.parse(localStorage.getItem("user"))

  const userId = state1.email

  // https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    if (state == "" || state == null) {
      navigate.push('/');
    }
    else {
      const restaurantId = state.restaurantId
      const fetchFeedbacks = async () => {
        // https://www.freecodecamp.org/news/fetch-data-react/
        await fetch("url.....", {
          method: "POST",
          body: JSON.stringify({
            restaurantId: restaurantId
          })
        })
          .then((res) => res.json()).then((res) => {
            if (res.status) {
              
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
          <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/06e60249-dd2c-4e70-bf8d-253263059ad9/page/LuG9C" ></iframe>
        </div>
      </div>
    </div>
  )
}
export default Visualization;