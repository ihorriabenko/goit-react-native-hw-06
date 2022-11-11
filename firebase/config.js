import * as firebase from "firebase";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-N8sTPlG0ahude8zcXS2faz_vxB--SSo",
  authDomain: "goit-auth-363807.firebaseapp.com",
  projectId: "goit-auth-363807",
  storageBucket: "goit-auth-363807.appspot.com",
  messagingSenderId: "545278847020",
  appId: "1:545278847020:web:447f65fa47d5d37d028989",
  measurementId: "G-47TQ1ML49K"
};

export default firebase.initializeApp(firebaseConfig);
