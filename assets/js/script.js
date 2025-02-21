// Predefined users (Admin sets these)
let users = [
    { username: "admin", password: "admin123", role: "Admin" },
    { username: "engineer", password: "engineer123", role: "Senior Engineer" },
    { username: "talathi", password: "talathi123", role: "Talathi" },
    { username: "subdivision", password: "subdivision123", role: "Subdivision" }
];
// Login function
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            // Check if the username and password match
            let user = users.find(user => user.username === username && user.password === password);

            if (user) {
                alert("Login Successful!");
                localStorage.setItem("loggedInUser", user.username);
                localStorage.setItem("userRole", user.role);
                window.location.href = "index.html"; // Redirect to Main Page
            } else {
                document.getElementById("errorMessage").textContent = "Invalid Username or Password!";
            }
        });
    }
    // Show Change Password Form when button is clicked
    document.getElementById("showChangePassword").addEventListener("click", function () {
        document.getElementById("changePasswordSection").classList.toggle("hidden");
    });

    // Change password function
    if (document.getElementById("changePasswordForm")) {
        document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
            e.preventDefault();
            let oldPassword = document.getElementById("oldPassword").value;
            let newPassword = document.getElementById("newPassword").value;
            let username = document.getElementById("username").value;

            let userIndex = users.findIndex(user => user.username === username);

            if (userIndex !== -1 && users[userIndex].password === oldPassword) {
                users[userIndex].password = newPassword;
                alert("Password changed successfully!");
                document.getElementById("changePasswordSection").classList.add("hidden");
            } else {
                document.getElementById("passwordMessage").textContent = "Old password is incorrect!";
            }
        });
    }
});
////////////////////////////////////////////////////
function validateCaptcha() {
    let response = grecaptcha.getResponse();
    if (response.length === 0) {
        alert("Please complete the CAPTCHA");
        return false;
    }
    return true;
}
