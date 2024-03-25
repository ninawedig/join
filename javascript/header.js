/**
 * This function renders the header of the page.
 */
function renderHeader() {
    document.getElementById('header').innerHTML = getHeaderHTML(); 
    document.getElementById('smallMenu').innerHTML = getSmallMenuHTML();
    renderInitials()
}

/**
 * This function renders the initials of the logged in user, or the join logo if logged in as a guest.
 */
function renderInitials() {
    let activeUser = users.find(user => user.active === true);
    if (activeUser) {
        let userInitials = getInitials(activeUser.name);
        document.getElementById('activeUserButton').innerHTML = userInitials;
    } else {
        document.getElementById('activeUserButton').innerHTML = `
        <img class="guestLogo" src="img/summary/logo.svg">
        `;
    }
}

/**
 * This function is used to get the Initials of a name.
 * @param {*} name is the variable that we want to get the initials for.
 * @returns the initials.
 */
function getInitials(name) {
    return name.match(/(\b\S)?/g).join("").slice(0, 2);;
}

/**
 * This function logs out the active user.
 */
async function logout() {
    let activeUser = users.find(user => user.active === true);
    if (activeUser) {
        activeUser.active = false;
        await setItem('users', JSON.stringify(users));
    }
    openLoginPage();
}