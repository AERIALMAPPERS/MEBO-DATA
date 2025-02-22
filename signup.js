// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvlztyVZ26inwNK8E08K59j7CpO4RWZWA",
  authDomain: "login-form-b221f.firebaseapp.com",
  projectId: "login-form-b221f",
  storageBucket: "login-form-b221f.firebasestorage.app",
  messagingSenderId: "278241910960",
  appId: "1:278241910960:web:e01f737a4b090fa5fd1b75"
};

// initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);

}

const signUp=document.getElementById('submitSignUp');

signUp.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    if (!email || !password || !firstName || !lastName) {
        showMessage("All fields are required.", 'signUpMessage');
        return;
    }

    try {
        const auth = getAuth();
        const db = getFirestore();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
        };

        showMessage('Account created successfully', 'signUpMessage');

        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData);

        window.location.href = 'index.html';
    } catch (error) {
        console.error("Error during sign-up:", error.code, error.message);

        if (error.code === 'auth/email-already-in-use') {
            showMessage('Email Address Already exists!!!', 'signUpMessage');
        } else {
            showMessage('Unable to create user', 'signUpMessage');
        }
    }
});
