import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBvlztyVZ26inwNK8E08K59j7CpO4RWZWA",
//   authDomain: "login-form-b221f.firebaseapp.com",
//   projectId: "login-form-b221f",
//   storageBucket: "login-form-b221f.firebasestorage.app",
//   messagingSenderId: "278241910960",
//   appId: "1:278241910960:web:e01f737a4b090fa5fd1b75",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAecmMvESEmlgSUOvwSCreTku0_V4Im6O0",
  authDomain: "mebo-sign-in-detail.firebaseapp.com",
  projectId: "mebo-sign-in-detail",
  storageBucket: "mebo-sign-in-detail.firebasestorage.app",
  messagingSenderId: "689960018816",
  appId: "1:689960018816:web:d240261de2257f493c5765",
  measurementId: "G-NKCX3TF0YX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Display messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

// Sign-Up Event
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const contact = document.getElementById("rPhone").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  if (!email || !password || !firstName || !lastName || !contact) {
    showMessage("All fields are required.", "signUpMessage");
    return;
  }

  if (!/^[0-9]{10}$/.test(contact)) {
    showMessage("Please enter a valid 10-digit phone number.", "signUpMessage");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = { email, firstName, lastName, contact };
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);

    showMessage("Account created successfully.", "signUpMessage");
    // window.location.href = "index.html";
  } catch (error) {
    console.error("Error during sign-up:", error.code, error.message);
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email Address Already exists!", "signUpMessage");
    } else if (error.code === "auth/weak-password") {
      showMessage("Password should be at least 6 characters.", "signUpMessage");
    } else {
      showMessage("Unable to create user.", "signUpMessage");
    }
  }
});

// Login Event
const signIn = document.getElementById("submitLogIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMessage("Email and Password are required.", "signInMessage");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Login successful!", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Login error:", error.code, error.message);
      if (error.code === "auth/wrong-password") {
        showMessage("Incorrect email or password.", "signInMessage");
      } else if (error.code === "auth/user-not-found") {
        showMessage("Account does not exist.", "signInMessage");
      } else {
        showMessage("Login failed. Try again.", "signInMessage");
      }
    });
});

const resetPasswordButton = document.getElementById("resetPassword");

resetPasswordButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent page reload
    const email = document.getElementById("resetEmail").value;

    if (!email) {
        showMessage("Please enter your email.", "resetMessage");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        showMessage("Password reset email sent! Check your inbox.", "resetMessage");
    } catch (error) {
        console.error("Password Reset Error:", error.code, error.message);
        if (error.code === "auth/user-not-found") {
            showMessage("No account found with this email.", "resetMessage");
        } else {
            showMessage("Unable to send reset email. Try again.", "resetMessage");
        }
    }
});