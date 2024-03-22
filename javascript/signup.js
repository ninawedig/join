let users = [];

function renderUsers() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'))
    }
    catch (e) {
        console.info('Could not load users')
    }
}

async function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;
    let policy = document.querySelector('.checkbox').checked;
    let user = {'name': name,'email': email,'password': password, active: false}
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
        users.push(user);
        await setItem('users', JSON.stringify(users));
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

function resetOutline(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

function changeEye() {
    let passwordInput = document.getElementById('password');
    let passwordImage = document.getElementById('passwordimage');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordImage.src = '/img/login/visibility_on.svg';
    } else {
        passwordInput.type = 'password';
        passwordImage.src = '/img/login/visibility_off.svg';
    }
}

function changeEyeAtConfirmPassword() {
    let passwordInput = document.getElementById('confirmpassword');
    let passwordImage = document.getElementById('passwordimageConfirmed');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordImage.src = '/img/login/visibility_on.svg';
    } else {
        passwordInput.type = 'password';
        passwordImage.src = '/img/login/visibility_off.svg';
    }
}

function changeImage() {
    document.getElementById('passwordimage').src = '/img/login/visibility_off.svg';
}

function changeImageAtConfirmPassword() {
    document.getElementById('passwordimageConfirmed').src = '/img/login/visibility_off.svg';
}

function checkPolicy() {
    let checkbox = document.querySelector('.checkbox');
    if (checkbox.checked) {
        document.getElementById('messageboxPolicy').textContent = "";
        document.getElementById('checkbox').classList.remove('input[type=checkbox]')
        document.getElementById('checkbox').classList.add('input[type=checkbox]:checked')
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

async function clearUsers(){
    users = [];
    await setItem('users', JSON.stringify(users));
}



