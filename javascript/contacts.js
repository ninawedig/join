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
