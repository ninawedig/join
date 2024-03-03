const smallMenu = document.getElementById('smallMenu');
const contactActionsOverlay = document.getElementById('contactActionsOverlay');
const editContactContainer = document.getElementById('editContactContainer');
const addContactContainer = document.getElementById('addContactContainer');

function init(){
    renderHeader();
    renderNavbar();
    makeNavbarActive('contacts');
}

function showSmallMenu(){
    smallMenu.classList.toggle('noDisplay');
}

function selectContact(contact){
    document.getElementById(contact).classList.toggle('contactFieldActive');
    showContact();
}

function showContact(){
    document.getElementById('contactCard').classList.toggle('contactCardActive');
}

function editContact(){
    contactActionsOverlay.classList.remove('noDisplay');
    editContactContainer.classList.remove('noDisplay');
}

function closeEditContact(){
    contactActionsOverlay.classList.add('noDisplay');
    editContactContainer.classList.add('noDisplay');
}

function addContact(){
    contactActionsOverlay.classList.remove('noDisplay');
    addContactContainer.classList.remove('noDisplay');
}

function closeAddContact(){
    contactActionsOverlay.classList.add('noDisplay');
    addContactContainer.classList.add('noDisplay');
}