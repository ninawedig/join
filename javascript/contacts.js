const contactActionsOverlay = document.getElementById('contactActionsOverlay');
const editContactContainer = document.getElementById('editContactContainer');
const addContactContainer = document.getElementById('addContactContainer');
const contactPage = document.getElementById('contactPage');
const contactsFrame = document.getElementById('contactsFrame');
const addPersonIcon = document.getElementById('addPersonIcon');
const editContactIcon = document.getElementById('editContactIcon');
const contactCard = document.getElementById('contactCard');
const smallEditMenu = document.getElementById('smallEditMenu');
let currentContact;
let firstLetters = [];
let contacts = [];
firstLetters.sort();

/**
 * This function is used to render HTML Text (The header, navbar, the small navbar on smaller resolution and the contacts).
 */
async function init() {
    renderNavbar();
    await loadContacts();
    await loadUsers();
    await loadtasks();
    makeNavbarActive('contacts');
    makeSmallNavbarActive('contactsSmall');
    renderContactAgenda();
    renderHeader();
}

/**
 * This function is used to load the contacts from the remote storage.
 */
async function loadContacts() {
    firstLetters = await getItem('firstLetters')
        .then(response => JSON.parse(response));
    contacts = await getItem('contacts')
        .then(response => JSON.parse(response));
}

/**
 * This function is used to show or hide the small menu underneath the header.
 */
function showSmallMenu() {
    const smallMenu = document.getElementById('smallMenu');
    smallMenu.classList.toggle('noDisplay');
}

/**
 * This function checks if a contact is clicked.
 * @returns wheter it's active or not. True/false.
 */
function checkIfActive() {
    let contactFields = document.querySelectorAll('.contactField');
    let isActive = false;
    contactFields.forEach(element => {
        if (element.classList.contains('contactFieldActive')) {
            isActive = true;
        }
    })
    return isActive;
}

/**
 * This function selects a contact and shows more details about it.
 * @param {*} i is the number of the contact we want to select.
 */
function selectContact(i) {
    let clickedContact = document.getElementById('contact' + i);
    currentContact = i;
    clickedContact.classList.toggle('contactFieldActive');
    deselectContacts(clickedContact);
    if (window.innerWidth <= 740) {
        openContactPage();
        updateContact(i);
    }
    renderContactCard(i);
    let isActive = checkIfActive();
    if (isActive) {
        showContact();
    } else {
        hideContact();
    }
}

/**
 * This function updates the contact that is shown on small screens when opened.
 * @param {*} i 
 */
function updateContact(i) {
    currentContact = i;
}

/**
 * This function removes the background color of the not selected contacts.
 * @param {*} clickedContact is the selected contact
 */
function deselectContacts(clickedContact) {
    let contactFields = document.querySelectorAll('.contactField');
    for (let j = 0; j < contactFields.length; j++) {
        if (contactFields[j] !== clickedContact) {
            contactFields[j].classList.remove('contactFieldActive');
        }
    }
}

/**
 * This function shows a contact on the right side of the screen.
 */
function showContact() {
    contactCard.classList.add('contactCardActive');
}

/**
 * This function hides a contact from the right side of the screen.
 */
function hideContact() {
    contactCard.classList.remove('contactCardActive');
}

/**
 * This function renders the contact.
 * @param {*} i is the number of the card in the JSON.
 */
function renderContactCard(i) {
    let nameInitials = contacts[i].initials;
    let firstLetter = contacts[i]['name'].charAt(0);
    let badgeColor = contacts[i].badgeColor;
    contactCard.innerHTML = generateContactCardHTML(nameInitials, i, badgeColor, firstLetter);
}

function getRandomColor(){
    const badgeColors = ["#9327FF", "#FF7A00", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1"];
    const randomColor = badgeColors[Math.floor(Math.random() * badgeColors.length)];
    return randomColor;
}

/**
 * This function opens the contact page on full screen if the screen width is smaller/equal 740px
 */
function openContactPage() {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'block';
    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

/**
 * This function closes the contact page on full screen if the screen width is smaller/equal 740px
 */
function closeContactPage() {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'none';
    contactCard.classList.toggle('contactCardActive');
    let contactFields = document.querySelectorAll('.contactField');
    contactFields.forEach(contactField => {
        contactField.classList.remove('contactFieldActive')
    });
    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

/**
 * This function adds a new contact to the array and then renders
 */
async function addContact() {
    event.preventDefault();
    let newContactName = document.getElementById('newContactName');
    let newContactEmail = document.getElementById('newContactEmail');
    let newContactPhone = document.getElementById('newContactPhone');
    let newContactInitials = getInitials(newContactName.value);
    let newBadgeColor = getRandomColor()
    let newContact = {
        "name": newContactName.value.charAt(0).toUpperCase() + newContactName.value.slice(1),
        "email": newContactEmail.value,
        "phone": newContactPhone.value,
        "initials": newContactInitials,
        "badgeColor": newBadgeColor
    };
    contacts.push(newContact);
    contacts.sort();
    await setItem('contacts', JSON.stringify(contacts));
    await setItem('firstLetters', JSON.stringify(firstLetters));
    clearValues(newContactName, newContactEmail, newContactPhone);
    closeAddContact();
    renderContacts();
}

/**
 * This function clears the inputs after adding a contact.
 * @param {*} input1 is the name
 * @param {*} input2 is the email
 * @param {*} input3 is the phone
 */
function clearValues(input1, input2, input3) {
    input1.value = "";
    input2.value = "";
    input3.value = "";
}

/**
 * This function deletes a contact. 
 */
async function deleteContact(i) {
    let firstLetter = contacts[i]['name'].charAt(0);
    deleteAssignedContact(i);
    await setItem('tasks', JSON.stringify(tasks));
    contacts.splice(i, 1);
    await setItem('contacts', JSON.stringify(contacts));
    hideContact();
    renderContacts();
    checkIfCategoryExists(firstLetter);
    await setItem('firstLetters', JSON.stringify(firstLetters));
    closeContactEditor();
}

/**
 * This function checks to see if there are any contacts starting with a letter left after deleting a contact. If not, the category will be deleted.
 * @param {*} firstLetter 
 */
function checkIfCategoryExists(firstLetter) {
    let hasContacts = document.getElementById(`contactsList${firstLetter}`).querySelector("div");
    if (hasContacts === null) {
        let letterToRemove = `${firstLetter}`;
        let indexOfLetter = firstLetters.indexOf(letterToRemove);
        firstLetters.splice(indexOfLetter, 1);
        renderContacts();
    }
}

/**
 * This function delets a contact on a small screen.
 * @param {} currentContact 
 */
async function deleteContactSmallScreen(currentContact) {
    let firstLetter = contacts[currentContact]['name'].charAt(0);
    deleteAssignedContact(currentContact);
    await setItem('tasks', JSON.stringify(tasks));
    contacts.splice(currentContact, 1);
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    closeContactPage();
    checkIfCategoryExists(firstLetter);
    await setItem('firstLetters', JSON.stringify(firstLetters));
}

/**
 * This function renders the contacts to the page.
 */
function renderContacts() {
    renderLetters();
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstLetter = contact['name'].charAt(0);
        if (firstLetters.includes(firstLetter)) {
            let nameInitials = contacts[i].initials;
            let badgeColor = contacts[i].badgeColor;
            renderContactUnderCategory(firstLetter, i, nameInitials, contact, badgeColor);
        } else {
            createNewCategory(firstLetter);
        }
    }
}

/**
 * This function creates a new category with a new letter.
 */
function createNewCategory(firstLetter) {
    firstLetters.push(firstLetter);
    firstLetters.sort();
    renderContacts();
}

/**
 * This function renders the categories and the contacts.
 */
function renderContactAgenda() {
    renderLetters();
    renderContacts();
}

/**
 * This function renders the categories.
 */
function renderLetters() {
    const contactsAgenda = document.getElementById('contactsAgenda');
    contactsAgenda.innerHTML = '';
    for (let i = 0; i < firstLetters.length; i++) {
        const firstLetter = firstLetters[i];
        contactsAgenda.innerHTML += generateLettersCategoriesHTML(firstLetter);
    }
}

/**
 * This function opens the form to add a new contact
 */
function openAddContact() {
    contactActionsOverlay.classList.remove('noDisplay');
    addContactContainer.classList.remove('noDisplay');
}

/**
 * This function closes the form to add a new contact
 */
function closeAddContact() {
    contactActionsOverlay.classList.add('noDisplay');
    addContactContainer.classList.add('noDisplay');
}

/**
 * On small screens, this function opens a menu with the options edit/delete contact
 */
function openSmallEditMenu() {
    document.getElementById('smallEditMenuOverlay').classList.remove('noDisplay');
    smallEditMenu.classList.add('smallEditMenuOpened');
    smallEditMenu.classList.remove('noDisplay');
}

/**
 * On small screens, this function closes a menu with the options edit/delete contact
 */
function closeSmallEditMenu() {
    document.getElementById('smallEditMenuOverlay').classList.add('noDisplay');
    smallEditMenu.classList.remove('smallEditMenuOpened');
    smallEditMenu.classList.add('noDisplay');
}

/**
 * This function opens the contact editor
 */
function openContactEditor() {
    contactActionsOverlay.classList.remove('noDisplay');
    editContactContainer.classList.remove('noDisplay');
    renderContactEditor(currentContact);
    closeSmallEditMenu();
}

/**
 * This function closes the contact editor
 */
function closeContactEditor() {
    contactActionsOverlay.classList.add('noDisplay');
    editContactContainer.classList.add('noDisplay');
}

/**
 * This function renders the form to edit the contacts
 * @param {*} i is the index of the contact to be edited.
 */
function renderContactEditor(i) {
    let editContactForm = document.getElementById('editContactForm');
    let nameInitials = contacts[i].initials;
    editContactForm.innerHTML = generateContactFormHTML(nameInitials, i);
}

/**
 * This function edits the contact.
 */
async function editContact() {
    event.preventDefault();
    let editNameInput = document.getElementById('editNameInput');
    let editEmailInput = document.getElementById('editEmailInput');
    let editPhoneInput = document.getElementById('editPhoneInput');
    contacts[currentContact]['name'] = editNameInput.value;
    contacts[currentContact]['email'] = editEmailInput.value;
    contacts[currentContact]['phone'] = editPhoneInput.value;
    contacts[currentContact]['initials'] = getInitials(contacts[currentContact]['name']);
    await setItem('contacts', JSON.stringify(contacts));
    await setItem('firstLetters', JSON.stringify(firstLetters));
    renderContacts();
    renderContactCard(currentContact);
    closeContactEditor();
}

/**
 * This function gets the initials of a name.
 * @param {*} name is the name we want the initials of
 * @returns the initials.
 */
function getInitials(name) {
    return name.match(/(\b\S)?/g).join("").slice(0, 2);;
}

/**
 * This function checks whether a contact is assigned to a task and deletes it from all the assigned tasks.
 * @param {*} i is the contact to be deleted. 
 */
function deleteAssignedContact(i){
    let contactName = contacts[i]['name'];
    for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];
        for (let k = 0; k < task.assign_to.length; k++) {
            const assignedContact = task.assign_to[k].name;
            if(assignedContact === contactName){
                task.assign_to.splice(k, 1);
        }
        }
    }
}