let storedLogins = [];

/**
 * this is the function to login into join and to warn if required messageboxes are not filled.
 */
async function login() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let messageBoxEmail = document.getElementById('messageboxEmail');
    let messageBoxPassword = document.getElementById('messageboxPassword');
    let checkbox = document.getElementById('checkbox');

    //check if email is filled. Otherwise warning is shown.
    if (!emailInput.value) {
        messageBoxEmail.textContent = "Please fill out this field.";
        document.getElementById('email').classList.add('inputEmpty');
    } else {
        messageBoxEmail.textContent = "";
    }
    //check if password is filled. Otherwise warning is shown.
    if (!passwordInput.value) {
        messageBoxPassword.textContent = "Please fill out this field.";
        document.getElementById('password').classList.add('inputEmpty');
    } else {
        messageBoxPassword.textContent = "";
    }
    if (emailInput.value && passwordInput.value) {
        //check if email and password are saved in remote storage, if user is registered
        let user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);
        if (user) {
            user.active = true;
            await setItem('users', JSON.stringify(users));
            //if user is registered, forward to the summarypage
            openSummaryPage();
            // if "remeber me" is checked, the data is saved to local storage for the next login
            if (checkbox.checked) {
                saveToLocalStorage();
                changeIcon();
            }
            // if tha data is not the same that is saved in the storage, warning is shown
        } else {
            messageBoxPassword.textContent = "Wrong password. Please try again.";
            passwordInput.classList.add('inputEmpty');
        }
    }
}

/**
 * this function saves the login data in the local storage.
 */
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

/**
 * this function is to load the saved data from the local storage.
 */
function loadLocalStorage() {
    let storedLoginsAsString = localStorage.getItem('key');
    storedLogins = JSON.parse(storedLoginsAsString);
    if (storedLogins) {
        if (storedLogins.length > 0) {
            let lastLogin = storedLogins[storedLogins.length - 1];

            document.getElementById('email').value = lastLogin.email;
            document.getElementById('password').value = lastLogin.password;
        }
    }
}

/**
 * this function is to change the checkbox icon to checked.
 */

function changeIcon() {
    document.getElementById('checkbox').classList.remove('input[type=checkbox]')
    document.getElementById('checkbox').classList.add('input[type=checkbox]:checked')
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
 * this function is to change the icon of the password field from lock to closedeye when focus the inputfield.
 */

function changeImage() {
    document.getElementById('passwordimage').src = '/img/login/visibility_off.svg';
}

/**
 * this function is to open the summarypage when click on the guestLogin.
 */

function guestLogin() {
    openSummaryPage();
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
 * this function is to open the summarypage.
 */

function openSummaryPage() {
    window.location.href = "summary.html";
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