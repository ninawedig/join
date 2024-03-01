

function renderNavbar() {
    document.getElementById('navbar').innerHTML = `
    <div class="sidenavLogoContainer">
    <img src="./img/nav/logo.png" alt="" class="logo">
</div>
<div class="sidenavLinks">
    <a class="sidenavLinkActive" href="summary.html">
        <div class="iconContainer">
            <img class="sideNavIcon" src="./img/nav/summaryIcon.svg">
        </div>Summary
    </a>
    <a  href="addtask.html">
        <div class="iconContainer">
            <img class="sideNavIcon" src="./img/nav/editSquareIcon.svg">
        </div>Add Task
    </a>
    <a  href="board.html">
        <div class="iconContainer">
            <img class="sideNavIcon" src="./img/nav/boardIcon.svg" alt="">
        </div>Board
    </a>
    <a href="contacts.html">
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