import '../App.css';
import React , {useState, useEffect} from 'react';
import AWS from 'aws-sdk'
import { BrowserRouter as Router, Routes, Route, useHistory, useLocation} from 'react-router-dom';  

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  sessionToken : process.env.REACT_APP_SESSION_TOKEN
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

function UploadRecipe(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [listOfRecipes, setListOfRecipes] = useState([]);
  const [progress , setProgress] = useState(0);
  const navigate = useHistory();
  const { state } = useLocation();
  const restaurantId = 'restaurant1@res.ca';
  useEffect(() => {
    if( state == "" || state == null){
    navigate.push('/');
    }
    else{
        const restaurantId = state.restaurantID

        const fetchFeedbacks = async () =>{
          await fetch("https://g2wzzee4bt7vmp6kjs6lqcwbke0fcizb.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
              restaurantId: restaurantId
            })
          })
          .then((res) => res.json()).then((res)=>{
            
            if(res.status){
                setListOfRecipes(res.data);
            }
            else{
              alert("Error in finiding Recipes.")
            }
          });
          }
          fetchFeedbacks();
      }
}, []);

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
      console.log(e.target.files[0])
  }

  const handleUpload = async (file) => {
    console.log(process.env.REACT_APP_S3_BUCKET)
    console.log(process.env.REACT_APP_ACCESS_KEY)

    const key = restaurantId+'/'+file.name
    
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: key
  };

  myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .send((err) => {
          if (err) console.log(err)
      })
  }

  const extractKeyIngredients = async (file) => {   
    const filename = file.name.split('.')[0]
    debugger
    let res = await fetch("https://nynkrynoukybh6yofqkhefw7sm0yjbzf.lambda-url.us-east-1.on.aws/" , {
    method: "POST",
    body: JSON.stringify({
      filename: filename, restaurantId: restaurantId
    })
    }).then((res) => res.json()).then((res)=>{ 
        if(res.status)
        {
            alert(res.message);
        }
        else
        {
        alert("Error in Extracting ingredients.")
        }
    })
  }

  return (
      <div className="home_title" align = "center">
        <div><h1>Halifax Foodies</h1></div>
        <div><input type="file" onChange={handleFileInput}/></div>
        <br></br>
        <div><button disabled={!selectedFile} onClick={() => handleUpload(selectedFile)}> Upload</button>
        <button disabled={!selectedFile} onClick={() => extractKeyIngredients(selectedFile)}> Extract Key Ingedients</button></div>
        <div>
          <div className="home_title" align = "center"><h2>Our Extracted Recipes</h2></div>
          <div align = "center">
            {listOfRecipes.map((recipes) => {
              return (
              <div className="box" align = "left">
                <h3>
                  Name : {recipes.RecipeName} <br></br><br></br>
                  Key Ingredients : {recipes.RecipeIngredients.map((i) => {return(<h4>{i}</h4>)})}
                  <button onClick={() => navigate.push('/SimilarRecipes', { state : {recipeName : recipes.RecipeName} }) }> View Similar Recipes</button>
                </h3>
              </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}

export default UploadRecipe;