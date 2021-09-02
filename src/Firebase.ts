import firebase from 'firebase/compat/app';
import 'firebase/app';
import "firebase/storage";

require("dotenv").config();

const firebaseConfig = {
    // config
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };
  // Initialize Firebase
var storage_obj = firebase.storage();
firebase.initializeApp(firebaseConfig);
export const storage = storage_obj;
export default firebase;