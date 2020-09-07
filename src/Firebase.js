import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDvUanT9qzYtz4k7eaEoP6M0bWBUErNfR8",
    authDomain: "skypey-9fd5d.firebaseapp.com",
    databaseURL: "https://skypey-9fd5d.firebaseio.com",
    projectId: "skypey-9fd5d",
    storageBucket: "skypey-9fd5d.appspot.com",
    messagingSenderId: "679255000086",
    appId: "1:679255000086:web:b3840857a5c01e994a6137",
    measurementId: "G-72HQVGDF8K"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth, provider};
  export default db;