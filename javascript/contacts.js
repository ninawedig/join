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
];11

function init() {
    renderHeader();
    renderNavbar();
    makeNavbarActive('contacts');
    makeSmallNavbarActive('contactsSmall');
    showContacts();
}

function showSmallMenu() {
    const smallMenu = document.getElementById('smallMenu');
    smallMenu.classList.toggle('noDisplay');
}

function selectContact(contactNumber) {
    document.getElementById(contactNumber).classList.toggle('contactFieldActive');
    if (window.innerWidth <= 740) {
        openContactPage();
    }
    showContact();
}

function openContactPage() {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'block';

    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

function closeContactPage(contactNumber) {
    contactsFrame.classList.toggle('noDisplay');
    contactPage.style.display = 'none';
    contactCard.classList.toggle('contactCardActive');
    document.getElementById(contactNumber).classList.toggle('contactFieldActive');


    addPersonIcon.classList.toggle('noDisplay');
    editContactIcon.classList.toggle('noDisplay');
}

function showContact() {
    contactCard.classList.toggle('contactCardActive');
}

function editContact() {
    contactActionsOverlay.classList.remove('noDisplay');
    editContactContainer.classList.remove('noDisplay');

    closeSmallEditMenu();
}

function closeEditContact() {
    contactActionsOverlay.classList.add('noDisplay');
    editContactContainer.classList.add('noDisplay');
}

function openAddContact() {
    contactActionsOverlay.classList.remove('noDisplay');
    addContactContainer.classList.remove('noDisplay');
}

function closeAddContact() {
    contactActionsOverlay.classList.add('noDisplay');
    addContactContainer.classList.add('noDisplay');
}

function openSmallEditMenu() {
    document.getElementById('smallEditMenuOverlay').classList.remove('noDisplay');
    smallEditMenu.classList.add('smallEditMenuOpened');
    smallEditMenu.classList.remove('noDisplay');
}

function closeSmallEditMenu() {
    document.getElementById('smallEditMenuOverlay').classList.add('noDisplay');
    smallEditMenu.classList.remove('smallEditMenuOpened');
    smallEditMenu.classList.add('noDisplay');
}

function addContact() {
    event.preventDefault();

    let newContactName = document.getElementById('newContactName');
    let newContactEmail = document.getElementById('newContactEmail');
    let newContactPhone = document.getElementById('newContactPhone')


    let newContact = {
        "contactName": newContactName.value,
        "contactEmail": newContactEmail.value,
        "contactPhone": newContactPhone.value
    };
    contacts.push(newContact);
    console.log("your contacts are: ");
    console.log(contacts);

    newContactName.value = "";
    newContactEmail.value = "";
    newContactPhone.value = "";
}

function showContacts() {
    const contactsList = document.getElementById('contactsList');

    contactsList.innerHTML += ``;

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactsList.innerHTML += `
            <div onclick="selectContact('contact${i}')" class="contactField" id="contact${i}">
            <div class="contactProfileBadge">AM</div>
            <div class="contactDetails">
                <div class="contactName">${contacts[i]['name']}</div>
                <div class="contactEmail">${contacts[i]['email']}</div>
            </div>
        </div>
`;
    }
}