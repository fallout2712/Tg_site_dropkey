import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyASnZKIFk7biOHIHE6klRhm_xOdCMuVgRI",
    authDomain: "swixydropkey.firebaseapp.com",
    projectId: "swixydropkey",
    storageBucket: "swixydropkey.appspot.com",
    messagingSenderId: "84094476352",
    appId: "1:84094476352:web:c980af9927ed732f4dbfa5",
    measurementId: "G-1JJS2DJPMP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    console.log(app);
});