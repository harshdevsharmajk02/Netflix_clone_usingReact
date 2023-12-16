// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCC4bX19RxLePkwuVOwDWH3rkDI2o2RgUs",
  authDomain: "netflix-clone-c7552.firebaseapp.com",
  projectId: "netflix-clone-c7552",
  storageBucket: "netflix-clone-c7552.appspot.com",
  messagingSenderId: "272132991331",
  appId: "1:272132991331:web:445456c109386483008b56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const database = getFirestore(app)