const smallMenu = document.getElementById('smallMenu');

function init(){
    renderHeader();
    renderNavbar();
    makeNavbarActive('summary');
}

function showSmallMenu(){
    smallMenu.classList.toggle('noDisplay');
}

