import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCXoeGveq_6xNQSf_KqKi-I9zvo8BQmN0I",
  authDomain: "neurosphere-5e74c.firebaseapp.com",
  projectId: "neurosphere-5e74c",
  storageBucket: "neurosphere-5e74c.appspot.com",
  messagingSenderId: "301897623904",
  appId: "1:301897623904:web:08daeb958bd32929255605",
  measurementId: "G-BNYW451CX4",
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;
