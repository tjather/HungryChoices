function openModal() {
    var username = document.getElementById("username");
    var password = document.getElementById("psw");

    password.onkeyup = function () {
        enableButton();
    }
}

function enableButton() {
    var button = document.getElementById("my_submit_button");
    button.disabled = false;
}
