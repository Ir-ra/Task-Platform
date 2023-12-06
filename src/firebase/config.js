import firebase  from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAFpXcR8P3WxJKi2VSz6Ba5ncLHWKuOzCw",
  authDomain: "the-chat-platform.firebaseapp.com",
  projectId: "the-chat-platform",
  storageBucket: "the-chat-platform.appspot.com",
  messagingSenderId: "1098024740362",
  appId: "1:1098024740362:web:81d31dd0beb602e86921f3"
};

  //initialize firebase
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, projectStorage, timestamp}
  