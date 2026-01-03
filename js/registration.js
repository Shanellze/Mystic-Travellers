function createAccount(){

    //Declaring the variables
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const vPassword = document.getElementById('verifyPassword').value;

    //Retrieving existing users data
    const users = [];

    const allKeys = Object.keys(localStorage);
    for (const key of allKeys) {
        const data = localStorage.getItem(key);
        const parsedData = JSON.parse(data);
        users.push(parsedData);
    }

    //Validation statements
    let error = "";

    //Check if all fields are filled
    if ((username=="") || (email=="") || (phone=="")|| (password=="")|| (vPassword=="")) {
        error = "Please fill in all fields.";
    } else {
        const usernameError = validateUsername(username, users);
        const emailError = validateEmail(email, users);
        const phoneError = validatePhone(phone, users);
        const passwordError = validatePassword(password, vPassword);
         if (usernameError || emailError || phoneError || passwordError) {
            error = usernameError || emailError || phoneError || passwordError;
        }
    }


    //If there are no errors, the account can be successfully created.
    if (error == ""){
        let userAccount = {username: username, email: email, phone: phone, password: password, score: 0};
        localStorage.setItem(username, JSON.stringify(userAccount));
        window.location.href = "signIn.html";
    } else {
        const messageElement = document.getElementById('errorMessage');
        const messageText = error;

        // Update the text content first
        messageElement.textContent = messageText;

        // Now check the length and adjust the font size
        if (messageText.length > 50) {
            messageElement.style.fontSize = '13px';
        } else {
            messageElement.style.fontSize = '16px';
        }
    }             
};



//Validation functions

function validateUsername(username, users){
    usernameRegex = /^([a-z A-Z 0-9])+$/;
    
    //The username must be greater than 3-12 characters
    if (!((username.length >= 3) && (username.length <= 12))) {
        return "Username must be 3-12 characters.";
    }

    //The username must be limited to certain characters
    else if (!(usernameRegex.test(username))) {
        return "Username can only consist of letters and numbers";
    }

    //The username must not be taken
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username.toUpperCase() == username.toUpperCase()) {
                return "Username is taken.";
            }
        }
    }
    return "";
};

function validateEmail(email, users){
    emailRegex = /^([a-z A-Z 0-9 .-_]+)@([a-z A-Z]+).([a-z A-Z]{2,6})(.[a-z]{2,6})?$/;

    //Validating the email format - Must contain a @ symbol, limited to certain characters and specified to the format
    if (!(emailRegex.test(email))){
        return "Invalid email.";
    }

    //The email must not be taken
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email.toUpperCase() == email.toUpperCase()) {
                return "Email is taken.";
            }
        }
    }
    return "";
};

function validatePhone(phone, users){
    phoneRegex = /^([0-9]{11})$/;

    //Validate the phone number - Must be 11 digits long and can only be comprised of numbers
    if (!(phoneRegex.test(phone))){
        return "Invalid phone number.";
    }

    //The phone number must not be taken
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].phone == phone) {
                return "Phone number is taken.";
            }
        }
    }
    return "";
};

function validatePassword(password, vPassword){
    passwordRegex = /^([a-z A-Z 0-9 @$!%*#?&])+$/;

    //The password must be 8-16 characters
    if (!((password.length >= 8) && (password.length <= 16))) {
        return "Password must be between 8-16 characters.";
    }

    //The password must be limited to certain characters
    else if (!(passwordRegex.test(password))){
        return "Password can only consist of letters, numbers and symbols.";
    }

    //The password must include at least one lowercase letter, one uppercase letter, and one digit
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return "Password must include at least one lowercase letter, one uppercase letter, and one digit.";
    }

    //The password and verify password must be equivalent
    else if(password!=vPassword){
        return "Password does not match.";
    }
    return "";
};