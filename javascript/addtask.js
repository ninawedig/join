const smallMenu = document.getElementById('smallMenu');

function init(){
    renderHeader();
    renderNavbar();
    makeNavbarActive('addTask');
    makeSmallNavbarActive('addTaskSmall');
}

function showSmallMenu(){
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
        title.classList.add('inputEmpty'); // Hinzufügen der Klasse für visuelle Markierung
        return; // Beenden der Funktion, da ein Fehler vorliegt
    } else {
        messageBoxTitle.textContent = ""; // Rücksetzen der Fehlermeldung
    }

    if (!duedate.value) {
        messageBoxDuedate.textContent = "Please fill out this field.";
        duedate.classList.add('inputEmpty'); // Hinzufügen der Klasse für visuelle Markierung
        return; // Beenden der Funktion, da ein Fehler vorliegt
    } else {
        messageBoxDuedate.textContent = ""; // Rücksetzen der Fehlermeldung
    }

    if (category.value === 'x') { // Überprüfen, ob eine Kategorie ausgewählt wurde
        messageBoxCategory.textContent = "Please select a category.";
        category.classList.add('inputEmpty'); // Hinzufügen der Klasse für visuelle Markierung
        return; // Beenden der Funktion, da ein Fehler vorliegt
    } else {
        messageBoxCategory.textContent = ""; // Rücksetzen der Fehlermeldung
    }

    // Wenn alle Felder ausgefüllt sind und die Validierung erfolgreich ist, können Sie hier weitere Aktionen ausführen, z.B. das Formular absenden.
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

