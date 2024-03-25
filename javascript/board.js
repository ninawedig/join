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