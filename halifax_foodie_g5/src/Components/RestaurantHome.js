import '../App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useHistory, Link} from 'react-router-dom';
import {Auth} from 'aws-amplify';  
window.Buffer = window.Buffer || require("buffer").Buffer;

function RestaurantHome() {
  const navigate = useHistory();
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  let [loggedInUser,setLoggedInUser] = useState(null);
  const getLoggedInUserRole = localStorage.getItem("Role");
  const restaurantId = 'restaurant1@res.ca';
  console.log(console.log(localStorage.getItem("Role")))

  //https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    getLoggedInUser()
    if(localStorage.getItem("IsQuestion") && localStorage.getItem("Role") == "owner")
    {
      
    }
    else
    {
      debugger
      logOut();
    }
  }, [])

  //https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
 async function getLoggedInUser() {
  try {
      let getUser = await Auth.currentAuthenticatedUser({
          bypassCache: false
      })
      setLoggedInUser({...getUser.attributes, role: getUser.storage?.getItem('Role')});
      localStorage.setItem('currentUser', JSON.stringify({...getUser.attributes, role: getUser.storage?.getItem('Role')}))
  } catch(error) {
      navigate.push('/')
  }
}
  
  let logOut = () => {
    localStorage.clear();
    window.location.reload();
    navigate.push("/");
  };
  
  return ( 
    <div className="home_title" align = "center">
        <div><h1>Halifax Foodies</h1></div>
        <div>
            <button onClick={() => navigate.push('/uploadRecipe', { state : {restaurantID : restaurantId} }) }> Upload Recipe</button>
            <button onClick={() => navigate.push('/feedback', { state : {restaurantID : restaurantId} }) }> Get Feedback</button>
            <button onClick={() => navigate.push('/RestaurantRecipes', { state : {restaurantID : restaurantId} }) }>Our Recipes</button>
            <button onClick={() => logOut() }>Log Out</button>
        </div>
    </div>
  )
}
export default RestaurantHome;