import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAX8WPNAthyM64ij8OTMXu2nHhL5glmiHQ",
  authDomain: "todo-app-2439b.firebaseapp.com",
  databaseURL: "https://todo-app-2439b.firebaseio.com",
  projectId: "todo-app-2439b",
  storageBucket: "todo-app-2439b.appspot.com",
  messagingSenderId: "1053775068154",
  appId: "1:1053775068154:web:d9358af59a5d2e47d98243",
});
export { firebaseConfig as firebase };
