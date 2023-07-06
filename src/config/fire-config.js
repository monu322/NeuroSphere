import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgHdsJZHPiLxc3MIjvYA4dKTDbKAC_J7I",
  authDomain: "blog-admin-1b1b6.firebaseapp.com",
  projectId: "blog-admin-1b1b6",
  storageBucket: "blog-admin-1b1b6.appspot.com",
  messagingSenderId: "675198192148",
  appId: "1:675198192148:web:73ca4e7aeaa4fc39c1b501",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;
