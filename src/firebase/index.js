import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTybH0vqxdS-npgZ-ZVicLKezpCsHgFwo",
  authDomain: "flashcard-aede0.firebaseapp.com",
  projectId: "flashcard-aede0",
  storageBucket: "flashcard-aede0.appspot.com",
  messagingSenderId: "668249703138",
  appId: "1:668249703138:web:bc9a41e1b8e1518936d4bb"
};
const app=firebase.initializeApp(firebaseConfig);

export const database = app.firestore();