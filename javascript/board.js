function init(x){
    renderHeader();
    renderNavbar();
    makeNavbarActive(x);
    makeSmallNavbarActive(x);
}

function showCardDetail(){
    document.getElementById('cardContainer').style = "display: flex";
    document.getElementById('cardContainerBackground').style = "display: flex";
    
}

function closeCardDetail(){
    document.getElementById('cardContainer').style = "display: none";
    document.getElementById('cardContainerBackground').style = "display: none";
}
