import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATbDZhbY9iFwwmfzDxsMRibPp8mu-Hdss",
  authDomain: "whatsapp-clone-9af37.firebaseapp.com",
  projectId: "whatsapp-clone-9af37",
  storageBucket: "whatsapp-clone-9af37.appspot.com",
  messagingSenderId: "89377447081",
  appId: "1:89377447081:web:5fdff1beb0ec2539f71db8",
  measurementId: "G-C301X7Y3D2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore()
const auth=firebaseApp.auth()
const provider=new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db;
