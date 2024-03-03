const smallMenu = document.getElementById('smallMenu');

function init(){
    renderHeader();
    renderNavbar();
    makeNavbarActive('summary');
    makeSmallNavbarActive('summarySmall');
}

function showSmallMenu(){
    smallMenu.classList.toggle('noDisplay');
}

