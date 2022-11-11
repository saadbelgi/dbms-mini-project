function validatePassword() {
    var a, b, c, d;
    a = document.getElementById("password").value;
    b = /[0-9]/.exec(a); //returns null if pwd doesn't contain a numeric digit
    c = /[a-z]/.exec(a); //returns null if pwd doesn't contain a lowercase letter
    d = /[A-Z]/.exec(a); //returns null if pwd doesn't contain an uppercase letter
    if (b == null || c == null || d == null) {
        var tempEmail = document.getElementById("email").value;
        window.alert(
            "Your password is invalid.\nOur passwords contain atleast 1 lowercase letter, 1 uppercase character and 1 numeric digit."
        );
        document.getElementById("reset-button").click();
        document.getElementById("password").type = "password"
        document.getElementById("email").value = tempEmail;
    } else {
        document.getElementById("f1").action = "login.php"
        document.getElementById("make-pwd-visible").checked = false
        document.getElementById("submit-button").click();
    }
}
function togglePasswordVisibility() {
    var x = document.getElementById("password");
    if (x.type == "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
