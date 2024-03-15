const smallMenu = document.getElementById('smallMenu');
let contacts = [];
let selectedContacts = [];

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
    let category = document.getElementById('dropDownCategory');
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

    if (category.value === 'x') {
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
    let search = document.getElementById('searchContact').value;
    search = search.toLowerCase();

    let contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let randomColor = getRandomColor();
        if (contact['name'].toLowerCase().includes(search)) {
            contactsList.innerHTML += getContactsListHTML(contact, randomColor, i);
        }
    }
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

function selectContact(i, contactName){
    let contact = document.getElementById(`contactNo${i}`);
    let checkbox = document.getElementById(`checkboxNo${i}`);
    
    contact.classList.toggle('contactSelected');
    let isSelected = contact.classList.contains('contactSelected');


    if(isSelected){
        checkbox.src = "./../img/addtask/checked.svg";
        let selectedIndex = selectedContacts.push(contacts[i]) - 1;
    } else {
        checkbox.src = "./../img/addtask/rectangle.svg";
        findSelectedIndex(contactName);
        console.log(contactName);
    }
    console.log(selectedContacts);
}

function findSelectedIndex(contactName){
    return selectedContacts.findIndex(contact => contact['name'] === contactName);
}

function selectCategory(){

}