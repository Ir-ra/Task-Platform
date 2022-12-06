import firebase  from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDP-ckO3uZPDBJB141l72q2dVJWwsvu55I",
  authDomain: "task-platform.firebaseapp.com",
  projectId: "task-platform",
  storageBucket: "task-platform.appspot.com",
  messagingSenderId: "399111714118",
  appId: "1:399111714118:web:57da9a48076ea9b66b6147"
};

  //initialize firebase (цей метод підєднує до нашої Firebase backend)
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, projectStorage, timestamp}