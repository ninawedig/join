const smallMenu = document.getElementById('smallMenu');
let contacts = [];

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
        return;
    } else {
        messageBoxTitle.textContent = "";
    }

    if (!duedate.value) {
        messageBoxDuedate.textContent = "Please fill out this field.";
        duedate.classList.add('inputEmpty');
        return;
    } else {
        messageBoxDuedate.textContent = "";
    }

    if (category.value === 'x') {
        messageBoxCategory.textContent = "Please select a category.";
        category.classList.add('inputEmpty');
        return;
    } else {
        messageBoxCategory.textContent = "";
    }


}

function resetOutline(id) {
    document.getElementById(id).classList.remove('inputEmpty');
}


function clearFields() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('duedate').value = "";
    document.getElementById('category').value = "";
    document.getElementById('contacts').value = "";
    document.getElementById('subtasks').value = "";
}

function toggleDropDownMenu() {
    const arrow = document.getElementById('categoryDropDownArrow');
    const dropDown = document.getElementById('dropDownCategory');

    arrow.classList.toggle('rotated');
    dropDown.classList.toggle('noDisplay');
}

async function loadContacts() {
    firstLetters = await getItem('firstLetters')
        .then(response => JSON.parse(response.data.value));
    console.log('the first letters are', firstLetters);
    contacts = await getItem('contacts')
        .then(response => JSON.parse(response.data.value));
    console.log('the contacts are', contacts);
}

function renderContacts() {
    let contactsList = document.getElementById('contactsList');
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactsList.innerHTML += `
                                <div class="dropDownContact">
                                    <div class="contactDetails">
                                        <div class="contactProfileBadge">SM</div>
                                        <div class="contactName">${contact.name}</div>
                                    </div>
                                    <img src="./img/addtask/rectangle.svg" class="checkbox">
                                </div>
                                
    `;
    }
}

function openContactsDropDown(){
    const dropDownMenu = document.getElementById('contactsDropDownMenuContainer');
    dropDownMenu.classList.remove('noDisplay');
}

function closeContactsDropDown(){
    const dropDownMenu = document.getElementById('contactsDropDownMenuContainer');
    dropDownMenu.classList.add('noDisplay');
}