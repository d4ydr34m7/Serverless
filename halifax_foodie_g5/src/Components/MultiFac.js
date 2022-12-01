import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export default function MFA() {
  const history = useHistory();

  const [secondFactorAns, setAns] = useState("");
  const [thirdFacKey, setKey] = useState("");
  const [thirdFacCipher, setCipher] = useState("");
  const [value, setValue] = useState("");
  const questionForSecondFactor = "What is Your favorite movie?";
  const [registeredRole, setRegisteredRole] = useState("owner");
  const [secondFactorQues, setQues] = useState();
  var databaseUser;

  
  useEffect(async () => {
    let databaseUser;

    !JSON.parse(localStorage.getItem("IsQuestion")) &&
      (await Auth.currentUserPoolUser().then((obj) => {
        const dbUser = {
          username: obj.username,
          email: obj.attributes.email,
        };
        console.log(dbUser)
        localStorage.setItem("user", JSON.stringify(dbUser));
        localStorage.setItem("IsQuestion", false);
      }));

    const user = JSON.parse(localStorage.getItem("user"));
    const users = await db.collection("users");
    const dataFromUser = await users.where("username", "==", user.username).get();

    dataFromUser.forEach((doc) => {
      databaseUser = doc.data();
    });
    console.log("dbUser",databaseUser);

    if (databaseUser) {
      setQues(true);
    } else {
      setQues(false);
    }
  }, []);

  const getCipherText =  async() => {
          var u = JSON.parse(localStorage.getItem("user"));

//sign-up third factor
      var tfBody = {
        email: u.email,
        userName: u.username,
        role: registeredRole,
        key: thirdFacKey,
        plainText: value,
      };
      console.log(tfBody);

      try {
        let result = await axios.post(
          "https://vpivmqqpa1.execute-api.us-east-1.amazonaws.com/default/ciphersignup",

          JSON.stringify(tfBody),
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

    console.log(secondFactorQues);
    if (secondFactorQues) {
      const user = JSON.parse(localStorage.getItem("user"));
      databaseUser = {};

      const users = await db.collection("users");
      const dataFromUser = await users.where("username", "==", user.username).get();

      dataFromUser.forEach((doc) => {
        databaseUser = doc.data();
      });

      if (databaseUser.answer) {
        if (secondFactorAns === databaseUser?.answer) {
          localStorage.setItem("IsQuestion", true);
          localStorage.setItem("Role", databaseUser.role);
          // history.push("/");
          // window.location.reload();
        } else {
          alert("invalid answer");
        }
      }

      //login 3rd factor
      var tfLoginBody = {
        cipher: thirdFacCipher,
        username: user.username,
      };
      console.log(tfLoginBody);

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
            body: JSON.stringify(tfLoginBody),
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
      var userExp = JSON.parse(localStorage.getItem("user"));

      // 2nd factor
      await Auth.currentAuthenticatedUser().then((obj) => {

                const user = {
                    username: userExp.username,
                    question: questionForSecondFactor,
                    answer: secondFactorAns,
                    role: registeredRole,
                    email:userExp.email
                }

                console.log("user:", user)
                db.collection('users').add(user)
                    .then((doc) => {
                        console.log("data Submitted Successfully.")
                        localStorage.setItem("IsQuestion", true)
                        localStorage.setItem("Role",registeredRole)

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
                  {secondFactorQues ? (
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
                          value={registeredRole}
                          onChange={(e) => setRegisteredRole(e.target.value)}
                          placeholder="Customer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div></div>
                <div className="mb-5">
                  {secondFactorQues ? (
                    <h4>2nd Factor Authentication</h4>
                  ) : (
                    <h4>Set up 2nd Factor Authentication</h4>
                  )}

                  <div className="cus-form form-top-space">
                    <span>What is Your favorite color?</span>
                    <input
                      className="input-design top-space"
                      type="text"
                      value={secondFactorAns}
                      onChange={(e) => setAns(e.target.value)}
                      placeholder="Your Answer"
                    />
                  </div>
                </div>

                <div></div>

                <div className="mb-5">
                  {secondFactorQues ? (
                    <div><h4>3rd Factor Authentication</h4>
                    <div className="cus-form form-top-space">
                    <span>Enter a cipher</span>
                    <input
                      className="input-design top-space"
                      type="text"
                      value={thirdFacCipher}
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
                      value={thirdFacKey}
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
                 <Button onClick={getCipherText}>Generate Cipher</Button>

                    <span>{thirdFacCipher}</span>
                
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


