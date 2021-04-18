import React, { useEffect } from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";
import { auth, provider } from "../../firebase";
import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router";


const Login = () => {




    const dispatch=useDispatch()

    var provider = new firebase.auth.GoogleAuthProvider();
  const signInHandler = () => {
     firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
          console.log(result)
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        localStorage.setItem("user",JSON.stringify( {name: user.displayName, email: user.email,photo: user.photoURL}))
        
        dispatch({type:"SET_USER",payload:{name: user.displayName, email: user.email, photo: user.photoURL}})
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let history = useHistory();
  
  const state = useSelector(state => state.user)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(("user")));
    
    if(user){
      history.push('/')
    }
    else{
      history.push('/login')
    }
  }, [state]);
  return (
    <div className="login">
      <div className="child__login">
        <div className="login__img">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
            alt=""
          />
        </div>
        <h2>Sign in to WhatsApp </h2>
        <Button onClick={signInHandler}>Sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
