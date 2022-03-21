var contEurope=[
    "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
    "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece",
    "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", 
    "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", 
    "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", 
    "Turkey", "Ukraine", "United Kingdom", "Vatican City"
];
var contAfrica=[
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", "Central African Republic", 
    "Chad", "Comoros", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", 
    "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", 
    "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", 
    "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", 
    "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];
var contNorthAmerica=[
    "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", 
    "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", 
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States of America"
];
var contAsia=[
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Cyprus", 
    "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel"< "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", 
    "Laos","Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", 
    "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", 
    "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
];
var contSouthAmerica=[
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname", 
    "Uruguay", "Venezuela"
];
var contAustralia=[
    "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau", "Papua New Guinea", 
    "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
];


function continentChanged(continent, countryList) {
    var selectCountry = document.getElementById(countryList);
    var ln = selectCountry.length - 1;
    while (ln > 0){
        selectCountry.remove(1);
        ln--;
    }

    var contArray;

    switch(continent) {
        case "Europe":
            contArray=contEurope
            break;
        case "Africa":
            contArray=contAfrica
            break;
        case "North America":
            contArray=contNorthAmerica
            break;
        case "Asia":
            contArray=contAsia
            break;
        case "South America":
            contArray=contSouthAmerica
            break;
        case "Australia":
            contArray=contAustralia
            break;
    default:
    }

    for (i = 0; i < contArray.length; i++) {
        var option = document.createElement('option');
        option.text = contArray[i];
        option.value = contArray[i];
        selectCountry.add(option);
    }
};

function verification() {
    document.querySelector('message.require').style.display = "inline-block";

    var myInput = document.getElementById("paswrd");
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
    var pass = document.getElementById("paswrd").value;
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