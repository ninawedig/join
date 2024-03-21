const smallMenu = document.getElementById('smallMenu');
let contacts = [];
let selectedContacts = [];
let subtasks = [];
let assignedContacts = [];
let taskId = 0;
let prio = 'medium';

async function init() {
    renderNavbar();
    makeNavbarActive('addTask');
    makeSmallNavbarActive('addTaskSmall');
    await loadContacts();
    await loadUsers();
    await loadTasks();
    renderContacts();
    renderHeader();
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

async function addtask(status) {
    let assign_to = assignedContacts;
    let category = document.getElementById('selectTaskCategory');
    let description = document.getElementById('description');
    let duedate = document.getElementById('duedate');
    taskId = taskId++;
    let title = document.getElementById('title');
    let task = {
        'assign_to': assign_to,
        'category': category.innerHTML,
        'description': description.value,
        'due_date': duedate.value,
        'id': taskId,
        'prio': prio,
        'subtask': subtasks,
        'title': title.value,
        'status': status
    }

    let categoryframe = document.getElementById('category');
    let messageBoxTitle = document.getElementById('messageboxTitle');
    let messageBoxDuedate = document.getElementById('messageboxDuedate');
    let messageBoxCategory = document.getElementById('messageboxCategory');
    let technicalTask = document.getElementById('technicalTask');
    let userStory = document.getElementById('userStory');

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

    if (technicalTask.checked || userStory.checked) {
        messageBoxCategory.textContent = "";
    } else {
        messageBoxCategory.textContent = "Please select a category.";
        categoryframe.classList.add('inputEmpty');
    }

    if (title.value && duedate.value && (technicalTask.checked || userStory.checked)) {
        tasks.push(task);
        await setItem('tasks', JSON.stringify(tasks));
        window.location.href = "board.html";
    }
}

function selectCategory(category) {
    let selectCategory = document.getElementById('selectTaskCategory');
    selectCategory.innerHTML = category;
    toggleDropDownMenu();
}

function resetOutlineAddtask(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    console.log(idBigFirstLetter);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

function clearFields() {
    clearTitle();
    clearDescription();
    clearDueDate();
    clearSubtasks();
    clearPrio();
    clearSelectedContacts();
    clearCategory();
}

function clearTitle() {
    document.getElementById('title').value = "";
}

function clearDescription() {
    document.getElementById('description').value = "";
}

function clearDueDate() {
    document.getElementById('duedate').value = "";
}

function clearSubtasks() {
    document.getElementById('inputSubtask').value = "";
    while (subtasks.length > 0) {
        deleteSubtask(0);
    }
}

function clearPrio() {
    setPrio('medium');
}

function clearSelectedContacts() {
    assignedContacts = [];
    selectedContacts = [];
    renderAssignedContactsList(assignedContactsList);
    document.querySelectorAll('.checkbox').forEach(function (checkbox) {
        checkbox.src = "./../img/addtask/rectangle.svg";
    });
    document.querySelectorAll('.dropDownContact').forEach(function (dropDownContact) {
        dropDownContact.classList.remove('contactSelected');
    });
    document.getElementById('subtaskInput').style.marginTop = '0';
}

function clearCategory() {
    let selectCategory = document.getElementById('selectTaskCategory');
    selectCategory.innerHTML = 'Select task category';
}

function addSubtask() {
    let inputSubtask = document.getElementById('inputSubtask');
    if (inputSubtask.value) {
        let subtask = {
            'description': inputSubtask.value,
            'status': 'toDo'
        }
        subtasks.push(subtask);
        renderSubtasks();
        inputSubtask.value = '';
    }
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
    document.getElementById('assignedContactsList').classList.add('noDisplay');
}

function closeContactsDropDown() {
    const dropDownMenu = document.getElementById('contactsDropDownMenuContainer');
    dropDownMenu.classList.add('noDisplay');
    document.getElementById('assignedContactsList').classList.remove('noDisplay');
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

    if (window.innerWidth <= 1400 && isSelected) {
        document.getElementById('subtaskInput').style.marginTop = '25px';
    } else {
        document.getElementById('subtaskInput').style.marginTop = '0';
    }

    if (isSelected) {
        checkbox.src = "./../img/addtask/checked.svg";
        selectedContacts.push(contacts[i]) - 1;
        addToAssignedList(i, contacts[i]);
    } else {
        deselectContacts(contactName, checkbox);
    }
}

function deselectContacts(contactName, checkbox) {
    checkbox.src = "./../img/addtask/rectangle.svg";
    let selectedContactIndex = findSelectedIndex(contactName);
    selectedContacts.splice(selectedContactIndex, 1);
    removeFromAssignedList(selectedContactIndex);
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

function renderSubtasks() {
    let subtaskList = document.getElementById('subtaskList');
    subtaskList.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i].description;
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

function setPrio(selectedPrio) {
    event.preventDefault();
    document.getElementById('lowPrio').classList.remove('lowPrioButtonClicked');
    document.getElementById('mediumPrio').classList.remove('mediumPrioButtonClicked');
    document.getElementById('urgentPrio').classList.remove('urgentPrioButtonClicked');
    prio = selectedPrio;
    prioBoard = selectedPrio;
    document.getElementById(`${selectedPrio}Prio`).classList.add(`${prio}PrioButtonClicked`);
}