function login() {

    //Declaring the variables
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //Validation statements
    let usersString = localStorage.getItem(username);
    const user = JSON.parse(usersString);
    let error = "";

    if (!usersString) {
        error = "This account does not exist.";
    }

    //Check if all fields are filled
    if ((username == "") || (password == "")) {
        error = "Please fill in all fields.";
    } else {
        const accountError = checkAccount(username, password, user);
        if (accountError) {
            error = accountError;
        }
    }

    //If there are no errors, the account can be successfully created.
    if (error == "") {
        window.location.href = "index.html";
    } else {
        const messageElement = document.getElementById('errorMessage');
        const messageText = error;

        // Update the text content first
        messageElement.textContent = messageText;
    }
};

//Check whether the account exists
function checkAccount(username, password, user) {
    //Check whether the username exists
    if (user && user.username == username) {

        //If the username exists,
        //Check whether the password matches the pasword entered.
        if (user.password == password) {
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("score", user.score);
            return "";
        }

        return "Incorrect password.";
    }

    return "This account does not exist.";
};