// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/storage'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-ijTV4FCVUZJS2rRVtviiPLysqROaQa4",
  authDomain: "quizapp-343321.firebaseapp.com",
  projectId: "quizapp-343321",
  storageBucket: "quizapp-343321.appspot.com",
  messagingSenderId: "541254590570",
  appId: "1:541254590570:web:188d926259e567cf246a13"
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
let storage = firebase.storage();
export default storage;