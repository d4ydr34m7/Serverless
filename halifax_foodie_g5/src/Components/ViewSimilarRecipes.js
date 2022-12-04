import '../App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useHistory, Link, useLocation} from 'react-router-dom';
import { Container, Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
window.Buffer = window.Buffer || require("buffer").Buffer;

function ViewSimilarRecipes() 
{
  const navigate = useHistory();
  const { state } = useLocation();
  let [listOfRecipes, setListOfRecipes] = useState([]);
  let [listOfIngredients, setListOfIngredients] = useState([]);
  let [listOfRec, setListOfRec] = useState([]);
  let [listOfResId, setListOfRestId] = useState([]);
  const [count, setCount] = useState(-1);
  const restaurantId = state.restaurantId
  let ingre = ""

  const state1 = JSON.parse(localStorage.getItem("user"))
  
  const userId = state1.email

  useEffect(() => {
    if( state == "" || state == null){
    navigate.push('/');
    }
    else{
        const ingredients = state.ingredients
        console.log(ingredients)
        debugger

        const findLableForAllRecipes = async (ind) => {
            await fetch("http://localhost:8080/" , {
            method: "POST",
            body: JSON.stringify({
            text: ind
            })
        })
        .then((res) => res.json()).then((res)=>{
            debugger

            // if(res.status){
            //     setListOfRecipes(res.data);
            // }
            // else{
            // alert("Error in finiding feedbacks.")
            // }
        }); 
          }

          async function setData() {
            debugger
            listOfRecipes.map((recipes) => {
                listOfRec.push(recipes.RecipeName)
                recipes.RecipeIngredients.map((i) => { {ingre = ingre+","+i} })
                listOfIngredients.push(ingre)
                ingre = ""
                listOfResId.push(recipes.ResId)
              })
              console.log(listOfResId)
              console.log(listOfRec)
              console.log(listOfIngredients)
          }

        const fetchAllRecipes = async () => {
            debugger
            await fetch("https://nfeqvjhkjhzexerehls4dm3eau0wlyfw.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
              restaurantId: restaurantId
            })
          })
          .then((res) => res.json()).then((res)=>{
            if(res.status){
                setListOfRecipes(res.data);
                console.log(listOfRecipes)
                // console.log(listOfRecipes);
                //   listOfIngredients.map((ind) => {
                //     console.log(ind);
                //     findLableForAllRecipes(ind);
                //   })
            }
            else{
              alert("Error in finiding Recipes.")
            }
          });

          listOfRecipes.map((recipes) => {
            listOfRec.push(recipes.RecipeName)
            recipes.RecipeIngredients.map((i) => { {ingre = ingre+","+i} listOfIngredients.push(ingre)})
            listOfResId.push(recipes.ResId)
          })

          listOfIngredients.map((ind) => {
            console.log(ind)
            findLableForAllRecipes(ind)
          })

        //   await setData();

        }

        const fetchRecipes = async () => {
            await fetch("http://localhost:8080/" , {
            method: "POST",
            body: JSON.stringify({
            text: ingredients
            })
        })
        .then((res) => res.json()).then((res)=>{
            debugger
            if(res.status){
                setListOfRecipes(res.data);
            }
            else{
            alert("Error in finiding feedbacks.")
            }
        }); 
        }
        fetchAllRecipes();
        // fetchRecipes();
    }
}, []);


  return ( 
    <div>
        <div className="home_title" align = "center"><h1>Halifax Foodies</h1></div>
        <br></br>
        <div>
          <div className="home_title" align = "center"><h2>Our Recipes</h2></div>
          <div align = "center">
              
          </div>
        </div>
    </div>
  )
}
export default ViewSimilarRecipes;