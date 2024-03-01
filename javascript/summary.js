const activeUserButton = document.getElementById('activeUserButton');
const smallMenu = document.getElementById('smallMenu');

function init(){
    renderHeader();
    renderNavbar();
}

function showSmallMenu(){
    smallMenu.classList.toggle('noDisplay');
}

