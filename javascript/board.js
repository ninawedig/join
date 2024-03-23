let currentDraggedElement;
let alreadyExecuted = false;
let tasks = [];
let allStatus = ['toDo', 'inProgress', 'awaitFeedback', 'done'];

/**
 * The function load all of the important functions onload.
 */
async function initBoard() {
    await loadUsers();
    await loadtasks();
    renderHeader();
    renderNavbar();
    makeNavbarActive('board');
    makeSmallNavbarActive('boardSmall');
    renderBoard(tasks);
}

/**
 * This function render the task in the board in the right category.
 */
async function loadtasks() {
    myTasks = await getItem('tasks')
        .then(response => JSON.parse(response));
    tasks = myTasks;
}

/**
 * This function renders the board
 * @param {array} array - the array that has to render in the board.
 */
function renderBoard(array) {
    allStatus.forEach(status => {
        let filterTask = array.filter(t => t['status'] == status);
        let statusElement = document.getElementById(status);
        statusElement.innerHTML = '';
        if (filterTask.length === 0) {
            statusElement.innerHTML = `<div class="noTaskCard">No tasks ${status}</div>`;
        } else {
            filterTask.forEach((task) => {
                let id = tasks.indexOf(task);
                let category = getCategory(task['category']);
                let categoryClass = getCategoryClass(category);
                statusElement.innerHTML += generateCardHTML(task, category, id, categoryClass);
                renderPrio(task, id);
                renderTaskMember(task, id);
                renderSubtaskBar(task, id);
            });
        }
    });
}

/**
 * This funtion returns the choosen category.
 * @param {*} category - the name of the category
 * @returns the category
 */
function getCategory(category) {
    return category === 'User Story' ? 'User Story' : 'Technical Task';
}

/**
 * This function changes the name of the category.
 * @param {string} category - the name of the category
 * @returns the new category-string
 */
function getCategoryClass(category) {
    let categoryClass = category.replace(/\s/g, '');
    return categoryClass.charAt(0).toLowerCase() + categoryClass.slice(1);
}

/**
 * This function render the HTML of the card in the board.
 * @param {string} element - the string for the array of tasks per category
 * @returns the HTML of the cards.
 */
function generateCardHTML(element, category, id, categoryClass) {
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${id})" class="taskCard" onclick="showCardDetail(${id})" id="task${id}">
        <div class="taskCategory ${categoryClass}">${category}</div>
        <div class="taskInfo">
            <div class="taskTitle">${element['title']}</div>
            <div class="taskDescription">${element['description']}</div>
        </div>
        <div class="taskSubtasks" id="taskSubtasks${id}">
            <div class="progressBar" id="progressBar">
                <div class="progress" id="progressBar${id}"></div>
            </div>
            <div class="progressInfo" id="progressInfo${id}"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="taskMembers" id="taskMemberCard${id}"></div>
            <div id="tasksPrio${id}"> 
                
                </div>
        </div>
    </div>`;
}

/**
 * This function shows the cardDetail.
 * @param {string} taskId - why the cardDetail has to show up.
 */
async function showCardDetail(taskId) {
    if (taskId == 'addTask' || taskId == 'editTask') {
        await renderAddTask();
        if (taskId == 'editTask') {
            document.getElementById('cardDetailHeaderH1').style.display = 'none';
            document.getElementById('cardDetailHeader').style.justifyContent = 'right';
        }
        await Promise.all([loadContacts(), loadUsers(), loadTasks()]);
        renderContacts();
        renderHeader();
    } else if (taskId >= 0) {
        renderCardDetail(taskId);
    }
    document.getElementById('cardContainer').style.display = 'flex';
    document.getElementById('cardContainerBackground').style.display = 'flex';
    document.getElementById('cardDetail').style.display = 'flex';
}

/**
 * This function shows edit.
 * @param {int} id - index of the selected card
 */
async function showEditTask(id) {
    await showCardDetail('editTask');
    renderTaskinEdit(id);
    document.getElementById('lowerSection').innerHTML = '';
    document.getElementById('lowerSection').style = 'justify-content: right;';
    document.getElementById('lowerSection').innerHTML =/*html*/`<button class= "button" onclick="saveEdit(${id})">Ok</button>`;
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
 * This function closes the detailcard of a task.
 */
function closeCardDetail() {
    document.getElementById('cardContainer').style = "display: none";
    document.getElementById('cardContainerBackground').style = "display: none";
    document.getElementById('cardDetail').style = "display: none";
}

/**
 * This function renders addtask
 */
async function renderAddTask() {
    const externalHtmlFile = 'addtask.html';
    const response = await fetch(externalHtmlFile);
    const htmlContent = await response.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const desiredDiv = tempDiv.querySelector('#addTaskMain');

    document.getElementById('cardDetail').innerHTML = renderCardDetailHeaderHTML();
    document.getElementById('cardDetail').innerHTML += desiredDiv.outerHTML;
}

/**
 * This function renders the CardDetailHeaderHTML-
 * @returns html
 */
function renderCardDetailHeaderHTML(){
    return /*html */`
    <div id="cardDetailHeader">
            <h1 id="cardDetailHeaderH1">Add task</h1>
            <div class="closeIconContainer" onclick="closeCardDetail()">
                <img class="closeIcon" src="./img/contacts/close.svg" alt="">
            </div>                    
    </div>`;
}

/**
 * This function renders the cardDetail.
 * @param {int} id - index of the selected card
 */
function renderCardDetail(id) {
    const task = tasks[id];
    let category = task['category'];
    const categoryClass = category.replace(/\s/g, '').toLowerCase();

    document.getElementById('cardDetail').innerHTML = generateCardDetailHTML(task, category, categoryClass, id);

    renderPrio(task, id);
    renderSubtasksBoard(task, id);
    renderTaskMember(task, id);
}


/**
 * This functoin returns the HTML of the detailcard
 * @param {Array} task - the array and id of the choosen detailcard
 * @returns returns the HTML of the detailcard
 */
function generateCardDetailHTML(task, category, categoryClass, id) {
    return /*html*/`
        <div id="cardDetailHeader">
            <div class="taskCategory ${categoryClass}">${category}</div>
            <div class="closeIconContainer" onclick="closeCardDetail()">
                <img class="closeIcon" src="./img/contacts/close.svg" alt="">
            </div>                    
        </div>
        <div class="taskInfoDetail">
            <div class="taskTitleDetail">${task['title']}</div>
            <p class="taskDescriptionDetail">${task['description']}</p>
            <table>
                <tr>
                    <th>Due date:</th>
                    <td><p>${task['due_date']}</p></td>
                </tr>
                <tr>
                    <th>Priority:</th>
                    <td id="taskPrio" style="display: flex; align-items: center; gap: 8px">
                    </td>
                </tr>                                            
            </table>
            <table><th>Assign to:</th></table>
            <ul id="taskMemberDetail"></ul>
            <table><th>Subtasks</th></table>
            <ul id="taskSubtasks"></ul>
        </div>
        <div class="taskFunctionsContainer">
            <div class="taskFunctions" onclick="showEditTask(${id})"><img class="taskFunctionsIcons"
                    src="./img/contacts/edit.svg" alt="">Edit</div>
            <div class="taskFunctions" onclick="deleteTask(${id})" style="border-left: solid 1px #D1D1D1; padding-left: 16px;"><img class="taskFunctionsIcons"
                    src="./img/contacts/delete.svg" alt="">Delete</div>
        </div>`;
}

/**
 * This function renders the subtask in the board.
 * @param {array} task -array of the selected task
 * @param {int} id - index of the selected card
 */
function renderSubtasksBoard(task, id) {
    let subtasksBoard = task['subtask'];

    document.getElementById('taskSubtasks').innerHTML = '';
    for (let i = 0; i < subtasksBoard.length; i++) {
        const element = subtasksBoard[i];
        if (element['status'] == 'done') {
            document.getElementById('taskSubtasks').innerHTML += renderSubtaskToDoSvg(i, element, id);
        } else {
            document.getElementById('taskSubtasks').innerHTML += renderSubtaskDoneSvg(i, element, id);
        }
    }
}

/**
 * This function renders the subtaskbar in the boardcards.
 * @param {array} task -array of the selected task
 * @param {int} id - index of the selected card
 */
function renderSubtaskBar(task, id) {
    let subtaskToDo = 0;
    let totalSubtasks = 0;

    if (task['subtask']) {
        let subtaskArray = task['subtask'];
        subtaskToDo = subtaskArray.filter(t => t['status'] == 'done').length;
        totalSubtasks = subtaskArray.length;
    }
    const barProgress = totalSubtasks > 0 ? (subtaskToDo / totalSubtasks) * 100 : 0;
    const progressBarStyle = totalSubtasks === 0 ? "display: none;" : "";
    document.getElementById(`taskSubtasks${id}`).style = progressBarStyle;
    document.getElementById(`progressBar${id}`).style.width = `${barProgress}%`;
    document.getElementById(`progressInfo${id}`).innerHTML = `${subtaskToDo}/${totalSubtasks} Subtasks`;
}

/**
 * This function renders the html of the subtask svg.
 * @param {int} i - index of the selected subtask
 * @param {array} element - array of the selected task
 * @param {int} takenTask - index of the selected task
 * @returns the HTML of the svg
 */
function renderSubtaskToDoSvg(i, element, takenTask) {
    return /*html*/`
    <li id="subtask${i}">
        <div onclick="changeSubtaskStatus(${i}, ${takenTask})">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6821 8.39673V14.3967C17.6821 16.0536 16.339 17.3967 14.6821 17.3967H4.68213C3.02527 17.3967 1.68213 16.0536 1.68213 14.3967V4.39673C1.68213 2.73987 3.02527 1.39673 4.68213 1.39673H12.6821" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
            <path d="M5.68213 9.39673L9.68213 13.3967L17.6821 1.89673" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>                        
        <p>${element['description']}</p>    
    </li>`;
}

/**
 * This function renders the html of the subtask svg.
 * @param {int} i - index of the selected subtask
 * @param {array} element - array of the selected task
 * @param {int} takenTask - index of the selected task
 * @returns the HTML of the svg
 */
function renderSubtaskDoneSvg(i, element, takenTask) {
    return  /*html*/`
    <li id="subtask${i}">
        <div onclick="changeSubtaskStatus(${i}, ${takenTask})">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.68213" y="1.39673" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
        </div>                        
        <p>${element['description']}</p>    
    </li>`;
}

/**
 * This funktion changes the subtask status.
 * @param {int} i - index of the selected subtask
 * @param {int} takenTask - index of the selected task
 */
function changeSubtaskStatus(i, takenTask) {
    let task = tasks[takenTask];
    let element = task['subtask'][i];

    if (element['status'] == 'done') {
        element['status'] = 'toDo';
    } else {
        element['status'] = 'done'
    }

    setItem('tasks', tasks);
    renderSubtasksBoard(task, takenTask);
    renderBoard(tasks);
}

/**
 * This function renders the task Member.
 * @param {array} task -array of the selected task
 * @param {int} id - index of the selected card
 */
function renderTaskMember(task, id) {
    const members = task['assign_to'];
    const taskMemberDetail = document.getElementById('taskMemberDetail');
    const taskMemberCard = document.getElementById(`taskMemberCard${id}`);
    let zIndex = 1;

    if (taskMemberDetail !== null) { taskMemberDetail.innerHTML = ''; }
    taskMemberCard.innerHTML = '';

    members.forEach((member, index) => {
        if (taskMemberDetail) {
            taskMemberDetail.innerHTML += `<li><div class="taskMember" style="background-color: ${member['badgeColor']}">${member['initials']}</div><p>${member['name']}</p></li>`;
        }
        const marginLeft = index !== 0 ? 'margin-left: -10%;' : '';
        taskMemberCard.innerHTML += `<div class="taskMember" style="z-index: ${zIndex++}; ${marginLeft} background-color: ${member['badgeColor']}">${member['initials']}</div>`;
    });
}

/**
 * This function renders the prio and the prio-svg to the board and the detailcard
 * @param {Array} task - the task in the array
 * @param {int} index - the id of the task
 */
function renderPrio(task, id) {
    const prio = task['prio'];
    let prioHTML = '';

    if (prio === 'urgent') {
        prioHTML = renderUrgentHTML();
    } else if (prio === 'medium') {
        prioHTML = renderMediumHTML();
    } else if (prio === 'low') {
        prioHTML = renderLowHTML();
    }
    const taskPrioElement = document.getElementById('taskPrio');
    if (taskPrioElement) {
        taskPrioElement.innerHTML = `<p>${prio}</p>${prioHTML}`;
    }
    document.getElementById(`tasksPrio${id}`).innerHTML = prioHTML;
}

/**
 * This function renders the the HTML of urgent SVG
 * @returns the HTML of urgent SVG
 */
function renderUrgentHTML() {
    return /*html*/`
    <div style="display: flex; align-items: center;">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_149397_2254)">
        <path d="M8.50014 4.75476C8.69957 4.75443 8.89385 4.81633 9.05439 4.93137L16.6229 10.3653C16.7214 10.4361 16.8045 10.525 16.8677 10.627C16.9308 10.7291 16.9726 10.8422 16.9908 10.9599C17.0275 11.1977 16.9655 11.4399 16.8185 11.6333C16.6715 11.8266 16.4515 11.9553 16.207 11.9909C15.9624 12.0266 15.7133 11.9664 15.5144 11.8234L8.50014 6.7925L1.48589 11.8234C1.38742 11.8942 1.27557 11.9454 1.15674 11.9742C1.03791 12.0029 0.914423 12.0086 0.793326 11.9909C0.672226 11.9733 0.555893 11.9326 0.450966 11.8712C0.346037 11.8099 0.254568 11.729 0.181784 11.6333C0.109 11.5375 0.0563226 11.4288 0.0267625 11.3132C-0.00279753 11.1977 -0.00866262 11.0776 0.00950107 10.9599C0.0276667 10.8422 0.0695043 10.7291 0.13263 10.627C0.195754 10.525 0.278927 10.4361 0.377402 10.3653L7.94589 4.93137C8.10643 4.81633 8.30071 4.75443 8.50014 4.75476Z" fill="#FF0000"/>
        <path d="M8.49996 -0.000121266C8.69939 -0.000455511 8.89366 0.0614475 9.0542 0.176482L16.6227 5.61045C16.8216 5.75336 16.9539 5.96724 16.9906 6.20502C17.0273 6.4428 16.9653 6.68501 16.8183 6.87837C16.6713 7.07173 16.4513 7.20039 16.2068 7.23606C15.9622 7.27173 15.7131 7.21147 15.5142 7.06856L8.49996 2.03761L1.48571 7.06856C1.28683 7.21147 1.03771 7.27173 0.793142 7.23606C0.548573 7.20039 0.328596 7.07173 0.181601 6.87837C0.0346055 6.68501 -0.0273661 6.4428 0.00931796 6.20502C0.0460039 5.96723 0.178341 5.75336 0.377219 5.61044L7.94571 0.176482C8.10625 0.0614474 8.30053 -0.000455546 8.49996 -0.000121266Z" fill="#FF0000"/>
        </g>
        <defs>
        <clipPath id="clip0_149397_2254">
        <rect width="17" height="12" fill="white" transform="translate(17 12) rotate(-180)"/>
        </clipPath>
        </defs>
        </svg>
    </div>`;
}

/**
 *  This function renders the the HTML of medium SVG
 * @returns the HTML of medium SVG
 */
function renderMediumHTML() {
    return  /*html*/`
    <div style="display: flex; align-items: center;">
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_146349_2583)">
                <path d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z" fill="#FFA800"/>
                <path d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z" fill="#FFA800"/>
            </g>
            <defs>
                <clipPath id="clip0_146349_2583">
                    <rect width="17" height="6.33333" fill="white" transform="translate(0.5 0.833252)"/>
                </clipPath>
            </defs>
        </svg>
    </div>`;
}

/**
 *  This function renders the the HTML of low SVG
 * @returns the HTML of low SVG
 */
function renderLowHTML() {
    return /*html*/`
    <div style="display: flex; align-items: center;">
        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2485 9.50614C10.0139 9.50654 9.7854 9.4317 9.59655 9.29262L0.693448 2.72288C0.57761 2.63733 0.47977 2.52981 0.405515 2.40647C0.33126 2.28313 0.282043 2.14638 0.260675 2.00404C0.217521 1.71655 0.290421 1.42372 0.463337 1.18994C0.636253 0.956173 0.895022 0.800615 1.18272 0.757493C1.47041 0.71437 1.76347 0.787216 1.99741 0.960004L10.2485 7.04248L18.4997 0.960004C18.6155 0.874448 18.7471 0.812529 18.8869 0.777782C19.0266 0.743035 19.1719 0.736141 19.3144 0.757493C19.4568 0.778844 19.5937 0.828025 19.7171 0.902225C19.8405 0.976425 19.9481 1.07419 20.0337 1.18994C20.1194 1.3057 20.1813 1.43717 20.2161 1.57685C20.2509 1.71653 20.2578 1.86169 20.2364 2.00404C20.215 2.14638 20.1658 2.28313 20.0916 2.40647C20.0173 2.52981 19.9195 2.63733 19.8036 2.72288L10.9005 9.29262C10.7117 9.4317 10.4831 9.50654 10.2485 9.50614Z" fill="#7AE229"/>
            <path d="M10.2485 15.2547C10.0139 15.2551 9.7854 15.1802 9.59655 15.0412L0.693448 8.47142C0.459502 8.29863 0.30383 8.04005 0.260675 7.75257C0.217521 7.46509 0.290421 7.17225 0.463337 6.93848C0.636253 6.70471 0.895021 6.54915 1.18272 6.50603C1.47041 6.46291 1.76347 6.53575 1.99741 6.70854L10.2485 12.791L18.4997 6.70854C18.7336 6.53575 19.0267 6.46291 19.3144 6.50603C19.602 6.54915 19.8608 6.70471 20.0337 6.93848C20.2066 7.17225 20.2795 7.46509 20.2364 7.75257C20.1932 8.04005 20.0376 8.29863 19.8036 8.47142L10.9005 15.0412C10.7117 15.1802 10.4831 15.2551 10.2485 15.2547Z" fill="#7AE229"/>
        </svg>
    </div>`;
}


/**
 * This funktion starts the dragging.
 * @param {*} id - index of the selected card.
 */
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(`task${id}`).style = "transform: rotate(5deg);";
}
/**
 * This funktion allows the drop
 * @param {*} ev - not really clear
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function used to show where the task goes to
 * @param {string} status - the status category to which the selected task is transferred
 */
function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    alreadyExecuted = false;
    renderBoard(tasks);
    setItem('tasks', tasks);
}

/**
 * This funktion used to show where the task comes from.
 * @param {string} fromCategory - the category in which the task is dropped
 * @returns the array, where the dropzone cards have to show up.
 */
function moveFrom(fromCategory) {
    if (alreadyExecuted) return;

    const categories = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    const allowedCategories = categories.filter(category => category !== fromCategory);

    allowedCategories.forEach(category => showDropZone(category));
    alreadyExecuted = true;
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
 * This funktion finds a task in the board.
 */
function findTaskFunction() {
    let search = document.getElementById('findTask').value.toLowerCase();
    let searchArray = [];

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (element['title'].toLowerCase().includes(search) || element['description'].toLowerCase().includes(search)) {
            searchArray.push(element);
        }
    }
    event.preventDefault();
    renderBoard(searchArray);
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

