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
    <a onclick="logout()" href="#">Log out</a>
`;
    renderInitials()
}

function renderInitials() {
    let activeUser = users.find(user => user.active === true);
    if(activeUser){
    let userInitials = getInitials(activeUser.name);
    document.getElementById('activeUserButton').innerHTML = userInitials;
    } else {
        document.getElementById('activeUserButton').innerHTML = `
        <img class="guestLogo" src="./../img/summary/logo.svg">
        `;
    }
}

function getInitials(name) {
    return name.match(/(\b\S)?/g).join("").slice(0, 2);;
}

async function logout() {
    let activeUser = users.find(user => user.active === true);
    activeUser.active = false;
    await setItem('users', JSON.stringify(users));
    openLoginPage();
}
