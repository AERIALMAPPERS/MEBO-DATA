// document.getElementById("toggleForm").addEventListener("click", () => {
//     const signInForm = document.getElementById("reset");
//     const signUpForm = document.getElementById("signup");
//     const toggleButton = document.getElementById("toggleForm");

//     if (signInForm.style.display === "none") {
//         // Switch to Sign In
//         signInForm.style.display = "block";
//         signUpForm.style.display = "none";
//         toggleButton.innerText = "Don't have an account? Sign Up";
//     } else {
//         // Switch to Sign Up
//         signInForm.style.display = "none";
//         signUpForm.style.display = "block";
//         toggleButton.innerText = "Already have an account? Sign In";
//     }
// });
document.getElementById("toggleForm").addEventListener("click", () => {
    document.getElementById("signIn").style.display = "none"; // Hide login form
    document.getElementById("signup").style.display = "none"; // Hide signup form
    document.getElementById("reset").style.display = "block"; // Show reset form
});

