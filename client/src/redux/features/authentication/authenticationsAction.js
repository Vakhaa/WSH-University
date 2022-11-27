// import axios from 'axios'
import {
  login, 
  logout
} from './authenticationsSlice'

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(login(user.toJSON()));
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
      });
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
