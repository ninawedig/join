const smallMenu = document.getElementById('smallMenu');

function init(){
    renderHeader();
    renderNavbar();
    makeNavbarActive('addtask');
    makeSmallNavbarActive('addtaskSmall');
}

function showSmallMenu(){
    smallMenu.classList.toggle('noDisplay');
}

