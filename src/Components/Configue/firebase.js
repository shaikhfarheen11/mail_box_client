import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyBvTNkajFcyatpcA2-ZgIImDtbN7Y614Vw",
    authDomain: "react-mail-2c482.firebaseapp.com",
    databaseURL: "https://react-mail-2c482-default-rtdb.firebaseio.com",
    projectId: "react-mail-2c482",
    storageBucket: "react-mail-2c482.appspot.com",
    messagingSenderId: "749700210957",
    appId: "1:749700210957:web:5c481e5bdeeb7be5b81044",
    measurementId: "G-3VXGGJJ8C4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const databaseRef = ref(db);