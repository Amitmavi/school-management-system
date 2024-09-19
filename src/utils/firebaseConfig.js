
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCAgVFUgBuk7MrlAp8PqfsfgVXuC12ubMA",
  authDomain: "pulsezest-school.firebaseapp.com",
  databaseURL: "https://pulsezest-school-default-rtdb.firebaseio.com",
  projectId: "pulsezest-school",
  storageBucket: "pulsezest-school.appspot.com",
  messagingSenderId: "825819682630",
  appId: "1:825819682630:web:19a523f847bb185cd33747",
  measurementId: "G-VPSF4178GE"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getFirestore();

export { auth, app, db, storage };