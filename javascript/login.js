function openSignUpPage() {
    window.location.href = "signup.html";
}

function openPrivacyPolicyPage() {
    window.location.href = "privacypolicy.html";
}

function openLegalNoticePage() {
    window.location.href = "legalnotice.html";
}

const users = [
    { 'email': 'ninawedig@yahoo.de', 'password': 'passwort123' }
];

function login() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let messageBox = document.getElementById('messagebox');
    let messageBoxPassword = document.getElementById('messageboxPassword');
    if (emailInput.value && passwordInput.value) {
        let user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);
        if (user) {
            openSummaryPage();
        } else {
            messageBoxPassword.textContent = "Wrong password Ups! Try again.";
        }
    } else {
        messageBox.textContent = "Please fill out this field.";
    }
}
function openSummaryPage() {
    window.location.href = "summary.html";
}




