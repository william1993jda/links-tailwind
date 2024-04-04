
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB9HcRjYS7PfoJPbS0N_2spwRE9OaAI6o",
  authDomain: "reactlinks-7bf68.firebaseapp.com",
  projectId: "reactlinks-7bf68",
  storageBucket: "reactlinks-7bf68.appspot.com",
  messagingSenderId: "461093128648",
  appId: "1:461093128648:web:7daf8e9dae2aefc70818fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };