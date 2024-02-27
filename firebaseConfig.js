// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5UwB6gItEa7Dbea3YcKzvRd_0rPNZrYQ",
  authDomain: "trackmatch-ios.firebaseapp.com",
  projectId: "trackmatch-ios",
  storageBucket: "trackmatch-ios.appspot.com",
  messagingSenderId: "271125983026",
  appId: "1:271125983026:web:3339756b6f8cf0ea53f12b",
  measurementId: "G-3W2XTJHW6E"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export the database instance
const db = getDatabase(app);

export default db;