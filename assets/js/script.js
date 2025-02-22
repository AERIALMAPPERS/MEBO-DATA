// Load users from localStorage or set default users
let storedUsers = JSON.parse(localStorage.getItem("users"));
let users = storedUsers || [
    { username: "admin", password: "admin123", email: "nikitaamdatalab@gmail.com" },
    { username: "engineer", password: "engineer123", email: "engineer@example.com" }
];

// Save users in localStorage for persistence
localStorage.setItem("users", JSON.stringify(users));

// Login function
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert("Login Successful!");
            localStorage.setItem("loggedInUser", user.username);
            window.location.href = "index.html"; // Redirect after login
        } else {
            document.getElementById("errorMessage").textContent = "Invalid Username or Password!";
        }
    });

    // Show Change Password Section
    document.getElementById("showChangePassword").addEventListener("click", function () {
        document.getElementById("changePasswordSection").classList.toggle("hidden");
    });

    // Show Forgot Password Section
    document.getElementById("showForgotPassword").addEventListener("click", function () {
        document.getElementById("forgotPasswordSection").classList.toggle("hidden");
    });

    // Change Password
    document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let oldPassword = document.getElementById("oldPassword").value;
        let newPassword = document.getElementById("newPassword").value;
        let username = localStorage.getItem("loggedInUser");

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userIndex = users.findIndex(user => user.username === username);

        if (userIndex !== -1 && users[userIndex].password === oldPassword) {
            users[userIndex].password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Password changed successfully! Please log in again.");
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html"; // Redirect to login
        } else {
            document.getElementById("passwordMessage").textContent = "Old password is incorrect!";
        }
    });
});

// Function to send OTP
function sendOTP() {
    let email = document.getElementById("emailInput").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email);

    if (!user) {
        alert("Email not found!");
        return;
    }

    let otp = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("emailOTP", otp);
    localStorage.setItem("otpExpiration", Date.now() + 300000); // Expire in 5 mins

    alert("OTP sent to: " + email); // Replace with actual email sending logic

    document.getElementById("otpInput").classList.remove("hidden");
    document.getElementById("verifyOTPButton").classList.remove("hidden");
}

// Function to verify OTP
function verifyOTP() {
    let enteredOTP = document.getElementById("otpInput").value;
    let storedOTP = localStorage.getItem("emailOTP");
    let otpExpiration = localStorage.getItem("otpExpiration");

    if (Date.now() > otpExpiration) {
        alert("OTP expired! Please request a new one.");
        localStorage.removeItem("emailOTP");
        return;
    }

    if (enteredOTP == storedOTP) {
        alert("OTP Verified! You can now reset your password.");
        localStorage.removeItem("emailOTP");
        document.getElementById("resetPasswordSection").classList.remove("hidden");
    } else {
        alert("Invalid OTP!");
    }
}

// Function to reset password
function resetPassword() {
    let email = document.getElementById("emailInput").value;
    let newPassword = document.getElementById("newPasswordReset").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(user => user.email === email);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password reset successfully!");
    } else {
        alert("User not found!");
    }
}
