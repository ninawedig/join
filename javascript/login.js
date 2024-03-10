function openSignUpPage() {
    window.location.href = "signup.html";
}

function openPrivacyPolicyPage() {
    window.location.href = "privacypolicy.html";
}

function openLegalNoticePage() {
    window.location.href = "legalnotice.html";
}

users = [
    {'e-mail': 'ninawedig@yahoo.de', 'password': 'passwort123' } // soll nicht wie hier im Frontend gespeichert sein, sondern im Backend
]
users = [
    {'e-mail': 'ninawedig@yahoo.de', 'password': 'passwort123' } // soll nicht wie hier im Frontend gespeichert sein, sondern im Backend
]

function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(u => u.email == email.value && u.password ==  password.value);
    console.log(user);
    if(user) {
        console.log('User gefunden');
    }
}


