function init() {

}

let users = [
    { 'name': 'Nina', 'email': 'ninawedig@yahoo.de', 'password': 'passwort123' }
];


function addUser() {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;


    let messageBoxName = document.getElementById('messageboxName');
    let messageBoxEmail = document.getElementById('messageboxEmail');
    let messageBoxPassword = document.getElementById('messageboxPassword');
    let messageBoxPasswordConfirmed = document.getElementById('messageboxPasswordConfirmed');


    if (name && email && password && confirmPassword) {

        if (password !== confirmPassword) {

            messageBoxPasswordConfirmed.textContent = "Ups! Your password don`t match";
            return;
        } else {
            messageBoxPassword.textContent = "";
        }


        users.push({ 'name': name, 'email': email, 'password': password });
        showSuccess();
    } else {
        if (!name) {
            messageBoxName.textContent = "Please fill out this field.";
        } else {
            messageBoxName.textContent = "";
        }
        if (!email) {
            messageBoxEmail.textContent = "Please fill out this field.";
        } else {
            messageBoxEmail.textContent = "";
        }
        if (!password) {
            messageBoxPassword.textContent = "Please fill out this field.";
        } else {
            messageBoxPassword.textContent = "";
        }
        if (!confirmPassword) {
            messageBoxPasswordConfirmed.textContent = "Please fill out this field.";
        } else {
            messageBoxPassword.textContent = "";
        }
    }
}


async function showSuccess() {
    document.getElementById('successBackgroud').classList.remove('successBackgroundHide');
    document.getElementById('successBackgroud').classList.add('successBackgroundShow');
    document.getElementById('successButton').classList.add('successButtonShow');
    document.getElementById('successButton').classList.remove('successButtonHide');


    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    await delay(2000);

    window.location.href = "login.html";
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
