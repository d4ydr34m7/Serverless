import '../App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useHistory, Link, useLocation } from 'react-router-dom';
import { Container, Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
import { getFormDataFromEvent } from '@aws-amplify/ui';
window.Buffer = window.Buffer || require("buffer").Buffer;

function ViewSimilarRecipes() {
  const navigate = useHistory();
  const { state } = useLocation();
  const [listOfRecipes, setListOfRecipes] = useState([]);

  const [listOfIngredients, setListOfIngredients] = useState([]);
  const [listOfRec, setListOfRec] = useState([]);
  const [listOfResId, setListOfRestId] = useState([]);
  let labelOfRecipe = "";
  const [finalList, setFinalList] = useState([]);
  const [modelOutput, setModelOutput] = useState([]);
  const restaurantId = state.restaurantId;
  const ingredients = state.ingredients;
  let ingre = "";
  let count = 0;

  const state1 = JSON.parse(localStorage.getItem("user"))

  const userId = state1.email

  const getLabelForAllRecipes = async (ingredients) => {
    
    await fetch("http://localhost:8080/", {
      method: "POST",
      body: JSON.stringify({
        text: ingredients
      })
    })
      .then((res) => res.json()).then((res) => {
        if (res.length) {
          if(res[0].confidence > res[1].confidence)
          {
            modelOutput.push("VEG")
          }
          else{
            modelOutput.push("NON-VEG")
          }
        }
        else {
          alert("Error in finiding feedbacks.")
        }
      });
      console.log("modelOutput : ", modelOutput)
  }

  
  console.log("modelOutput : ", modelOutput)
  const getLabel = async (ingredients) => {
    
    await fetch("http://localhost:8080/", {
      method: "POST",
      body: JSON.stringify({
        text: ingredients
      })
    })
      .then((res) => res.json()).then((res) => {
        if (res.length) {
          if(res[0].confidence > res[1].confidence)
          {
            labelOfRecipe = "VEG";
          }
          else{
            labelOfRecipe = "NON_VEG";
          }
        }
        else {
          alert("Error in finiding feedbacks.")
        }
      });
      console.log("Label : ", labelOfRecipe);
  }

  useEffect(() => {
    if (state == "" || state == null) {
      navigate.push('/');
    }
    else {
      const ingredients = state.ingredients
      console.log(ingredients)


      // const findLableForAllRecipes = async (ind) => {
      //   await fetch("http://localhost:8080/", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       text: ind
      //       // ind: "tomato,onions"
      //     })
      //   })
      //     .then((res) => res.json()).then((res) => {

      //       // if(res.status){
      //       //     setListOfRecipes(res.data);
      //       // }
      //       // else{
      //       // alert("Error in finiding feedbacks.")
      //       // }
      //     });
      // }

      const fetchAllRecipes = async () => {
        await fetch("https://nfeqvjhkjhzexerehls4dm3eau0wlyfw.lambda-url.us-east-1.on.aws/", {
          method: "POST",
          body: JSON.stringify({
            restaurantId: restaurantId
          })
        })
          .then((res) => res.json()).then((res) => {
            if (res.status) {
              setListOfRecipes(res.data); //async
              // queue entry
              console.log(listOfRecipes)
              // console.log(listOfRecipes);
              //   listOfIngredients.map((ind) => {
              //     console.log(ind);
              //     findLableForAllRecipes(ind);
              //   })
            }
            else {
              alert("Error in finiding Recipes.")
            }
          });

        // listOfRecipes.map((recipes) => {
        //   listOfRec.push(recipes.RecipeName)
        //   recipes.RecipeIngredients.map((i) => { { ingre = ingre + "," + i } listOfIngredients.push(ingre) })
        //   listOfResId.push(recipes.ResId)
        // })

        // listOfIngredients.map((ind) => {
        //   console.log(ind)
        //   findLableForAllRecipes(ind)
        // })
      }

      getLabel(ingredients);
      fetchAllRecipes();

    }
  }, []);

  useEffect(() => {
    console.log("list of recipes: ", listOfRecipes);
    let ingredients = [];
    if (listOfRecipes.length > 0) {
      listOfRecipes.forEach(list => {
        let recipe = list.RecipeIngredients.join(",");
        let recipeName = list.RecipeName;
        let restaurantId = list.ResId;
        // ingredients += list.RecipeIngredients.join(",") + ",";
        ingredients.push(recipe);
        listOfRec.push(recipeName);
        listOfResId.push(restaurantId);
      });
      // ingredients : [ "" ]

      console.log("ingredients: ", ingredients);
      console.log("listOfRec: ", listOfRec);
      console.log("listOfResId: ", listOfResId);
      
      ingredients.forEach(ingredientsElement => {
        getLabelForAllRecipes(ingredientsElement)
      })
    }
  }, [listOfRecipes])

  useEffect(() => {

    if(modelOutput.length > 0){
    return (
      <div>
        <div className="home_title" align="center"><h1>Halifax Foodies</h1></div>
        <br></br>
        <div>
          <div className="home_title" align="center"><h2>Similar Recipes</h2></div>
          <div align="center">
          {modelOutput.map((labels) => { 
            
            if(labels == labelOfRecipe)
            {
              <div className="box" align = "center">
                  <h3>
                    Recipe Name :  {listOfRec[count]}<br></br>
                    Restaurant Id : {listOfResId[count]}
                  </h3>
                </div>
              count += 1;
            }
            else
            {
              count += 1;
            }
          })}
          </div>
        </div>
      </div>
    )
    }
  }, [modelOutput])


  return (
    <div>
      <div className="home_title" align="center"><h1>Halifax Foodies</h1></div>
      <br></br>
      <div>
        <div className="home_title" align="center"><h2>Similar Recipes</h2></div>
        <div align="center">
        {modelOutput.map((labels) => { 
          
          if(labels == labelOfRecipe)
          {
            <div className="box" align = "center">
                <h3>
                  Recipe Name :  {listOfRec[count]}<br></br>
                  Restaurant Id : {listOfResId[count]}
                </h3>
              </div>
            count += 1;
          }
          else
          {
            count += 1;
          }
        })}
        </div>
      </div>
    </div>
  )
}
export default ViewSimilarRecipes;