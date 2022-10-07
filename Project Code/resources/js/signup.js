function verification() {
    document.querySelector('message.require').style.display = "inline-block";

    var myInput = document.getElementById("account_password");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var symbol = document.getElementById("symbol"); 
    var length = document.getElementById("length");

    //if all requirements are satisfied
    validPassword(letter, capital, number, symbol, length);
  
    // When the user starts to type something inside the password field
    myInput.onkeyup = function () {
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g; 
        var numbers = /[0-9]/g; 
        var symbols = /[$&+,:;=?@#|'<>.^*()%!-]/g;
        var minLength = 8; //minimum password length

        // Validate lowercase letters
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }
    
        // Validate capital letters
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }
    
        // Validate numbers
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }
    
        // Validate symbols
        if (myInput.value.match(symbols)) {
            symbol.classList.remove("invalid");
            symbol.classList.add("valid");
        } else {
            symbol.classList.remove("valid");
            symbol.classList.add("invalid");
        }
    
        // Validate length
        if (myInput.value.length >= minLength) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }

    };;
}

function validPassword(letter, capital, number, symbol, length){
    if (letter.classList.contains("valid")){
       if (capital.classList.contains("valid")){
            if (number.classList.contains("valid")){
                if (symbol.classList.contains("valid")){
                    if (length.classList.contains("valid")){
                        document.querySelector('message.require').style.display = "none";
                    }
                }
            }
        }
    }
}

function passConfirm() {
    var confirmMyInput = document.getElementById("passconf");
    var pass = document.getElementById("account_password").value;
    var match = document.getElementById("match");

    if (document.getElementById("passconf").value === pass){
        document.querySelector('message.matching').style.display = "none";
    } else {
        document.querySelector('message.matching').style.display = "inline-block";
    }

    confirmMyInput.onkeyup = function () {
        // Validate password and confirmPassword
        var confirmationPass = false;
        if (confirmMyInput == pass){
            confirmationPass = true;
        }

        if (confirmationPass == true) {
          match.classList.remove("invalid");
          match.classList.add("valid");
        } else {
          match.classList.remove("valid");
          match.classList.add("invalid");
        }
    };;
}