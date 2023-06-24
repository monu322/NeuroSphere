// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
=======
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

>>>>>>> 24d66272ca423245609b411dee2d11c0d55c5cbd
const firebaseConfig = {
  apiKey: "AIzaSyBgHdsJZHPiLxc3MIjvYA4dKTDbKAC_J7I",
  authDomain: "blog-admin-1b1b6.firebaseapp.com",
  projectId: "blog-admin-1b1b6",
  storageBucket: "blog-admin-1b1b6.appspot.com",
  messagingSenderId: "675198192148",
  appId: "1:675198192148:web:73ca4e7aeaa4fc39c1b501",
};

<<<<<<< HEAD
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
=======
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
>>>>>>> 24d66272ca423245609b411dee2d11c0d55c5cbd
