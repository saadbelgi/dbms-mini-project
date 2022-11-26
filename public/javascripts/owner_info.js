function changeLabelTag(selection) {
    console.log(selection)
    var temp = document.getElementById("5")
    if(selection == 1) {
        temp.innerText = "Aadhar number:"
    }
    else if(selection == 2) {
        temp.innerText = "PAN number:"
    }
    else if(selection == 3) {
        temp.innerText = "Voter ID number:"
    }
    else {
        temp.innerText = "Driving license number:"
    }
    temp.style = "visibility:visible"
    document.getElementById("govt_id_number").style = "visibility:visible"
}

function validateInput() {
    var a = document.getElementById("govt_id_number").value
    var b = document.getElementById("5").innerText
    if(b == "Aadhar number:") {
        if(a.search(/[2-9]{1}[0-9]{11}/) == 0 && a.length == 12){
            document.getElementById("f1").action = "/post-homeowner-info"
            document.getElementById("submit-button").click()
        }
        else {
            window.alert("Invalid aadhar number!")
            document.getElementById("reset-button").click()
        }
    }
    else if(b == "PAN number:") {
        if(a.search(/[A-Z]{3}[ABCFGHJLPT]{1}[A-Z]{1}[0-9]{3}[1-9]{1}[A-Z]{1}/) == 0 && a.length == 10) {
            document.getElementById("f1").action = "/post-homeowner-info"
            document.getElementById("submit-button").click()
        }
        else {
            window.alert("Invalid PAN number!")
            document.getElementById("reset-button").click()
        }
    }
    else if(b == "Voter ID number:") {
        if(a.search(/[A-Z]{3}[0-9]{7}/) == 0 && a.length == 10) {
            document.getElementById("f1").action = "/post-homeowner-info"
            document.getElementById("submit-button").click()
        }
        else {
            window.alert("Invalid Voter ID number!")
            document.getElementById("reset-button").click()
        }
    }
    else {
        if(a.search(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/) == 0 && a.length == 16) {
            document.getElementById("f1").action = "/post-homeowner-info"
            document.getElementById("submit-button").click()
        }
        else {
            window.alert("Invalid driving license number!")
            document.getElementById("reset-button").click()
        }
    }
}