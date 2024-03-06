const contactActionsOverlay = document.getElementById('contactActionsOverlay');
const editContactContainer = document.getElementById('editContactContainer');
const addContactContainer = document.getElementById('addContactContainer');
const contactPage = document.getElementById('contactPage');
const contactsFrame = document.getElementById('contactsFrame');
const addPersonIcon = document.getElementById('addPersonIcon');
const editContactIcon = document.getElementById('editContactIcon');
const contactCard = document.getElementById('contactCard');
const smallEditMenu = document.getElementById('smallEditMenu');
let contacts = [
    {
        "name": "Anton Schulz",
        "email": "wolf@gmail.de",
        "phone": "+49 2222 222 22 2"
    },
    {
        "name": "Anja Schulz",
        "email": "schulz@hotmail.com",
        "phone": "+49 1111 111 11 1"
    }
];

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
 * This function selects a contact and shows more details about it.
 * @param {*} i is the number of the contact we want to select.
 */
function selectContact(i) {
    let clickedContact = document.getElementById('contact' + i);
    clickedContact.classList.toggle('contactFieldActive');
    deselectContacts(clickedContact);


    if (window.innerWidth <= 740) { //doesnt work yet
        openContactPage();
    }

   
    showContact();
    renderContactCard(i);
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

function showContact() {
    contactCard.classList.toggle('contactCardActive');
}

function renderContactCard(i) {
    contactCard.innerHTML = `
    <div class="contactCardMainInfos">
        <div class="contactProfileBadgeBig">AM</div>
        <div class="contactNameBigContainer">
            <div class="contactNameBig">${contacts[i]['name']}</div>
            <div class="contactFunctionsContainer">
                <div class="contactFunctions" onclick="openContactEditor()"><img class="contactFunctionsIcons"
                        src="./img/contacts/edit.svg" alt="">Edit</div>
                <div class="contactFunctions"><img class="contactFunctionsIcons"
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

    newContactName.value = "";
    newContactEmail.value = "";
    newContactPhone.value = "";
    closeAddContact();

    renderContacts();
}

/**
 * This function renders the contacts to the page
 */
function renderContacts() {
    const contactsList = document.getElementById('contactsList');

    contactsList.innerHTML = ``;
    contactsList.innerHTML = ``;

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactsList.innerHTML += `
            <div onclick="selectContact(${i})" class="contactField" id="contact${i}">
                <div class="contactProfileBadge">AM</div>
                <div class="contactDetails">
                    <div class="contactName">${contacts[i]['name']}</div>
                    <div class="contactEmail">${contacts[i]['email']}</div>
                </div>
            </div>
`;
    }
}

/**
 * This function opens the contact page on full screen if the screen width is smaller/equal 740px
 */
function openContactPage() { //doesnt work yet
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'block';

    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

/**
 * This function closes the contact page on full screen if the screen width is smaller/equal 740px
 */
function closeContactPage(contactNumber) {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'none';
    contactCard.classList.toggle('contactCardActive');
    document.getElementById(contactNumber).classList.toggle('contactFieldActive');


    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

/**
 * This function opens the contact editor
 */
function openContactEditor() {
    contactActionsOverlay.classList.remove('noDisplay');
    editContactContainer.classList.remove('noDisplay');

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
function closeContactPage(contactNumber) {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'none';
    contactCard.classList.toggle('contactCardActive');
    document.getElementById(contactNumber).classList.toggle('contactFieldActive');


    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
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


function editContact(){
    let editNameInput = document.getElementById('editNameInput');
    let editEmailInput = document.getElementById('editEmailInput');
    let editPhoneInput = document.getElementById('editPhoneInput');
}