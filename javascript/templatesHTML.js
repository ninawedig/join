/**
 * This function render the HTML of the card in the board.
 * @param {string} element - the string for the array of tasks per category
 * @returns the HTML of the cards.
 */
function generateCardHTML(element, category, id, categoryClass) {
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${id})" class="taskCard" onclick="showCardDetail(${id})" id="task${id}">
        <div class="taskCategory ${categoryClass}">${category}</div>
        <div class="taskInfo">
            <div class="taskTitle">${element['title']}</div>
            <div class="taskDescription">${element['description']}</div>
        </div>
        <div class="taskSubtasks" id="taskSubtasks${id}">
            <div class="progressBar" id="progressBar">
                <div class="progress" id="progressBar${id}"></div>
            </div>
            <div class="progressInfo" id="progressInfo${id}"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="taskMembers" id="taskMemberCard${id}"></div>
            <div id="tasksPrio${id}"> 
                
                </div>
        </div>
    </div>`;
}

/**
 * This function renders the CardDetailHeaderHTML-
 * @returns html
 */
function renderCardDetailHeaderHTML(){
    return /*html */`
    <div id="cardDetailHeader">
            <h1 id="cardDetailHeaderH1">Add task</h1>
            <div class="closeIconContainer" onclick="closeCardDetail()">
                <img class="closeIcon" src="./img/contacts/close.svg" alt="">
            </div>                    
    </div>`;
}

/**
 * This functoin returns the HTML of the detailcard
 * @param {Array} task - the array and id of the choosen detailcard
 * @returns returns the HTML of the detailcard
 */
function generateCardDetailHTML(task, category, categoryClass, id) {
    return /*html*/`
        <div id="cardDetailHeader">
            <div class="taskCategory ${categoryClass}">${category}</div>
            <div class="closeIconContainer" onclick="closeCardDetail()">
                <img class="closeIcon" src="./img/contacts/close.svg" alt="">
            </div>                    
        </div>
        <div class="taskInfoDetail">
            <div class="taskTitleDetail">${task['title']}</div>
            <p class="taskDescriptionDetail">${task['description']}</p>
            <table>
                <tr>
                    <th>Due date:</th>
                    <td><p>${task['due_date']}</p></td>
                </tr>
                <tr>
                    <th>Priority:</th>
                    <td id="taskPrio" style="display: flex; align-items: center; gap: 8px">
                    </td>
                </tr>                                            
            </table>
            <table><th>Assign to:</th></table>
            <ul id="taskMemberDetail"></ul>
            <table><th>Subtasks</th></table>
            <ul id="taskSubtasks"></ul>
        </div>
        <div class="taskFunctionsContainer">
            <div class="taskFunctions" onclick="showEditTask(${id})"><img class="taskFunctionsIcons"
                    src="./img/contacts/edit.svg" alt="">Edit</div>
            <div class="taskFunctions" onclick="deleteTask(${id})" style="border-left: solid 1px #D1D1D1; padding-left: 16px;"><img class="taskFunctionsIcons"
                    src="./img/contacts/delete.svg" alt="">Delete</div>
        </div>`;
}

/**
 * This function renders the html of the subtask svg.
 * @param {int} i - index of the selected subtask
 * @param {array} element - array of the selected task
 * @param {int} takenTask - index of the selected task
 * @returns the HTML of the svg
 */
function renderSubtaskToDoSvg(i, element, takenTask) {
    return /*html*/`
    <li id="subtask${i}">
        <div onclick="changeSubtaskStatus(${i}, ${takenTask})">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6821 8.39673V14.3967C17.6821 16.0536 16.339 17.3967 14.6821 17.3967H4.68213C3.02527 17.3967 1.68213 16.0536 1.68213 14.3967V4.39673C1.68213 2.73987 3.02527 1.39673 4.68213 1.39673H12.6821" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
            <path d="M5.68213 9.39673L9.68213 13.3967L17.6821 1.89673" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>                        
        <p>${element['description']}</p>    
    </li>`;
}

/**
 * This function renders the html of the subtask svg.
 * @param {int} i - index of the selected subtask
 * @param {array} element - array of the selected task
 * @param {int} takenTask - index of the selected task
 * @returns the HTML of the svg
 */
function renderSubtaskDoneSvg(i, element, takenTask) {
    return  /*html*/`
    <li id="subtask${i}">
        <div onclick="changeSubtaskStatus(${i}, ${takenTask})">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.68213" y="1.39673" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
        </div>                        
        <p>${element['description']}</p>    
    </li>`;
}

/**
 * This function renders the the HTML of urgent SVG
 * @returns the HTML of urgent SVG
 */
function renderUrgentHTML() {
    return /*html*/`
    <div style="display: flex; align-items: center;">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_149397_2254)">
        <path d="M8.50014 4.75476C8.69957 4.75443 8.89385 4.81633 9.05439 4.93137L16.6229 10.3653C16.7214 10.4361 16.8045 10.525 16.8677 10.627C16.9308 10.7291 16.9726 10.8422 16.9908 10.9599C17.0275 11.1977 16.9655 11.4399 16.8185 11.6333C16.6715 11.8266 16.4515 11.9553 16.207 11.9909C15.9624 12.0266 15.7133 11.9664 15.5144 11.8234L8.50014 6.7925L1.48589 11.8234C1.38742 11.8942 1.27557 11.9454 1.15674 11.9742C1.03791 12.0029 0.914423 12.0086 0.793326 11.9909C0.672226 11.9733 0.555893 11.9326 0.450966 11.8712C0.346037 11.8099 0.254568 11.729 0.181784 11.6333C0.109 11.5375 0.0563226 11.4288 0.0267625 11.3132C-0.00279753 11.1977 -0.00866262 11.0776 0.00950107 10.9599C0.0276667 10.8422 0.0695043 10.7291 0.13263 10.627C0.195754 10.525 0.278927 10.4361 0.377402 10.3653L7.94589 4.93137C8.10643 4.81633 8.30071 4.75443 8.50014 4.75476Z" fill="#FF0000"/>
        <path d="M8.49996 -0.000121266C8.69939 -0.000455511 8.89366 0.0614475 9.0542 0.176482L16.6227 5.61045C16.8216 5.75336 16.9539 5.96724 16.9906 6.20502C17.0273 6.4428 16.9653 6.68501 16.8183 6.87837C16.6713 7.07173 16.4513 7.20039 16.2068 7.23606C15.9622 7.27173 15.7131 7.21147 15.5142 7.06856L8.49996 2.03761L1.48571 7.06856C1.28683 7.21147 1.03771 7.27173 0.793142 7.23606C0.548573 7.20039 0.328596 7.07173 0.181601 6.87837C0.0346055 6.68501 -0.0273661 6.4428 0.00931796 6.20502C0.0460039 5.96723 0.178341 5.75336 0.377219 5.61044L7.94571 0.176482C8.10625 0.0614474 8.30053 -0.000455546 8.49996 -0.000121266Z" fill="#FF0000"/>
        </g>
        <defs>
        <clipPath id="clip0_149397_2254">
        <rect width="17" height="12" fill="white" transform="translate(17 12) rotate(-180)"/>
        </clipPath>
        </defs>
        </svg>
    </div>`;
}

/**
 *  This function renders the the HTML of medium SVG
 * @returns the HTML of medium SVG
 */
function renderMediumHTML() {
    return  /*html*/`
    <div style="display: flex; align-items: center;">
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_146349_2583)">
                <path d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z" fill="#FFA800"/>
                <path d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z" fill="#FFA800"/>
            </g>
            <defs>
                <clipPath id="clip0_146349_2583">
                    <rect width="17" height="6.33333" fill="white" transform="translate(0.5 0.833252)"/>
                </clipPath>
            </defs>
        </svg>
    </div>`;
}

/**
 *  This function renders the the HTML of low SVG
 * @returns the HTML of low SVG
 */
function renderLowHTML() {
    return /*html*/`
    <div style="display: flex; align-items: center;">
        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2485 9.50614C10.0139 9.50654 9.7854 9.4317 9.59655 9.29262L0.693448 2.72288C0.57761 2.63733 0.47977 2.52981 0.405515 2.40647C0.33126 2.28313 0.282043 2.14638 0.260675 2.00404C0.217521 1.71655 0.290421 1.42372 0.463337 1.18994C0.636253 0.956173 0.895022 0.800615 1.18272 0.757493C1.47041 0.71437 1.76347 0.787216 1.99741 0.960004L10.2485 7.04248L18.4997 0.960004C18.6155 0.874448 18.7471 0.812529 18.8869 0.777782C19.0266 0.743035 19.1719 0.736141 19.3144 0.757493C19.4568 0.778844 19.5937 0.828025 19.7171 0.902225C19.8405 0.976425 19.9481 1.07419 20.0337 1.18994C20.1194 1.3057 20.1813 1.43717 20.2161 1.57685C20.2509 1.71653 20.2578 1.86169 20.2364 2.00404C20.215 2.14638 20.1658 2.28313 20.0916 2.40647C20.0173 2.52981 19.9195 2.63733 19.8036 2.72288L10.9005 9.29262C10.7117 9.4317 10.4831 9.50654 10.2485 9.50614Z" fill="#7AE229"/>
            <path d="M10.2485 15.2547C10.0139 15.2551 9.7854 15.1802 9.59655 15.0412L0.693448 8.47142C0.459502 8.29863 0.30383 8.04005 0.260675 7.75257C0.217521 7.46509 0.290421 7.17225 0.463337 6.93848C0.636253 6.70471 0.895021 6.54915 1.18272 6.50603C1.47041 6.46291 1.76347 6.53575 1.99741 6.70854L10.2485 12.791L18.4997 6.70854C18.7336 6.53575 19.0267 6.46291 19.3144 6.50603C19.602 6.54915 19.8608 6.70471 20.0337 6.93848C20.2066 7.17225 20.2795 7.46509 20.2364 7.75257C20.1932 8.04005 20.0376 8.29863 19.8036 8.47142L10.9005 15.0412C10.7117 15.1802 10.4831 15.2551 10.2485 15.2547Z" fill="#7AE229"/>
        </svg>
    </div>`;
}

/**
 * This function renders the HTML of the contactlist in the addtask page.
 * @param {string} contact is the selected contact
 * @param {string} badgeColor is the color of the badge in which the initials are shown. 
 * @param {string} i is the contact from the list of contacts. 
 * @returns the HTML when opening the contact list
 */
function getContactsListHTML(contact, badgeColor, i) {
    return /*HTML*/ `
            <div class="dropDownContact" id="contactNo${i}" onclick="selectContact(${i}, '${contact.name}', '${contact.initials}')">
                <div class="contactDetails">
                    <div class="contactProfileBadge" style="background-color: ${badgeColor};">${contact.initials}</div>
                    <div class="contactName">${contact.name}</div>
                </div>
                <img id="checkboxNo${i}" src="./img/addtask/rectangle.svg" class="checkbox">
            </div>
            `
}

/**
 * This function is to render the HTML of the created subtasks on the addtaskpage. 
 * @param {string} subtask is the created subtask
 * @param {string} i is the subtask from the subtasks list
 * @returns the HTML when create a subtask.
 */
function rendersubtasksHTML(subtask, i) {
    return /*html*/`
<li id="subtask${i}">${subtask}
<div class="subTasksImgContainer">
    <img onclick="editSubtask(${i})" src="./img/addtask/editpen.svg" alt="">
    <div class="subTaskVerticalLine"></div>
    <img onclick="deleteSubtask(${i})" src="./img/addtask/deleteicon.svg" alt="">
</div>
</li>
<div id="editSubtaskField${i}" class="editSubtasksContainer noDisplay">
<input class="editSubtaskText" id="editSubtaskText${i}" value='${subtask}'>
<div class="subTasksImgContainer editSubtasks">
    <img onclick="deleteSubtask(${i})" class="editSubtaskIcon" src="./img/addtask/deleteicon.svg" alt="">
<div class="subTaskVerticalLine">
</div>
    <img class="editSubtaskIcon" onclick="saveEditChanges(${i})" src="./img/addtask/check2.svg" alt="">
`;
}

/**
 * This generates the HTML text for the categories.
 * @param {*} firstLetter is the category name
 * @returns the HTML with the cattegories sorted alphabetically.
 */
function generateLettersCategoriesHTML(firstLetter) {
    return /*HTML*/ `
                    <div id="container${firstLetter}">
                        <div class="contactLetter">${firstLetter}</div>
                        <div class="contactsSeparationLine"></div>
                        <div class="contactsGroup" id="contactsList${firstLetter}">
                                <!-- RENDER JS-->
                        </div>
                    </div>
                    `;
}

/**
 * This function renders the contacts HTML under each category.
 * @param {*} firstLetter is the category name
 * @param {*} i is the index of the contact
 * @param {*} nameInitials are the initials of the name
 * @param {*} contact is the element of the array contacts
 * @param {*} badgeColor this is the random color for the badge background
 */
function renderContactUnderCategory(firstLetter, i, nameInitials, contact, badgeColor) {
    document.getElementById(`contactsList${firstLetter}`).innerHTML += /*HTML*/`
                    <div onclick="selectContact(${i})" class="contactField" id="contact${i}">
                        <div class="contactProfileBadge" style="background-color: ${badgeColor};">${nameInitials}</div>
                        <div class="contactDetails">
                            <div class="contactName">${contact['name']}</div>
                            <div class="contactEmail">${contact['email']}</div>
                        </div>
                    </div>       
                `;
}

/**
 * This function generates the HTML for the contact card.
 * @param {*} nameInitials are the initials of the name
 * @param {*} i is the index of the contact
 * @param {*} badgeColor is a random color for the badge background
 * @returns  The html code for a contact card when clicked.
 */
function generateContactCardHTML(nameInitials, i, badgeColor) {
    return /*HTML*/`
                    <div class="contactCardMainInfos">
                        <div class="contactProfileBadgeBig" style="background-color: ${badgeColor};">${nameInitials}</div>
                        <div class="contactNameBigContainer">
                            <div class="contactNameBig">${contacts[i]['name']}</div>
                            <div class="contactFunctionsContainer">
                                <div class="contactFunctions" onclick="openContactEditor(${i})"><img class="contactFunctionsIcons" src="./img/contacts/edit.svg" alt="">Edit</div>
                                <div onclick="deleteContact(${i})" class="contactFunctions"><img class="contactFunctionsIcons" src="./img/contacts/delete.svg" alt="">Delete</div>
                            </div>
                        </div>
                    </div>
                    <div class="contactCardSubHead">Contact Information</div>
                    <div class="contactCardDetails">
                        <div class="contactCardContactInformations">
                            <div class="contactMethod">Email</div>
                            <div class="contactDetails contactEmail">${contacts[i]['email']}</div>
                        </div>
                        <div class="contactCardContactInformations">
                            <div class="contactMethod">Phone</div>
                            <div class="contactDetails contactPhone">${contacts[i]['phone']}</div>
                        </div>
                    </div>
    `;
}

/**
 * This function generates the edit contact form
 * @param {*} nameInitials are the initials of the contact
 * @param {*} i is the index of the contact
 * @returns the contact to be edited.
 */
function generateContactFormHTML(nameInitials, i) {
    return /*HTML*/`
                    <div class="contactProfileBadgeBig editContactProfileBadge contactActionProfileBadgeBig">${nameInitials}</div>
                    <form class="contactActionForm">
                        <div class="closeIconContainer" onclick="closeContactEditor()"><img class="closeIcon"
                            src="./img/contacts/close.svg" alt=""></div>
                        <input id="editNameInput" class="contactActionInput" type="text" value="${contacts[i]['name']}">
                        <input id="editEmailInput" class="contactActionInput" type="email" value="${contacts[i]['email']}">
                        <input id="editPhoneInput" class="contactActionInput" type="tel" value="${contacts[i]['phone']}">
                        <div class="formButtonsContainer">
                            <button onclick="deleteContact(${i});return false;" class="formButton deleteButton">Delete</button>
                            <button class="formButton saveButton" onclick="editContact()">Save <img src="./img/contacts/check.svg" alt=""></button>
                        </div>
                    </form>
    `;
}

/**
 * This renders the html of the header.
 * @returns the html code.
 */
function getHeaderHTML(){
    return /*HTML*/ `
            <div class="headerTitle">Kanban Project Management Tool</div>
            <div class="headerLogo"><img src="./img/favicon.png"></div>
            <div class="headerIcons">
                <a href="help.html" class="helpIconContainer"><img class="helpIcon" src="./img/help.svg" alt=""></a>
                <div onclick="showSmallMenu()" id="activeUserButton" class="activeUser"></div>
            </div>
    `;
}

/**
 * This returns the html of the small menu.
 * @returns the html code.
 */
function getSmallMenuHTML(){
    return /*HTML*/ `
            <a href="legalnotice.html">Legal Notice</a>
            <a href="privacypolicy.html">Privacy Policy</a>
            <a onclick="logout()" href="#">Log out</a>
`;
}

/**
 * This returns the html of the navbar.
 * @returns the html code.
 */
function getNavbarHTML(){
    return /*HTML*/ `
            <div class="sidenavLogoContainer"><img src="./img/nav/logo.png" alt="" class="logo"></div>
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
                    <div class="iconContainer">
                        <img class="sideNavIcon" src="./img/nav/contactIcon.svg" alt="">
                    </div>Contacts    
                </a>
            </div>
            <div class="sidenavLegalLinks">
                <a href="privacypolicy.html">Privacy Policy</a>
                <a href="legalnotice.html">Legal notice</a>
            </div>
`;
}

/**
 * This returns the html of the small navbar.
 * @returns the html code.
 */
function getSmallNavHTML(){
    return /*HTML*/ `
            <a id="summarySmall" class="smallNavElement smallNavLinkActive" href="summary.html">
                <img src="./img/nav/summaryIcon.svg" class="smallNavImg" alt="">
                <div class="smallNavText">Summary</div>
            </a>
            <a id="boardSmall" class="smallNavElement" href="board.html">
                <img src="./img/nav/boardIcon.svg" class="smallNavImg" alt="">
                <div class="smallNavText">Board</div>
            </a>
            <a id="addTaskSmall" class="smallNavElement" href="addtask.html">
                <img src="./img/nav/editSquareIcon.svg" class="smallNavImg" alt="">
                <div class="smallNavText">Add Tasks</div>
            </a>
            <a id="contactsSmall" class="smallNavElement" href="contacts.html">
                <img src="./img/nav/contactIcon.svg" class="smallNavImg" alt="">
                <div class="smallNavText">Contacts</div>
            </a>
    `;
}