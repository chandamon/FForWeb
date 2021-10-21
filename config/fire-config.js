import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAsW9Z8POytD2KpUZa7oj7hi7tC99ozJY0",
  authDomain: "f-for-2f727.firebaseapp.com",
  databaseURL: "https://f-for-2f727.firebaseio.com",
  projectId: "f-for-2f727",
  storageBucket: "f-for-2f727.appspot.com",
  messagingSenderId: "213867707459",
  appId: "1:213867707459:web:ffd2edb81c36ee404368f6",
  measurementId: "G-X47X0S6BRK"

};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;
