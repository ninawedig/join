const smallMenu = document.getElementById('smallMenu');
let toDosNumber = document.getElementById('summaryToDos');
let doneTasksNumber = document.getElementById('summaryDone');
let urgentTasksNumber = document.getElementById('summaryUrgentTasks');
let tasksInBoardNumber = document.getElementById('summaryTasksInBoard');
let tasksInProgressNumber = document.getElementById('summaryTasksInProgress');
let awaitingFeedbackNumber = document.getElementById('summaryAwaitingFeedback');
let urgentDueDateText = document.getElementById('summaryUrgentDueDate');
let screenWidth = window.innerWidth;

/**
 * This function loads the page elements
 */
async function initSummary() {
    await loadtasks();
    await loadUsers();
    if (screenWidth < 982 && document.referrer.endsWith('login.html')) {
        showGreetingPage();
        
    };
    renderPage();
    renderNavbar();
    renderNumbers();
    renderDueDate();
    renderGreeting();
    makeNavbarActive('summary');
    makeSmallNavbarActive('summarySmall');
    renderHeader();
}

function renderPage(){
    let summaryMain = document.getElementById('summaryMain');
    summaryMain.style.display = "block";
}

/**
 * This function toggles the small menu
 */
function showSmallMenu() {
    smallMenu.classList.toggle('noDisplay');
}

/**
 * This function renders the numbers of the each category of tasks
 */
function renderNumbers() {
    let summaryToDos = tasks.filter(task => task.status === 'toDo');
    let summaryDone = tasks.filter(task => task.status === 'done');
    let summaryUrgent = tasks.filter(task => task.prio === 'urgent');
    let summaryInProgress = tasks.filter(task => task.status === 'inProgress');
    let summaryAwaitingFeedback = tasks.filter(task => task.status === 'awaitFeedback');

    toDosNumber.innerHTML = summaryToDos.length;
    doneTasksNumber.innerHTML = summaryDone.length;
    urgentTasksNumber.innerHTML = summaryUrgent.length;
    tasksInBoardNumber.innerHTML = tasks.length;
    tasksInProgressNumber.innerHTML = summaryInProgress.length;
    awaitingFeedbackNumber.innerHTML = summaryAwaitingFeedback.length;
}

/**
 * This function renders the date of the next urgent task
 */
function renderDueDate() {
    let summaryDueDates = tasks.map(task => task.due_date)
    let summaryDueDatesAsDates = summaryDueDates.map(dateString => new Date(dateString));

    if (summaryDueDatesAsDates.length > 0){
    summaryDueDatesAsDates.sort((a, b) => a - b);
    let formattedDate = summaryDueDatesAsDates[0].toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    urgentDueDateText.innerHTML = formattedDate;
    } else {
        urgentDueDateText.innerHTML = "No due dates";
    }
}

function getGreetingName() {
    const activeUser = users.find(user => user.active === true);
    let greetingNameText;
    if (activeUser) {
        console.log(activeUser.name);
        greetingNameText = activeUser.name;
    } else {
        greetingNameText = '';
    }
    return greetingNameText;
}

/**
 * This function renders the greeting name
 */
function renderGreetingName() {
    let greetingNameText = document.getElementById('greetingName');
    greetingNameText.innerHTML = getGreetingName();
}

/**
 * This function gets the greeting message based on the time of the day
 * @returns the greeting message
 */
function getGreeting() {
    const activeUser = users.find(user => user.active === true);
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let greetingMessage;
    if (currentHour >= 5 && currentHour < 12) {
        if (activeUser) {
            greetingMessage = "Good morning,"
        } else {
            greetingMessage = "Good morning"
        }
    } else if (currentHour >= 12 && currentHour < 18) {
        if (activeUser) {
            greetingMessage = "Good afternoon,"
        } else {
            greetingMessage = "Good afternoon"
        }

    } else {
        if (activeUser) {
            greetingMessage = "Good evening,"
        } else {
            greetingMessage = "Good evening"
        }
    }
    return greetingMessage;
}

/**
 * This function renders the greeting
 */
function renderGreeting() {
    let greetingMessage = getGreeting();
    let greetingMessageText = document.getElementById('greetingMessageText');
    greetingMessageText.innerHTML = greetingMessage;
    renderGreetingName();
}

function openBoard() {
    window.location.href = "board.html";
}

function showGreetingPage() {
    let greetingPage = document.getElementById('greetingPage');
    let summaryMain = document.getElementById('summaryMain');
    renderGreetingOnSmallScreen();
    summaryMain.style.display = 'none';
    greetingPage.style.display = 'flex';
    setTimeout(function () {
        greetingPage.style.opacity = '1';
    }, 10);
    setTimeout(function () {
        greetingPage.style.opacity = '0';
    }, 3000);
    setTimeout(function () {
        greetingPage.style.display = 'none';
        summaryMain.style.display = 'block';
    }, 3500);
}

function renderGreetingOnSmallScreen() {
    let greetingMessageSmallScreen = document.getElementById('greetingMessageSmallScreen');
    let greetingNameSmallScreen = document.getElementById('greetingNameSmallScreen');

    greetingMessageSmallScreen.innerHTML = getGreeting();
    greetingNameSmallScreen.innerHTML = getGreetingName();
}