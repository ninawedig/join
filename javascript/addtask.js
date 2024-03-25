const smallMenu = document.getElementById('smallMenu');
let contacts = [];
let selectedContacts = [];
let subtasks = [];
let assignedContacts = [];
let taskId = 0;
let prio = 'medium';

/**
 * This loads the page.
 */
async function init() {
    renderNavbar();
    makeNavbarActive('addTask');
    makeSmallNavbarActive('addTaskSmall');
    await loadContacts();
    await loadUsers();
    await loadTasks();
    renderContacts();
    renderHeader();
    setupDropDownCloseListener();
}

/**
 * This shows or hides the small menu when clicked.
 */
function showSmallMenu() {
    smallMenu.classList.toggle('noDisplay');
}

/**
 * This function is to load the tasks data from the remote storage.
 */

async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'))
    }
    catch (e) {
        console.info('Could not load tasks')
    }
}

/**
 * this function is to add a new task to the board.
 * @param {string} status 
 */

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
        'status': status,
    }

    let categoryframe = document.getElementById('category');
    let messageBoxTitle = document.getElementById('messageboxTitle');
    let messageBoxDuedate = document.getElementById('messageboxDuedate');
    let messageBoxCategory = document.getElementById('messageboxCategory');
    let technicalTask = document.getElementById('technicalTask');
    let userStory = document.getElementById('userStory');

    //check every required field if it is filled, otherwise warning is shown
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
    // check if all required fields are filled, then forward to the boardpage
    if (title.value && duedate.value && (technicalTask.checked || userStory.checked)) {
        // tasks are pushed in the task array 
        tasks.push(task);
        await setItem('tasks', JSON.stringify(tasks));
        window.location.href = "board.html";
    }
}

/**
 * This function is to select the task category.
 * @param {string} category category presents the different task categories. 
 */

function selectCategory(category) {
    let selectCategory = document.getElementById('selectTaskCategory');
    selectCategory.innerHTML = category;
    toggleDropDownMenu();
}

/**
 * this function is to reset the red outlines of the input fields and to empty the messagebox when the field is focused. 
 * @param {string} id this is the inputfield that is focused.
 */

function resetOutlineAddtask(id) {
    document.getElementById(id).classList.remove('inputEmpty');
    let idBigFirstLetter = id[0].toUpperCase() + id.slice(1);
    document.getElementById(`messagebox${idBigFirstLetter}`).textContent = "";
}

/**
 * this function is to clear all filled fields when click on the clear button. 
 */
function clearFields() {
    clearTitle();
    clearDescription();
    clearDueDate();
    clearSubtasks();
    clearPrio();
    clearSelectedContacts();
    clearCategory();
}
/**
 * This function is to clear the filled title field.
 */
function clearTitle() {
    document.getElementById('title').value = "";
}

/**
 * This function is to clear the filled description field.
 */
function clearDescription() {
    document.getElementById('description').value = "";
}

/**
 * This function is to clear the filled Due Date field.
 */
function clearDueDate() {
    document.getElementById('duedate').value = "";
}

/**
 * This function is to clear the delete the saved subtasks. 
 */
function clearSubtasks() {
    document.getElementById('inputSubtask').value = "";
    while (subtasks.length > 0) {
        deleteSubtask(0);
    }
}

/**
 * This function is to reset the Prio Field to medium when clear the form. 
 */

function clearPrio() {
    setPrio('medium');
}

/**
 * This function is to reset the selected contacts when clear the form.
 */
function clearSelectedContacts() {
    //clear the arrays
    assignedContacts = [];
    selectedContacts = [];
    // render the contact list and show all contacts as unmarked
    renderAssignedContactsList(assignedContactsList);
    document.querySelectorAll('.checkbox').forEach(function (checkbox) {
        checkbox.src = "./../img/addtask/rectangle.svg";
    });
    document.querySelectorAll('.dropDownContact').forEach(function (dropDownContact) {
        dropDownContact.classList.remove('contactSelected');
    });
    document.getElementById('subtaskInput').style.marginTop = '0';
}

/**
 * This function is to reset the task category when clear the form. 
 */
function clearCategory() {
    let selectCategory = document.getElementById('selectTaskCategory');
    selectCategory.innerHTML = 'Select task category';
}

/**
 * This function is to add subtasks to the list.
 */
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

/**
 * This function is to show the dropdownmenu at categories and to change the direction of the arrow in the dropdown.
 */
function toggleDropDownMenu() {
    const arrow = document.getElementById('categoryDropDownArrow');
    const dropDown = document.getElementById('dropDownCategory');

    arrow.classList.toggle('rotated');
    dropDown.classList.toggle('noDisplay');
}

function setupDropDownCloseListener() {
    setupDropDownCategory();
    setupDropDownContacts();
}

/**
 * This function is to close the dropdownmenu at contacts when the users clicks apart from the dropdown menu. 
 */
function setupDropDownContacts() {
    document.addEventListener("click", function (event) {
        const dropDownContacts = document.getElementById('contactsDropDownMenuContainer');
        const arrowContacts = document.getElementById('assignedDropDownArrow');
        const targetElement = event.target;
        if (!dropDownContacts.contains(targetElement) && !dropDownContacts.classList.contains('noDisplay') && targetElement !== arrowContacts) {
            closeContactsDropDown();
        }
    });
}
/**
 * This function is to close the dropdownmenu at category when the users clicks apart from the dropdown menu. 
 */
function setupDropDownCategory() {
    document.addEventListener("click", function (event) {
        const dropDownCategory = document.getElementById('dropDownCategory');
        const arrowCategory = document.getElementById('categoryDropDownArrow');
        const targetElement = event.target;
        if (!dropDownCategory.contains(targetElement) && !dropDownCategory.classList.contains('noDisplay') && targetElement !== arrowCategory) {
            toggleDropDownMenu();
        }
    });
}

/**
 * This function is to load the saved contacts from the remote storage. 
 */

async function loadContacts() {
    firstLetters = await getItem('firstLetters')
        .then(response => JSON.parse(response));
    contacts = await getItem('contacts')
        .then(response => JSON.parse(response));
}

/**
 * This function is to render all contacts to the contactlist. 
 */

function renderContacts() {
    let contactsList = document.getElementById('contactsList');

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let badgeColor = contacts[i].badgeColor;
        contactsList.innerHTML += getContactsListHTML(contact, badgeColor, i);
    }
}

/**
 * This function is to open the contacts in the dropdownmenu.
 */

function openContactsDropDown() {
    const dropDownMenu = document.getElementById('contactsDropDownMenuContainer');
    dropDownMenu.classList.remove('noDisplay');
    document.getElementById('assignedContactsList').classList.add('noDisplay');
}

/**
 * This function is to close the contacts in the dropdownmenu.
 */

function closeContactsDropDown() {
    const dropDownMenu = document.getElementById('contactsDropDownMenuContainer');
    dropDownMenu.classList.add('noDisplay');
    document.getElementById('assignedContactsList').classList.remove('noDisplay');
}

/**
 * This function is to search for the contacts in the searchfield.
 */

function filterContactNames() {
    //This function changes the letters of the value of seachContacts into small letter, that we compare small letters to small letters
    let search = document.getElementById('searchContact').value.toLowerCase();
    //empty the input that we can use it for a new search
    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let badgeColor = contact.badgeColor;
        //check if value of the search is part of one of the contacts
        if (contact['name'].toLowerCase().includes(search)) {
            let isSelected = isSelectedContact(contact);

            contactsList.innerHTML += getContactsListHTML(contact, badgeColor, i);
            //check if the searched contact is marked 
            if (isSelected) {
                document.getElementById(`checkboxNo${i}`).src = "./../img/addtask/checked.svg";
                document.getElementById(`contactNo${i}`).classList.toggle('contactSelected');
            }
        }
    }
}

/**
 * This function checks if the name of the returned contact is already part of the selected contacts
 * @param {string} contact is the name of the saved contacts
 * @returns true if the name of the returned contact is already part of the selected contacts
 */
function isSelectedContact(contact) {
    return selectedContacts.some(selectedContact => selectedContact.name === contact.name);
}

/**
 * This function is to select or deselect a contact.
 * @param {string} i is the contact from the list of contacts. 
 * @param {string} contactName is the name of the contact
 */
function selectContact(i, contactName) {
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
        checkbox.src = "./img/addtask/checked.svg";
        selectedContacts.push(contacts[i]) - 1;
        addToAssignedList(i, contacts[i]);
    } else {
        deselectContacts(contactName, checkbox);
    }
}

/**
 * This function is to deselect a selected contact.
 * @param {string} contactName is the name of the contact
 * @param {image} checkbox is the box that shows if a contact is selected or not
 */
function deselectContacts(contactName, checkbox) {
    checkbox.src = "./img/addtask/rectangle.svg";
    let selectedContactIndex = findSelectedIndex(contactName);
    selectedContacts.splice(selectedContactIndex, 1);
    removeFromAssignedList(selectedContactIndex);
}

/**
 * This function is to delete a selected contact from the list of saved contacts.
 * @param {string} selectedContactIndex is the index of the contact that is supposed to be deleted
 */
function removeFromAssignedList(selectedContactIndex) {
    let assignedContactsList = document.getElementById('assignedContactsList');
    assignedContacts.splice(selectedContactIndex, 1);
    renderAssignedContactsList(assignedContactsList);
}
/**
 * This function is to save a selected contact to the list of saved contacts.
 * @param {string} i is the contact of the list of contacts
 * @param {string} contact is the contact that is supposed to be saved 
 */
function addToAssignedList(i, contact) {
    let assignedContactsList = document.getElementById('assignedContactsList');
    assignedContacts.push(contact);
    renderAssignedContactsList(assignedContactsList);
}

/**
 * This function is to render the liste of assigned contacts to the user interface.
 * @param {string} assignedContactsList is the list of assigned contacts 
 */
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

/**
 * This function searches the selectedContacts array to find the index of the selected contact with the specified name contactName
 * @param {string} contactName is the name that is searched in the array 
 * @returns the first element in the Array selectedContacts
 */

function findSelectedIndex(contactName) {
    return selectedContacts.findIndex(contact => contact['name'] === contactName);
}

/**
 * This function is to render the list of subtasks.
 */
function renderSubtasks() {
    let subtaskList = document.getElementById('subtaskList');
    subtaskList.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i].description;
        subtaskList.innerHTML += rendersubtasksHTML(subtask, i);
    }
}

/**
 * This function is to change from showing to editing the subtask.
 * @param {array} i is the subtask 
 */
function editSubtask(i) {
    let subtask = document.getElementById(`subtask${i}`);
    let editSubtaskField = document.getElementById(`editSubtaskField${i}`);

    subtask.classList.toggle('noDisplay');
    editSubtaskField.classList.toggle('noDisplay');
}

/**
 * This function is to save the edited subtasks. 
 * @param {string} i is the subtask 
 */
function saveEditChanges(i) {
    let newSubtaskText = document.getElementById(`editSubtaskText${i}`).value;
    subtasks[i].description = newSubtaskText;
    renderSubtasks();
}

/**
 * This function is to delete the already saved subtasks from the array.
 * @param {string} i is the subtask
 */
function deleteSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}

/**
 * This function is to set a priority for a new task.
 * @param {string} selectedPrio is the priority for the new task.
 */
function setPrio(selectedPrio) {
    event.preventDefault();
    document.getElementById('lowPrio').classList.remove('lowPrioButtonClicked');
    document.getElementById('mediumPrio').classList.remove('mediumPrioButtonClicked');
    document.getElementById('urgentPrio').classList.remove('urgentPrioButtonClicked');
    prio = selectedPrio;
    document.getElementById(`${selectedPrio}Prio`).classList.add(`${prio}PrioButtonClicked`);
}