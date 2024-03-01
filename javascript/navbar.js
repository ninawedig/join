function renderNavbar() {
    document.getElementById('navbar').innerHTML = `
    <div class="sidenavLogoContainer">
    <img src="./img/nav/logo.png" alt="" class="logo">
</div>
<div class="sidenavLinks">
    <a id="summary" class="sidenavLinkActive" href="summary.html">
        <div class="iconContainer">
            <img class="sideNavIcon" src="./img/nav/summaryIcon.svg">
        </div>Summary
    </a>
    <a id="addTask" href="addtask.html">
        <div class="iconContainer">
            <img class="sideNavIcon" src="./img/nav/editSquareIcon.svg">
        </div>Add Task
    </a>
    <a id="board" href="board.html">
        <div class="iconContainer">
            <img class="sideNavIcon" src="./img/nav/boardIcon.svg" alt="">
        </div>Board
    </a>
    <a id="contacts" href="contacts.html">
        <div class="iconContainer"><img class="sideNavIcon" src="./img/nav/contactIcon.svg" alt=""></div>
        Contacts
    </a>
</div>
<div class="sidenavLegalLinks">
    <a href="privacypolicy.html">Privacy Policy</a>
    <a href="legalnotice.html">Legal notice</a>
</div>
`;
}

function makeNavbarActive(page) {
    document.getElementById('summary').classList.remove('sidenavLinkActive');
    document.getElementById('addTask').classList.remove('sidenavLinkActive');
    document.getElementById('board').classList.remove('sidenavLinkActive');
    document.getElementById('contacts').classList.remove('sidenavLinkActive');
    document.getElementById(page).classList.add('sidenavLinkActive');
}