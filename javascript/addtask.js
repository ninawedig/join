let tasks = [];

const smallMenu = document.getElementById('smallMenu');
let contacts = [];
let selectedContacts = [];
let subtasks = [];
let assignedContacts = [];

async function init() {
    renderHeader();
    renderNavbar();
    makeNavbarActive('addTask');
    makeSmallNavbarActive('addTaskSmall');
    await loadContacts();
    renderContacts();
}

function showSmallMenu() {
    smallMenu.classList.toggle('noDisplay');
}

async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'))
    }
    catch (e) {
        console.info('Could not load tasks')
    }
}

async function addtask() {
    let title = document.getElementById('title');
    let duedate = document.getElementById('duedate');
    let description = document.getElementById('description');
    let category = document.getElementById('selectTaskCategory');
    let categoryframe = document.getElementById('category');
    let subtask = document.getElementById('inputSubtask');
    let messageBoxTitle = document.getElementById('messageboxTitle');
    let messageBoxDuedate = document.getElementById('messageboxDuedate');
    let messageBoxCategory = document.getElementById('messageboxCategory');
    let technicalTask = document.getElementById('technicalTask');
    let userStory = document.getElementById('userStory');
    let task= {'title': title,'duedate': duedate,'description': description,'subtask': subtask}

    if (!title.value) {
        messageBoxTitle.textContent = "Please fill out this field.";
        title.classList.add('inputEmpty');
    } else {
        messageBoxTitle.textContent = "";
    }

    if (!duedate.value) {
        messageBoxDuedate.textContent = "Please fill out this field.";
        duedate.classList.add('inputEmpty');
    } else {
        messageBoxDuedate.textContent = "";
    }

    if (category.innerHTML == 'Select task category') {
        messageBoxCategory.textContent = "Please select a category.";
        categoryframe.classList.add('inputEmpty');
    } else {
        messageBoxCategory.textContent = "";

    }

    if (title.value && duedate.value) {
        
        tasks.push(task);
        await setItem('tasks', JSON.stringify(tasks));
        window.location.href = "board.html";
    }
}

function resetOutlineAddtask(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    console.log(idBigFirstLetter);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

function clearFields() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('duedate').value = "";
}

function toggleDropDownMenu() {
    const arrow = document.getElementById('categoryDropDownArrow');
    const dropDown = document.getElementById('dropDownCategory');

    arrow.classList.toggle('rotated');
    dropDown.classList.toggle('noDisplay');
}

async function loadContacts() {
    firstLetters = await getItem('firstLetters')
        .then(response => JSON.parse(response));
    console.log('the first letters are', firstLetters);
    contacts = await getItem('contacts')
        .then(response => JSON.parse(response));
    console.log('the contacts are', contacts);
}

function renderContacts() {
    let contactsList = document.getElementById('contactsList');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let badgeColor = contacts[i].badgeColor;
        contactsList.innerHTML += getContactsListHTML(contact, badgeColor, i);
    }
}

function openContactsDropDown() {
    const dropDownMenu = document.getElementById('contactsDropDownMenuContainer');
    dropDownMenu.classList.remove('noDisplay');
}

function closeContactsDropDown() {
    const dropDownMenu = document.getElementById('contactsDropDownMenuContainer');
    dropDownMenu.classList.add('noDisplay');
}

function filterContactNames() {
    let search = document.getElementById('searchContact').value.toLowerCase();

    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let badgeColor = contact.badgeColor;
        if (contact['name'].toLowerCase().includes(search)) {
            let isSelected = isSelectedContact(contact);

            contactsList.innerHTML += getContactsListHTML(contact, badgeColor, i);

            if (isSelected) {
                document.getElementById(`checkboxNo${i}`).src = "./../img/addtask/checked.svg";
                document.getElementById(`contactNo${i}`).classList.toggle('contactSelected');
            }
        }
    }
}

function isSelectedContact(contact) {
    return selectedContacts.some(selectedContact => selectedContact.name === contact.name);
}



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

function selectContact(i, contactName, contactInitials) {
    let contact = document.getElementById(`contactNo${i}`);
    let checkbox = document.getElementById(`checkboxNo${i}`);

    contact.classList.toggle('contactSelected');
    let isSelected = contact.classList.contains('contactSelected');


    if (isSelected) {
        checkbox.src = "./../img/addtask/checked.svg";
        selectedContacts.push(contacts[i]) - 1;
        console.log('you selected', selectedContacts);
        addToAssignedList(i, contacts[i]);
    } else {
        checkbox.src = "./../img/addtask/rectangle.svg";
        let selectedContactIndex = findSelectedIndex(contactName);
        selectedContacts.splice(selectedContactIndex, 1);
        removeFromAssignedList(selectedContactIndex);
    }
}

function removeFromAssignedList(selectedContactIndex) {
    let assignedContactsList = document.getElementById('assignedContactsList');
    assignedContacts.splice(selectedContactIndex, 1);
    renderAssignedContactsList(assignedContactsList);
}

function addToAssignedList(i, contact) {
    let assignedContactsList = document.getElementById('assignedContactsList');
    assignedContacts.push(contact);
    renderAssignedContactsList(assignedContactsList);
}

function renderAssignedContactsList(assignedContactsList) {
    assignedContactsList.innerHTML = '';

    for (let i = 0; i < assignedContacts.length; i++) {
        const assignedContact = assignedContacts[i];
        let badgeColor = assignedContact.badgeColor;
        assignedContactsList.innerHTML += `
        <div class="contactProfileBadge" style="background-color: ${badgeColor}">${assignedContact.initials}</div>
        `;
    }
}



function findSelectedIndex(contactName) {
    return selectedContacts.findIndex(contact => contact['name'] === contactName);
}

function selectCategory(category) {
    let selectCategory = document.getElementById('selectTaskCategory');
    selectCategory.innerHTML = category;
    toggleDropDownMenu();
}

function addSubtask() {
    let inputSubtask = document.getElementById('inputSubtask');
    if (inputSubtask.value) {
        subtasks.push(inputSubtask.value);
        renderSubtasks();
        inputSubtask.value = '';
    }
}

function renderSubtasks() {
    let subtaskList = document.getElementById('subtaskList');
    subtaskList.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        subtaskList.innerHTML += `
                    <li id="subtask">${subtask}
                        <div class="subTasksImgContainer">
                            <img onclick="editSubtask()" src="./img/addtask/editpen.svg" alt="">
                            <div class="subTaskVerticalLine"></div>
                            <img onclick="deleteSubtask(${i})" src="./img/addtask/deleteicon.svg" alt="">
                        </div>
                    </li>
                    <div id="editSubtaskField" class="editSubtasksContainer noDisplay">${subtask}
                        <div class="subTasksImgContainer editSubtasks">
                            <img onclick="deleteSubtask(${i})" class="editSubtaskIcon" src="./img/addtask/deleteicon.svg" alt="">
                            <div class="subTaskVerticalLine">
                        </div>
                        <img class="editSubtaskIcon" onclick="saveEditChanges()" src="./img/addtask/check2.svg" alt="">
                    </div>
    `;
    }
}

function editSubtask() {
    let subtask = document.getElementById('subtask');
    let editSubtaskField = document.getElementById('editSubtaskField');

    subtask.classList.toggle('noDisplay');
    editSubtaskField.classList.toggle('noDisplay');
}

function saveEditChanges() {
    editSubtask();
}

function deleteSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}