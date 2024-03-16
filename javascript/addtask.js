const smallMenu = document.getElementById('smallMenu');
let contacts = [];
let selectedContacts = [];
let subtasks = [];

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

function addtask() {
    let title = document.getElementById('title');
    let duedate = document.getElementById('duedate');
    let category = document.getElementById('category');
    let messageBoxTitle = document.getElementById('messageboxTitle');
    let messageBoxDuedate = document.getElementById('messageboxDuedate');
    let messageBoxCategory = document.getElementById('messageboxCategory');

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

    if (category.value == 'Select task category') {
        messageBoxCategory.textContent = "Please select a category.";
        category.classList.add('inputEmpty');
    } else {
        messageBoxCategory.textContent = "";
    }

    if (title.value && duedate.value && category.value !== 'x') {
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
        let randomColor = getRandomColor();
        contactsList.innerHTML += getContactsListHTML(contact, randomColor, i);
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

function getRandomColor() {
    const badgeColors = ["#9327FF", "#FF7A00", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1"];
    const randomColor = badgeColors[Math.floor(Math.random() * badgeColors.length)];
    return randomColor;
}

function filterContactNames() {
    let search = document.getElementById('searchContact').value.toLowerCase();

    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let randomColor = getRandomColor();
        if (contact['name'].toLowerCase().includes(search)) {
            let isSelected = isSelectedContact(contact);

            contactsList.innerHTML += getContactsListHTML(contact, randomColor, i);

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



function getContactsListHTML(contact, randomColor, i) {
    return /*HTML*/ `
                    <div class="dropDownContact" id="contactNo${i}" onclick="selectContact(${i}, '${contact.name}')">
                        <div class="contactDetails">
                            <div class="contactProfileBadge" style="background-color: ${randomColor};">${contact.initials}</div>
                            <div class="contactName">${contact.name}</div>
                        </div>
                        <img id="checkboxNo${i}" src="./img/addtask/rectangle.svg" class="checkbox">
                    </div>
                    `
}

function selectContact(i, contactName) {
    let contact = document.getElementById(`contactNo${i}`);
    let checkbox = document.getElementById(`checkboxNo${i}`);

    contact.classList.toggle('contactSelected');
    let isSelected = contact.classList.contains('contactSelected');


    if (isSelected) {
        checkbox.src = "./../img/addtask/checked.svg";
        selectedContacts.push(contacts[i]) - 1;
        console.log('you selected', selectedContacts);
    } else {
        checkbox.src = "./../img/addtask/rectangle.svg";
        let selectedContactIndex = findSelectedIndex(contactName);
        selectedContacts.splice(selectedContactIndex, 1);
        console.log(selectedContacts.length);
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
    subtasks.push(inputSubtask.value);
    renderSubtasks();
    inputSubtask.value = '';
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