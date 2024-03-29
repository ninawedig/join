let users = [];

function renderUsers() {
    loadUsers();
}
/**
 * This function is to load the user data from the remote storage.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'))
    }
    catch (e) {
        console.info('Could not load users')
    }
}

/**
 * this function is to signup a new user.
 */
async function addUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmpassword').value;
    let policy = document.querySelector('.checkbox').checked;
    let user = { 'name': name, 'email': email, 'password': password, active: false }
    let messageBoxName = document.getElementById('messageboxName');
    let messageBoxEmail = document.getElementById('messageboxEmail');
    let messageBoxPassword = document.getElementById('messageboxPassword');
    let messageboxConfirmpassword = document.getElementById('messageboxConfirmpassword');
    let messageBoxPolicy = document.getElementById('messageboxPolicy');

    if (name && email && password && confirmPassword && policy) {
        checkPassword(password, confirmPassword, messageboxConfirmpassword, messageBoxPassword, user);
    } else {
        checkFilledInput(name, messageBoxName, email, messageBoxEmail, password, messageBoxPassword, confirmPassword, messageboxConfirmpassword, policy, messageBoxPolicy)
    }
}

/**
 * This function is to check if the password and the confirmed password are equal and to push the registered user into the JSON
 * @param {*} password is the value of the password 
 * @param {*} confirmPassword is the value of the confirmed password 
 * @param {*} messageboxConfirmpassword shows the warning under the inputfield of the confirmed password 
 * @param {*} messageBoxPassword shows the warning under the inputfield of the password
 * @param {*} user is the JSON of the registered data
 */
async function checkPassword(password, confirmPassword, messageboxConfirmpassword, messageBoxPassword, user) {
    if (password !== confirmPassword) {
        messageboxConfirmpassword.textContent = "Ups! Your password don`t match";
        document.getElementById('confirmpassword').classList.add('inputEmpty');
    } else {
        messageBoxPassword.textContent = "";
        users.push(user);
        await setItem('users', JSON.stringify(users));
        showSuccess();
    }
}

/**
 * This function is used as a variable to check if the required input fields are filled and shows a warning if not. 
 */
function checkInput(value, messageBox, inputElement) {
    if (!value) {
        messageBox.textContent = "Please fill out this field.";
        inputElement.classList.add('inputEmpty');
    } else {
        messageBox.textContent = "";
        inputElement.classList.remove('inputEmpty');
    }
}

/**
 * This function checks with the checkInput function if the required input fields are filled and shows a warning if not. 
 */
function checkFilledInput(name, messageBoxName, email, messageBoxEmail, password, messageBoxPassword, confirmPassword, messageboxConfirmpassword, policy, messageBoxPolicy) {
    checkInput(name, messageBoxName, document.getElementById('name'));
    checkInput(email, messageBoxEmail, document.getElementById('email'));
    checkInput(password, messageBoxPassword, document.getElementById('password'));
    checkInput(confirmPassword, messageboxConfirmpassword, document.getElementById('confirmpassword'));
    if (!policy) {
        messageBoxPolicy.textContent = "Please confirm the Privacy policy.";
    } else {
        messageBoxPolicy.textContent = "";
    }
}

/**
 * this function is to reset the red outlines of the input fields and to empty the messagebox when the field is focused. 
 * @param {*} id this is the inputfield that is focused.
 */
function resetOutline(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

/**
 * this function is to change the icon and type of the password field depending if the password should be visible or not.
 */
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

/**
 * this function is to change the icon and type of the confirmpassword field depending if the password should be visible or not.
 */
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

/**
 * this function is to change the icon of the password field from lock to closedeye when focus the inputfield.
 */
function changeImage() {
    document.getElementById('passwordimage').src = '/img/login/visibility_off.svg';
}

/**
 * this function is to change the icon of the changepassword field from lock to closedeye when focus the inputfield.
 */
function changeImageAtConfirmPassword() {
    document.getElementById('passwordimageConfirmed').src = '/img/login/visibility_off.svg';
}

/**
 * this function is to remove the warning and to show the checked icon if the checkbox is checked. 
 */
function checkPolicy() {
    let checkbox = document.querySelector('.checkbox');
    if (checkbox.checked) {
        document.getElementById('messageboxPolicy').textContent = "";
        document.getElementById('checkbox').classList.remove('input[type=checkbox]')
        document.getElementById('checkbox').classList.add('input[type=checkbox]:checked')
    }
}

/**
 * this function shows the "Signup was successful" display and forwards to the login page.
 */
async function showSuccess() {
    document.getElementById('successBackgroud').classList.remove('successBackgroundHide');
    document.getElementById('successBackgroud').classList.add('successBackgroundShow');
    document.getElementById('successButton').classList.add('successButtonShow');
    document.getElementById('successButton').classList.remove('successButtonHide');
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000);
    window.location.href = "login.html";
}

/**
 * this function is to open the privacypolicy.
 */
function openPrivacyPolicyPage() {
    window.location.href = "privacypolicy.html";
}

/**
 * this function is to open the legalnotice.
 */
function openLegalNoticePage() {
    window.location.href = "legalnotice.html";
}

/**
 * this function is to open the loginpage.
 */
function openLoginPage() {
    window.location.href = "login.html";
}

/**
 * this function is to open the signup page.
 */
function openSignUpPage() {
    window.location.href = "signup.html";
}

/**
 * this function is to empty the users array.
 */
async function clearUsers() {
    users = [];
    await setItem('users', JSON.stringify(users));
}