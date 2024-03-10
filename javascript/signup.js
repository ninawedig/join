function init(){

}

function showSuccess(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars
    
    document.getElementById('successBackgroud').classList.remove('successBackgroundHide');
    document.getElementById('successBackgroud').classList.add('successBackgroundShow');
    document.getElementById('successButton').classList.add('successButtonShow');
    document.getElementById('successButton').classList.remove('successButtonHide');


}

users = [
    {'name': 'Nina', 'e-mail': 'ninawedig@yahoo.de', 'password': 'passwort123' } // soll nicht wie hier im Frontend gespeichert sein, sondern im Backend
]

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    users.push({name: name.value, email: email.value, password: password.value});
    window.location.href = 'login.html'; //hiermit wird man nach Registrierung zur login.html weitergeleitet
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