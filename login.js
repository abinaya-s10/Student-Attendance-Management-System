const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        window.location.href = "index.html";

    } else {

        document.getElementById("loginMessage").textContent =
        "Invalid Username or Password!";

    }

});
document.getElementById("forgotPassword").onclick = function(event) {

    event.preventDefault();

    alert("Demo Login Details\nUsername: admin\nPassword: 1234");

};