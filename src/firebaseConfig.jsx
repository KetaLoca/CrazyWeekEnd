import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8lNP5tJYUUXK8m0b6dTg-ggvVDD5Rm38",
  authDomain: "crazyweekend570.firebaseapp.com",
  databaseURL:
    "https://crazyweekend570-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crazyweekend570",
  storageBucket: "crazyweekend570.appspot.com",
  messagingSenderId: "212699866488",
  appId: "1:212699866488:web:71f5e00b900e4b00c1548d",
  measurementId: "G-7BYGTK5WE6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); //Analytics sin uso por el momento
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, db, storage };
