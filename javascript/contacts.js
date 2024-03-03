const smallMenu = document.getElementById('smallMenu');
const contactActionsOverlay = document.getElementById('contactActionsOverlay');
const editContactContainer = document.getElementById('editContactContainer');
const addContactContainer = document.getElementById('addContactContainer');
const contactPage = document.getElementById('contactPage');
const contactsFrame = document.getElementById('contactsFrame');
const addPersonIcon = document.getElementById('addPersonIcon');
const editContactIcon = document.getElementById('editContactIcon');
const contactCard = document.getElementById('contactCard');

function init() {
    renderHeader();
    renderNavbar();
    makeNavbarActive('contacts');
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

function closeContactPage(){
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'none';
    contactCard.classList.toggle('contactCardActive');
    

    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

function showContact() {
    contactCard.classList.toggle('contactCardActive');
}

function editContact() {
    contactActionsOverlay.classList.remove('noDisplay');
    editContactContainer.classList.remove('noDisplay');
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