
/**
 * This function shows edit.
 * @param {int} id - index of the selected card
 */
async function showEditTask(id) {
    await showCardDetail('editTask');
    renderTaskinEdit(id);
    document.getElementById('lowerSection').innerHTML = '';
    document.getElementById('lowerSection').style = 'justify-content: right;';
    document.getElementById('lowerSection').innerHTML =/*html*/`<button class= "button okButton" onclick="saveEdit(${id})">Ok</button>`;
}

/**
 * This function renders the selected task in edit.
 * @param {int} id - index of the selected card
 */
async function renderTaskinEdit(id) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let duedate = document.getElementById('duedate');
    let task = tasks[id];
    subtasks = task['subtask'];
    assignedContacts = task['assign_to'];
    let prioBoard = task['prio'];
    let cat = task['category']

    renderSubtasksinEdit();
    renderAssignedContactsListInEdit();
    selectCategory(cat);

    task['category'] = cat;
    title.value = `${task['title']}`;
    description.value = `${task['description']}`;
    duedate.value = `${task['due_date']}`;

    toggleDropDownMenu();
    showPrioInEdit(prioBoard);
}

/**
 * This function renders the AssignContacts in edit.
 */
function renderAssignedContactsListInEdit(){
    let indexOfAssignedContact;
    for (let j = 0; j < assignedContacts.length; j++) {
        const assginedContactName = assignedContacts[j].name;
        indexOfAssignedContact = findContactIndexByName(assginedContactName);
        document.getElementById(`checkboxNo${indexOfAssignedContact}`).src = "./img/addtask/checked.svg";
        document.getElementById(`contactNo${indexOfAssignedContact}`).classList.add('contactSelected');
        selectedContacts.push(contacts[indexOfAssignedContact]) - 1;
    }
    renderAssignedContactsList(assignedContactsList);
}

/**
 * THis function renders the subtasks in edit.
 */
function renderSubtasksinEdit(){
    renderSubtasks();

    if (window.innerWidth <= 1400) {
        document.getElementById('subtaskInput').style.marginTop = '25px';
    } else {
        document.getElementById('subtaskInput').style.marginTop = '0';
    }
}

/**
 * This function shows the prio in the edit-card
 * @param {string} prioBoard - the prio of the board
 */
function showPrioInEdit(prioBoard){
    document.getElementById('lowPrio').classList.remove('lowPrioButtonClicked');
    document.getElementById('mediumPrio').classList.remove('mediumPrioButtonClicked');
    document.getElementById('urgentPrio').classList.remove('urgentPrioButtonClicked');
    document.getElementById(`${prioBoard}Prio`).classList.add(`${prioBoard}PrioButtonClicked`);

}

/**
 * This function finds the contacts.
 * @param {array} assignedContactName 
 * @returns the contacts of the array
 */
function findContactIndexByName(assignedContactName) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name === assignedContactName) {
            return i;
        }
    }
}

/**
 * This function saves the edit in the tasks array.
 * @param {int} id - index of the selected card
 */
function saveEdit(id) {
    let task = tasks[id];
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let duedate = document.getElementById('duedate');
    let category = document.getElementById('selectTaskCategory');

    task['title'] = title.value;
    task['description'] = description.value;
    task['due_date'] = duedate.value;
    task['category'] = category.innerHTML;
    task['assign_to'] = assignedContacts;
    task['subtask'] = subtasks;
    task['prio'] = prio;

    renderBoard(tasks);
    closeCardDetail();
    setItem('tasks', tasks);
}

/**
 * This funktion shows the dropzone cards.
 * @param {string} inCategory - the category in which the task is dropped
 */
function showDropZone(inCategory) {
    let cardHeight = document.getElementById(`task${currentDraggedElement}`).offsetHeight;

    let elements = document.querySelectorAll('.noTaskCard');
    elements.forEach(function (element) {
        element.classList.add('hidden');
    });
    document.getElementById(inCategory).innerHTML += /*html*/`
    <div class="dragCard" style="background-color: transparent; border-radius: 24px; height: ${cardHeight}px;    margin-top: 12px;"></div>`;
}

/**
 * This function deletes a task.
 * @param {*} task - index of the selected task.
 */
async function deleteTask(task) {
    tasks.splice(task, 1);
    await setItem('tasks', JSON.stringify(tasks));
    renderBoard(tasks);
    closeCardDetail();
}