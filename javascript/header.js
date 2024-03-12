function renderHeader() {
    document.getElementById('header').innerHTML = `
    <div class="headerTitle">Kanban Project Management Tool</div>
    <div class="headerLogo"><img src="./../img/favicon.png"></div>
    <div class="headerIcons">
        <a href="help.html" class="helpIconContainer"><img class="helpIcon" src="./img/help.svg" alt=""></a>
        <div onclick="showSmallMenu()" id="activeUserButton" class="activeUser">SM</div>
    </div>
    `
    document.getElementById('smallMenu').innerHTML = `
    <a href="legalnotice.html">Legal Notice</a>
    <a href="privacypolicy.html">Privacy Policy</a>
    <a href="#">Log out</a>
`;
    renderInitials()
}

function renderInitials() {
    let userInitials = getInitials(users[0]['name']);
    document.getElementById('activeUserButton').innerHTML = userInitials;
}

function getInitials(name) {
    return name.match(/(\b\S)?/g).join("").slice(0, 2);;
}
