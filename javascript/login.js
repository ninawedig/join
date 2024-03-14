let users = [
    { 'name': 'Nina', 'email': 'ninawedig@yahoo.de', 'password': 'passwort123' }
];

function login() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let messageBoxEmail = document.getElementById('messageboxEmail');
    let messageBoxPassword = document.getElementById('messageboxPassword');

    if (!emailInput.value) {
        messageBoxEmail.textContent = "Please fill out this field.";
        document.getElementById('email').classList.add('inputEmpty');
    } else {
        messageBoxEmail.textContent = "";
    }

    if (!passwordInput.value) {
        messageBoxPassword.textContent = "Please fill out this field.";
        document.getElementById('password').classList.add('inputEmpty');
    } else {
        messageBoxPassword.textContent = "";
    }

    if (emailInput.value && passwordInput.value) {
        let user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);
        if (user) {
            openSummaryPage();
        } else {
            messageBoxPassword.textContent = "Wrong password Ups! Try again.";
            document.getElementById('password').classList.add('inputEmpty');
        }
    }
}


function resetOutline(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    console.log(idBigFirstLetter);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

// function rememberMe() {
//     let checkbox = document.querySelector('.checkbox');
//     if (checkbox.checked) {
//         dann soll beim nächsten Login das Autofill eingestellt sein
//     }
// }

function openSummaryPage() {
    window.location.href = "summary.html";
}

function openPrivacyPolicyPage() {
    window.location.href = "privacypolicy.html";
}

function openLegalNoticePage() {
    window.location.href = "legalnotice.html";
}

function openLoginPage() {
    window.location.href = "login.html";
}





