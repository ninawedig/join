let users = [
    { 'name': 'Nina', 'email': 'ninawedig@yahoo.de', 'password': 'passwort123' }
];

function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;
    let policy = document.querySelector('.checkbox').checked;

    let messageBoxName = document.getElementById('messageboxName');
    let messageBoxEmail = document.getElementById('messageboxEmail');
    let messageBoxPassword = document.getElementById('messageboxPassword');
    let messageboxConfirmpassword = document.getElementById('messageboxConfirmpassword');
    let messageBoxPolicy = document.getElementById('messageboxPolicy');

    if (name && email && password && confirmPassword && policy) {
        if (password !== confirmPassword) {
            messageboxConfirmpassword.textContent = "Ups! Your password don`t match";
            document.getElementById('confirmpassword').classList.add('inputEmpty');
            return;
        } else {
            messageBoxPassword.textContent = "";
        }

        users.push({ 'name': name, 'email': email, 'password': password });
        showSuccess();
    } else {
        if (!name) {
            messageBoxName.textContent = "Please fill out this field.";
            document.getElementById('name').classList.add('inputEmpty');
        } else {
            messageBoxName.textContent = "";

        }
        if (!email) {
            messageBoxEmail.textContent = "Please fill out this field.";
            document.getElementById('email').classList.add('inputEmpty');
        } else {
            messageBoxEmail.textContent = "";

        }
        if (!password) {
            messageBoxPassword.textContent = "Please fill out this field.";
            document.getElementById('password').classList.add('inputEmpty');
        } else {
            messageBoxPassword.textContent = "";

        }
        if (!confirmPassword) {
            messageboxConfirmpassword.textContent = "Please fill out this field.";
            document.getElementById('confirmpassword').classList.add('inputEmpty');
        } else {
            messageBoxPassword.textContent = "";

        }
        if (!policy) {
            messageBoxPolicy.textContent = "Please confirm the Privacy policy.";

        } else {
            messageBoxPolicy.textContent = "";
        }
    }
}

// checkField(name);
// checkField(email);
// checkField(password);
// checkField(confirmPassword);

// function checkField(field){
//     if(!field) {
//         document.getElementById(id).classList.add('inputEmpty');
//         let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
//         console.log(idBigFirstLetter);
//         document.getElementById(`messagebox${idBigFirstLetter}`).textContent = ""; 
//     }
//     else
// {
//     resetOutline(field);
// }
// }


function resetOutline(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    console.log(idBigFirstLetter);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

function checkPolicy() {
    let checkbox = document.querySelector('.checkbox');
    if (checkbox.checked) {
        document.getElementById('messageboxPolicy').textContent = "";
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

function openSignUpPage() {
    window.location.href = "signup.html";
}



