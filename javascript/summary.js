const smallMenu = document.getElementById('smallMenu');
let toDosNumber = document.getElementById('summaryToDos');
let doneTasksNumber = document.getElementById('summaryDone');
let urgentTasksNumber = document.getElementById('summaryUrgentTasks');
let tasksInBoardNumber = document.getElementById('summaryTasksInBoard');
let tasksInProgressNumber = document.getElementById('summaryTasksInProgress');
let awaitingFeedbackNumber = document.getElementById('summaryAwaitingFeedback');
let urgentDueDateText = document.getElementById('summaryUrgentDueDate');
let summaryToDos = tasks.filter(task => task.status === 'toDo');
let summaryDone = tasks.filter(task => task.status === 'done');
let summaryUrgent = tasks.filter(task => task.prio === 'urgent');
let summaryInProgress = tasks.filter(task => task.status === 'inProgress');
let summaryAwaitingFeedback = tasks.filter(task => task.status === 'awaitFeedback');
let summaryDueDates = tasks.map(task => task.due_date)

function init() {
    renderHeader();
    renderNavbar();
    renderNumbers();
    renderDueDate();
    renderGreeting();
    renderGreetingName();
    makeNavbarActive('summary');
    makeSmallNavbarActive('summarySmall');
}

function showSmallMenu() {
    smallMenu.classList.toggle('noDisplay');
}

function renderNumbers() {
    toDosNumber.innerHTML = summaryToDos.length;
    doneTasksNumber.innerHTML = summaryDone.length;
    urgentTasksNumber.innerHTML = summaryUrgent.length;
    tasksInBoardNumber.innerHTML = tasks.length;
    tasksInProgressNumber.innerHTML = summaryInProgress.length;
    awaitingFeedbackNumber.innerHTML = summaryAwaitingFeedback.length;
}

function renderDueDate(){
    let summaryDueDatesAsDates = summaryDueDates.map(dateString => new Date(dateString));
    summaryDueDatesAsDates.sort((a, b) => a - b);
    let formattedDate = summaryDueDatesAsDates[0].toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    urgentDueDateText.innerHTML = formattedDate;
}

function renderGreetingName(){
    let greetingName = users[0]['name'];
    let greetingNameText = document.getElementById('greetingName');
    greetingNameText.innerHTML = greetingName;
}

function getGreeting(){
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let greetingMessage;
    if(currentHour >= 5 && currentHour < 12){
        greetingMessage = "Good Morning,"
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = "Hello,"
    } else {
        greetingMessage = "Good evening,"
    }
    return greetingMessage;
}

function renderGreeting(){
    let greetingMessage = getGreeting();
    let greetingMessageText = document.getElementById('greetingMessageText');
    greetingMessageText.innerHTML = greetingMessage;
}