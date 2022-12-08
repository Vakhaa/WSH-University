// import axios from 'axios'
import {
  login, 
  logout
} from './authenticationsSlice'

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// the outside "thunk creator" function

// in this place we need to save our user to db and create folders for him
export const loginAction = () => {
  return async (dispatch, getState) => {
    const auth = getAuth(app);
    try{
      const result =  await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const firebase_user = result.user.toJSON();

      var response =  await axios.get("http://localhost:5000/user", {
        headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "email": firebase_user.email
        },
      });

      if(response.status == 204 ){

        response = await axios.post("http://localhost:5000/user", {
          fullName: firebase_user.displayName,
          email: firebase_user.email,
          photo: firebase_user.photoURL
        }, {
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        });
      }

      dispatch(login(response.data));
    } catch(error){
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
      console.log(errorCode, errorMessage);
    };
  }
}

export const logoutAction = () => {
  return async (dispatch, getState) => {
    try {
      const auth = getAuth(app);
      
      await auth.signOut();
      dispatch(logout());

    } catch (err) {
      console.log(err.message);
    }
  }
}
