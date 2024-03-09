const contactActionsOverlay = document.getElementById('contactActionsOverlay');
const editContactContainer = document.getElementById('editContactContainer');
const addContactContainer = document.getElementById('addContactContainer');
const contactPage = document.getElementById('contactPage');
const contactsFrame = document.getElementById('contactsFrame');
const addPersonIcon = document.getElementById('addPersonIcon');
const editContactIcon = document.getElementById('editContactIcon');
const contactCard = document.getElementById('contactCard');
const smallEditMenu = document.getElementById('smallEditMenu');
const JSON_PATH = './JSON/contacts.json';
let currentContact;
let firstLetters = [];
firstLetters.sort();

/**
 * This function is used to render HTML Text (The header, navbar, the small navbar on smaller resolution and the contacts).
 */
function init() {
    renderHeader();
    renderNavbar();
    makeNavbarActive('contacts');
    makeSmallNavbarActive('contactsSmall');
    renderContacts();
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
    let nameInitials = getInitials(contacts[i]['name']);
    contactCard.innerHTML = `
            <div class="contactCardMainInfos">
                <div class="contactProfileBadgeBig">${nameInitials}</div>
                <div class="contactNameBigContainer">
                    <div class="contactNameBig">${contacts[i]['name']}</div>
                    <div class="contactFunctionsContainer">
                        <div class="contactFunctions" onclick="openContactEditor(${i})"><img class="contactFunctionsIcons"
                                src="./img/contacts/edit.svg" alt="">Edit</div>
                        <div onclick="deleteContact(${i})" class="contactFunctions"><img class="contactFunctionsIcons"
                                src="./img/contacts/delete.svg" alt="">Delete</div>
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
 * This function opens the contact page on full screen if the screen width is smaller/equal 740px
 */
function openContactPage() { //doesnt work yet
    console.log('yes');
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
function addContact() {
    event.preventDefault();
    let newContactName = document.getElementById('newContactName');
    let newContactEmail = document.getElementById('newContactEmail');
    let newContactPhone = document.getElementById('newContactPhone')
    let newContact = {
        "name": newContactName.value,
        "email": newContactEmail.value,
        "phone": newContactPhone.value
    };
    contacts.push(newContact);
    clearValues(newContactName, newContactEmail, newContactPhone);
    closeAddContact();
    renderContacts();
}

function clearValues(input1, input2, input3) {
    input1.value = "";
    input2.value = "";
    input3.value = "";
}

/**
 * This function deletes a contact 
 */
function deleteContact(i) {
    contacts.splice(i, 1);
    hideContact();
    renderContacts();
}

function deleteContactSmallScreen(currentContact) {
    contacts.splice(currentContact, 1);
    console.log('Deleted contact number' + currentContact);
    renderContacts();
    closeContactPage();
}

/**
 * This function renders the contacts to the page
 */
function renderContacts() {
    renderLetters();

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let nameInitials = getInitials(contact['name']);
        let firstLetter = contact['name'].charAt(0);
        
        if(firstLetters.includes(firstLetter)){
            renderContactUnderCategory(firstLetter, i, nameInitials, contact);
        } else {
            createNewCategory(firstLetter);
        }
    }
}

function createNewCategory(firstLetter){
    firstLetters.push(firstLetter);
    firstLetters.sort();
    renderContacts();
}

function renderContactUnderCategory(firstLetter, i, nameInitials, contact){
    document.getElementById(`contactsList${firstLetter}`).innerHTML += `
                    <div onclick="selectContact(${i})" class="contactField" id="contact${i}">
                        <div class="contactProfileBadge">${nameInitials}</div>
                        <div class="contactDetails">
                            <div class="contactName">${contact['name']}</div>
                            <div class="contactEmail">${contact['email']}</div>
                        </div>
                    </div>       
                `;
}

function renderLetters() {
    const contactsAgenda = document.getElementById('contactsAgenda');
    contactsAgenda.innerHTML = '';
    for (let i = 0; i < firstLetters.length; i++) {
        const firstLetter = firstLetters[i];
        contactsAgenda.innerHTML += `
        <div class="contactLetter">${firstLetter}</div>
            <div class="contactsSeparationLine"></div>
            <div class="contactsGroup" id="contactsList${firstLetter}">
                    <!-- RENDER JS-->
            </div>
        `;
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
 * @param {*} i 
 */
function renderContactEditor(i) {
    let editContactForm = document.getElementById('editContactForm');
    let nameInitials = getInitials(contacts[i]['name']);

    editContactForm.innerHTML = `
            <div class="contactProfileBadgeBig editContactProfileBadge contactActionProfileBadgeBig">${nameInitials}</div>
                <form class="contactActionForm">
                    <div class="closeIconContainer" onclick="closeContactEditor()"><img class="closeIcon"
                        src="./img/contacts/close.svg" alt=""></div>
                    <input id="editNameInput" class="contactActionInput" type="text" value="${contacts[i]['name']}">
                    <input id="editEmailInput" class="contactActionInput" type="email" value="${contacts[i]['email']}">
                    <input id="editPhoneInput" class="contactActionInput" type="tel" value="${contacts[i]['phone']}">
                    <div class="formButtonsContainer">
                        <button onclick="deleteContact(${i})" class="formButton deleteButton">Delete</button>
                        <button class="formButton saveButton" onclick="editContact()">Save <img src="./img/contacts/check.svg" alt=""></button>
                    </div>
                </form>
    `;
}

/**
 * This function edits the contact.
 */
function editContact() {
    event.preventDefault();
    let editNameInput = document.getElementById('editNameInput');
    let editEmailInput = document.getElementById('editEmailInput');
    let editPhoneInput = document.getElementById('editPhoneInput');

    contacts[currentContact]['name'] = editNameInput.value;
    contacts[currentContact]['email'] = editEmailInput.value;
    contacts[currentContact]['phone'] = editPhoneInput.value;
    console.log(contacts);
    renderContacts();
    renderContactCard(currentContact);
    closeContactEditor();
}

function getInitials(name) {
    return name.match(/(\b\S)?/g).join("").slice(0, 2);;
}