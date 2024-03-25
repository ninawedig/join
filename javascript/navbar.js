/**
 * This function renders the navbar.
 */
function renderNavbar() {
    document.getElementById('navbar').innerHTML = getNavbarHTML();
    document.getElementById('smallNav').innerHTML = getSmallNavHTML();
}

/**
 * This function highlights the title of the page the user is on by changing its background color in the big navbar.
 * @param {*} page is the page the user is on.
 */
function makeNavbarActive(page) {
    deactivateNavbar();
    document.getElementById(page).classList.add('sidenavLinkActive');
}

/**
 * This function makes all the elements of the navbar look neutral.
 */
function deactivateNavbar(){
    document.getElementById('summary').classList.remove('sidenavLinkActive');
    document.getElementById('addTask').classList.remove('sidenavLinkActive');
    document.getElementById('board').classList.remove('sidenavLinkActive');
    document.getElementById('contacts').classList.remove('sidenavLinkActive');
}

/**
 * This function highlights the title of the page the user is on by changing its background color in the small navbar.
 * @param {*} page is the page the user is on.
 */
function makeSmallNavbarActive(page) {
    document.getElementById('summarySmall').classList.remove('smallNavLinkActive');
    document.getElementById('addTaskSmall').classList.remove('smallNavLinkActive');
    document.getElementById('boardSmall').classList.remove('smallNavLinkActive');
    document.getElementById('contactsSmall').classList.remove('smallNavLinkActive');
    document.getElementById(page).classList.add('smallNavLinkActive');
}