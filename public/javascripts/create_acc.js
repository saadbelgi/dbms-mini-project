function validateAndSendInput() {

    // unchecking show password checkbox and hiding password text
    document.getElementById("make-pwd-visible").checked = false
    document.getElementById("password").type = "password"
    document.getElementById("reconfirm").type = "password"

    var pwd = document.getElementById("password").value
    var reconf = document.getElementById("reconfirm").value
    var sendInput = false
    if (pwd.localeCompare(reconf) == 0) {
        contains_digit = /[0-9]/.exec(pwd)
        contains_uppercase = /[A-Z]/.exec(pwd)
        contains_lowercase = /[a-z]/.exec(pwd)
        if (contains_digit == null || contains_uppercase == null || contains_lowercase == null) {
            window.alert("Password is invalid.\nPassword must contain atleast 1 lowercase letter, 1 uppercase character and 1 numeric digit.")
        }
        else if (/\s/.exec(pwd) != null) {
            window.alert("Your password contains whitescape(s).\nSpaces and tabs are not allowed.")
        }
        else {
            var special_chars = pwd.match(/[^A-Za-z0-9]/g)
            var spec_arr = ["!", "@", "#", "$", "%", "^", "&", "*", "/", "\\", "<", ">", "=", ",", "'", "\"", "?", ".", ";", ":", "-", "+", "_"]
            sendInput = true
            if (special_chars != null) {
                for (let x of special_chars) {
                    if (!spec_arr.includes(x)) {
                        window.alert("Password contains an illegal special character: " + x + "\nOnly following special charaters are allowed:\n! @ # $ % ^ & * / < > = , \ ' \" ? . ; : _ - +")
                        sendInput = false
                        break;
                    }
                }
            }
        }
    }
    else {
        window.alert("Your entered password does not match with the reconfirmed password.")
    }
    if (sendInput) {
        document.getElementById("f1").action = "/acct-creation"
        document.getElementById("submit-button").onclick = null
        document.getElementById("submit-button").click()
    }
    else {
        var tempEmail = document.getElementById("email").value
        document.getElementById("reset-button").click();
        document.getElementById("email").value = tempEmail;
    }
}

function togglePasswordVisibility() {
    var x = document.getElementById("password");
    var y = document.getElementById("reconfirm")
    if (x.type == "password") {
        x.type = "text"
        y.type = "text"
    } else {
        x.type = "password";
        y.type = "password"
    }
}
