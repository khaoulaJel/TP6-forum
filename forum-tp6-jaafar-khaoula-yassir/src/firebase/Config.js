import  firebase  from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2Yiu2oQs_Ai85i6qpQ_5Is0PovFCdWkw",
    authDomain: "js-project-a0dca.firebaseapp.com",
    projectId: "js-project-a0dca",
    storageBucket: "js-project-a0dca.appspot.com",
    messagingSenderId: "507313056295",
    appId: "1:507313056295:web:470cc2a9eb0e500e317c02",
    measurementId: "G-NPBXBLZ1MM"
  };

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };