const smallMenu = document.getElementById('smallMenu');
const contactActionsOverlay = document.getElementById('contactActionsOverlay');
const editContactContainer = document.getElementById('editContactContainer');
const addContactContainer = document.getElementById('addContactContainer');
const contactPage = document.getElementById('contactPage');
const contactsFrame = document.getElementById('contactsFrame');
const addPersonIcon = document.getElementById('addPersonIcon');
const editContactIcon = document.getElementById('editContactIcon');
const contactCard = document.getElementById('contactCard');
const smallEditMenu = document.getElementById('smallEditMenu');

function init() {
    renderHeader();
    renderNavbar();
    makeNavbarActive('contacts');
    makeSmallNavbarActive('contactsSmall');
}

function showSmallMenu() {
    smallMenu.classList.toggle('noDisplay');
}

function selectContact(contact) {
    document.getElementById(contact).classList.toggle('contactFieldActive');
    if (window.innerWidth <= 740) {
        openContactPage();
    }
    showContact();
}

function openContactPage() {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'block';


    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

function closeContactPage(contact) {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'none';
    contactCard.classList.toggle('contactCardActive');
    document.getElementById(contact).classList.toggle('contactFieldActive');


    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

function showContact() {
    contactCard.classList.toggle('contactCardActive');
}

function editContact() {
    contactActionsOverlay.classList.remove('noDisplay');
    editContactContainer.classList.remove('noDisplay');

    closeSmallEditMenu();
}

function closeEditContact() {
    contactActionsOverlay.classList.add('noDisplay');
    editContactContainer.classList.add('noDisplay');
}

function addContact() {
    contactActionsOverlay.classList.remove('noDisplay');
    addContactContainer.classList.remove('noDisplay');
}

function closeAddContact() {
    contactActionsOverlay.classList.add('noDisplay');
    addContactContainer.classList.add('noDisplay');
}

function openSmallEditMenu() {
    document.getElementById('smallEditMenuOverlay').classList.remove('noDisplay');
    smallEditMenu.classList.add('smallEditMenuOpened');
    smallEditMenu.classList.remove('noDisplay');
}

function closeSmallEditMenu() {
    document.getElementById('smallEditMenuOverlay').classList.add('noDisplay');
    smallEditMenu.classList.remove('smallEditMenuOpened');
    smallEditMenu.classList.add('noDisplay');
}