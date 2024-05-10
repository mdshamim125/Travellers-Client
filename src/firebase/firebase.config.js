// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librariesimport { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVwSq7c_mSa3-RcUQwWIOfBJwJM1slbUU",
  authDomain: "travel-blog-cf01e.firebaseapp.com",
  projectId: "travel-blog-cf01e",
  storageBucket: "travel-blog-cf01e.appspot.com",
  messagingSenderId: "376730421443",
  appId: "1:376730421443:web:52fe83e2d786a5a0c57a76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
