import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyATGix8zyBh5LP7f6s6xxQjZwbpDhDpNNs",
  authDomain: "image-upload-with-login.firebaseapp.com",
  projectId: "image-upload-with-login",
  storageBucket: "image-upload-with-login.appspot.com",
  messagingSenderId: "968152327624",
  appId: "1:968152327624:web:5677b302f7e328fa4cccfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
