// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// this the configuration of the app or project you created on firebase this configuration will give you access to it.
const firebaseConfig = {
  apiKey: "AIzaSyDzMj_nPjAqPzXGWFabyr394i5zjtjQ-x4",
  authDomain: "instagram-clone-8ae83.firebaseapp.com",
  projectId: "instagram-clone-8ae83",
  storageBucket: "instagram-clone-8ae83.firebasestorage.app",
  messagingSenderId: "877513966818",
  appId: "1:877513966818:web:97d09d83875198c790cabb",
  measurementId: "G-6DRD34M00X",
};
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig); // this returns the firebase project instance that we have on the firebase cloud.
// then to use the other services we just have to pass the instance of our project to the service we want to use.
const auth = getAuth(app); // this is authentication service and to store user credential of login and signup
const firestore = getFirestore(app); // this is a service to store other user that are authenticated and using the app and it stores  information or data of the user
const storage = getStorage(app); // this is a store that can be used to store assets like img

export { app, auth, firestore, storage };
