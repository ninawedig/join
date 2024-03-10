function openSignUpPage() {
    window.location.href = "signup.html";
}

function openPrivacyPolicyPage() {
    window.location.href = "privacypolicy.html";
}

function openLegalNoticePage() {
    window.location.href = "legalnotice.html";
}

// Definieren der Benutzerdaten
const users = [
    { 'email': 'ninawedig@yahoo.de', 'password': 'passwort123' }
];

// Login-Funktion
function login() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let messageBox = document.getElementById('messagebox');
    if (emailInput.value && passwordInput.value) {
        let user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);
        if (user) {
            openSummaryPage();
        } else {
            messageBox.textContent = "Wrong password Ups! Try again.";
        }
    } else {
        messageBox.textContent = "Please fill in all fields.";
    }
}
function openSummaryPage() {
    window.location.href = "summary.html";
}




