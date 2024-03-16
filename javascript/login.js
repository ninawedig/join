let storedLogins = [];

function login() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let messageBoxEmail = document.getElementById('messageboxEmail');
    let messageBoxPassword = document.getElementById('messageboxPassword');
    let checkbox = document.getElementById('checkbox');

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
            if (checkbox.checked) {
                saveToLocalStorage();
                changeIcon();
            }
        } else {
            messageBoxPassword.textContent = "Wrong password. Please try again.";
            passwordInput.classList.add('inputEmpty');
        }
    }
}

function saveToLocalStorage() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let loginData = {
        'email': email,
        'password': password,
    }
    storedLogins.push(loginData);
    let storedLoginsAsString = JSON.stringify(storedLogins);
    localStorage.setItem('key', storedLoginsAsString);
}

function loadLocalStorage() {
    let storedLoginsAsString = localStorage.getItem('key');
    storedLogins = JSON.parse(storedLoginsAsString);
    if (storedLogins.length > 0) {
        let lastLogin = storedLogins[storedLogins.length - 1];

        document.getElementById('email').value = lastLogin.email;
        document.getElementById('password').value = lastLogin.password;
    }
}

function changeIcon() {
    document.getElementById('checkbox').classList.remove('input[type=checkbox]')
    document.getElementById('checkbox').classList.add('input[type=checkbox]:checked')
}

function guestLogin() {
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
        openSummaryPage();

    }
}

function resetOutline(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    console.log(idBigFirstLetter);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

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

function openSignUpPage() {
    window.location.href = "signup.html";
}




