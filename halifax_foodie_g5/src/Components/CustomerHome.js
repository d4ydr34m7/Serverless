import '../App.css';
import React , {useState, useEffect} from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';  
import { BrowserRouter as Router, Routes, Route, useHistory, useLocation} from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

function CustomerHome() 
{
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    // if( state == "" || state == null){
    //   navigate('/home');
    // }
    // else{
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
    },[]);
  
  return ( 
    <div className="home_title" align = "center">
        <div><h1>Halifax Foodies</h1></div>
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
                  <td><button onClick={() => history.push('/RestaurantRecipe', { state : {restaurantId : restaurants.restaurantId} }) }> View Recipes</button></td>
                </tr>
                )})}
        </table>
        </div>
    </div>
  )
}
export default CustomerHome;