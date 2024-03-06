const smallMenu = document.getElementById('smallMenu');

function init(){
    renderHeader();
    renderNavbar();
    makeNavbarActive('addTask');
    makeSmallNavbarActive('addTaskSmall');
}

function showSmallMenu(){
    smallMenu.classList.toggle('noDisplay');
}

