import '../App.css';
import React , {useState, useEffect} from 'react';
import {Auth} from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route, useHistory, useLocation} from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

function CustomerHome() 
{
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const { state } = useLocation();
  const navigate = useHistory();
  let [loggedInUser,setLoggedInUser] = useState(null);
  console.log(localStorage.getItem("Role"))

  useEffect(() => {
    getLoggedInUser()
    if(localStorage.getItem("IsQuestion") && localStorage.getItem("Role") == "customer")
    {
      // if(localStorage.getItem("Role") != "customer" || localStorage.getItem("Role") == "owner")
      // {
      //   navigate.push("/restaurantHome")
      // }
      // else
      // {
        const fetchRestaurant = async()  =>{
          await fetch("https://rcwj3zngybl7o3oa24yyxhtyiu0pdqaz.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
              
            })
          })
          .then((res) => res.json()).then((res)=>{
            if(res.status){
                setListOfRestaurants(res.data);
            }
            else{
              alert("Error in fetching restaurants.")
            }
          })
          }
          fetchRestaurant();
      // }
    }
    else
    {
      logOut();
    }
    },[]);

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
    navigate.push('/');
  };
  
  return ( 
    <div className="home_title" align = "center">
        <div><h1>Halifax Foodies</h1></div>
        <div><button onClick={() => logOut() }>Log Out</button></div>
        <div>
        <table id="restaurants">
            <tr>
                <th>Restaurant Name</th>
                <th>Restaurant Id</th>
                <th>Contact</th>
                <th>Address</th>
                <th>View Food items</th>
            </tr>
            {listOfRestaurants.map((restaurants) => {
              return (
                <tr>
                  <td>{restaurants.restaurantName}</td>
                  <td>{restaurants.restaurantId}</td>
                  <td>{restaurants.restaurantContact}</td>
                  <td>{restaurants.restaurantAddress}</td>
                  <td><button onClick={() => navigate.push('/RestaurantRecipe', { state : {restaurantId : restaurants.restaurantId} }) }> View Recipes</button></td>
                </tr>
                )})}
        </table>
        </div>
    </div>
  )
}
export default CustomerHome;