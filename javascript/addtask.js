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

