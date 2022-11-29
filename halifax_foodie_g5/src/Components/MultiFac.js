import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export default function MFA() {
  const history = useHistory();

  const [answer, setanswer] = useState("");
  const [key, setKey] = useState("");
  const [cipher, setCipher] = useState("");
  const [value, setValue] = useState("");
  const question = "What is Your favorite movie?";
  const [role, setRole] = useState("owner");
  const [setQuestion, setsetQuestion] = useState();
  var dbUser;
  useEffect(async () => {
    let dbUser;

    !JSON.parse(localStorage.getItem("IsQuestion")) &&
      (await Auth.currentUserPoolUser().then((obj) => {
        const user = {
          username: obj.username,
          email: obj.attributes.email,
        };
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("IsQuestion", false);
      }));

    const user = JSON.parse(localStorage.getItem("user"));
    const users = await db.collection("users");
    const userData = await users.where("username", "==", user.username).get();

    userData.forEach((doc) => {
      dbUser = doc.data();
    });
    console.log("dbUser",dbUser);

    if (dbUser) {
      setsetQuestion(true);
    } else {
      setsetQuestion(false);
    }
  }, []);

  const generatecipher =  async() => {
          var u = JSON.parse(localStorage.getItem("user"));

//sign-up third factor
      var body = {
        email: u.email,
        userName: u.username,
        role: role,
        key: key,
        plainText: value,
      };
      console.log(body);

      try {
        let result = await axios.post(
          "https://vpivmqqpa1.execute-api.us-east-1.amazonaws.com/default/ciphersignup",

          JSON.stringify(body),
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(result);
        setCipher(result.data.body);
        // history.push("/");
        // window.location.reload();
      } catch (error) {
        console.error(error);
      }  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    console.log(setQuestion);
    if (setQuestion) {
      const user = JSON.parse(localStorage.getItem("user"));
      dbUser = {};

      const users = await db.collection("users");
      const userData = await users.where("username", "==", user.username).get();

      userData.forEach((doc) => {
        dbUser = doc.data();
      });

      if (dbUser.answer) {
        if (answer === dbUser?.answer) {
          localStorage.setItem("IsQuestion", true);
          localStorage.setItem("Role", dbUser.role);
          // history.push("/");
          // window.location.reload();
        } else {
          alert("invalid answer");
        }
      }

      //login 3rd factor
      var body = {
        cipher: cipher,
        username: user.username,
      };
      console.log(body);

      await axios
        .post(
          "https://vpivmqqpa1.execute-api.us-east-1.amazonaws.com/default/cipherlogin",

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
              "Content-Type": "application/json",
            },
            crossDomain: true,
            body: JSON.stringify(body),
          }
        )
        .then((response) => {
          console.log(response);
          history.push("/");
          window.location.reload();
        })
        .catch((err) => {
          // Handle error
          console.log("error", err);
        });
    } else {
      var u = JSON.parse(localStorage.getItem("user"));

      // 2nd factor
      await Auth.currentAuthenticatedUser().then((obj) => {

                const user = {
                    username: u.username,
                    question: question,
                    answer: answer,
                    role: role,
                    email:u.email
                }

                console.log("user:", user)
                db.collection('users').add(user)
                    .then((doc) => {
                        console.log("data Submitted Successfully.")
                        localStorage.setItem("IsQuestion", true)
                        localStorage.setItem("Role",role)

                        history.push("/")
                        window.location.reload()
                    })
                    .catch((err) => {
                        console.error("error:", err)
                    })
            }
            )


      
    }
  };

  return (
    <>
      <div className="all-content-center">
        <div className="container">
          <div className="center-box">
            <div className="main-box">
              <form onSubmit={(e) => onSubmitForm(e)}>
                <div className="mb-5">
                  {setQuestion ? (
                    <div></div>
                  ) : (
                    <div>
                      <div>
                        <h4> Enter Role</h4>
                      </div>
                      <div>
                        <span>Please enter your role here</span>
                        <input
                          className="input-design top-space"
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Customer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div></div>
                <div className="mb-5">
                  {setQuestion ? (
                    <h4>2nd Factor Authentication</h4>
                  ) : (
                    <h4>Set up 2nd Factor Authentication</h4>
                  )}

                  <div className="cus-form form-top-space">
                    <span>What is Your favorite color?</span>
                    <input
                      className="input-design top-space"
                      type="text"
                      value={answer}
                      onChange={(e) => setanswer(e.target.value)}
                      placeholder="Your Answer"
                    />
                  </div>
                </div>

                <div></div>

                <div className="mb-5">
                  {setQuestion ? (
                    <div><h4>3rd Factor Authentication</h4>
                    <div className="cus-form form-top-space">
                    <span>Enter a cipher</span>
                    <input
                      className="input-design top-space"
                      type="text"
                      value={cipher}
                      onChange={(e) => setCipher(e.target.value)}
                      placeholder="Enter cipher"
                    />
                  </div></div>
                  ) : (
                    <div><h4>Set Up 3rd Factor Authentication</h4>
                    <div className="cus-form form-top-space">
                    <span>Enter a key</span>
                    <input
                      className="input-design top-space"
                      type="text"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder="Enter key"
                    />
                  </div>

                  <div className="cus-form form-top-space">
                    <span>Enter a value</span>
                    <input
                      className="input-design top-space"
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter Value"
                    />
                  </div>
                 <Button onClick={generatecipher}>Generate Cipher</Button>

                    <span>{cipher}</span>
                
                  </div>
                  )}
                
                  
                </div>

                <div className="cus-form form-top-space">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


