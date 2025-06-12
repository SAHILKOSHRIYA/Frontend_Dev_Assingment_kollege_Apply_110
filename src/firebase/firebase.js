import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLZ7-HfR9_NPSCXEIGzC_Q_R3hQyNFKUU",
  authDomain: "news-payout-dashboard.firebaseapp.com",
  projectId: "news-payout-dashboard",
  storageBucket: "news-payout-dashboard.firebasestorage.app",
  messagingSenderId: "590135511796",
  appId: "1:590135511796:web:f4f41bb768a8a4c3cb6ca1",
  measurementId: "G-78HX6FELXT",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
