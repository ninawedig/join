const smallMenu = document.getElementById('smallMenu');

function init(){
    renderHeader();
    renderNavbar();
    makeNavbarActive('contacts');
}

function showSmallMenu(){
    smallMenu.classList.toggle('noDisplay');
}

