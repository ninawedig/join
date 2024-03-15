

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
            if (checkbox.checked) {
                rememberMe();
            }
        } else {
            messageBoxPassword.textContent = "Wrong password. Please try again.";
            passwordInput.classList.add('inputEmpty');
        }
    }
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
       
    }}



function resetOutline(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    console.log(idBigFirstLetter);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

function rememberMe() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    emailInput.style.autocomplete = 'on';
    passwordInput.style.autocomplete = 'on';
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('password', passwordInput.value);
}

// Funktion, ob irgendwas im Local storage gespeichert ist, dann automatisch ausfüllen

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




