const smallMenu = document.getElementById('smallMenu');

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
    document.getElementById('contactActionsOverlay').classList.remove('noDisplay');
    document.getElementById('editContactContainer').classList.remove('noDisplay');
}

function closeEditContact(){
    document.getElementById('contactActionsOverlay').classList.add('noDisplay');
    document.getElementById('editContactContainer').classList.add('noDisplay');
}