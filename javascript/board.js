function init(x){
    renderHeader();
    renderNavbar();
    makeNavbarActive(x);
    makeSmallNavbarActive(x);
}

function showCardDetail(){
    document.getElementById('cardContainer').style = "display: flex";
    document.getElementById('cardContainerBackground').style = "display: flex";
    
}

function closeCardDetail(){
    document.getElementById('cardContainer').style = "display: none";
    document.getElementById('cardContainerBackground').style = "display: none";
}


function renderBoard(){
    let allStatus = ['toDo', 'inProgress', 'awaitFeedback','done'];

    for (let i = 0; i < allStatus.length; i++) {
        const status = allStatus[i];
        let filterTask = tasks.filter(t => t['status'] == status);
        
        document.getElementById(`${status}`).innerHTML = '';

        if (filterTask == 0) {
            document.getElementById(`${status}`).innerHTML =/*html*/`
                <div class="noTaskCard">No tasks ${status}</div>`;
        }
        for (let index = 0; index < filterTask.length; index++) {
            const filterTasks = filterTask[index];
            document.getElementById(`${status}`).innerHTML += generateCard(filterTasks);  
        }
    }  
}

function generateCard(element){
    return /*html*/`
        <div class="taskCard">
            <div class="taskCategory ${element['category']}">${element['category']}</div>
            <div class="taskInfo">
                <div class="taskTitle">${element['title']}</div>
                <div class="taskDescription">${element['description']}</div>
            </div>
            <div class="taskSubtasks">
                <div class="progressBar">
                    <div class="progress"></div>
                </div>
                <div class="progressInfo">1/2 Subtasks</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="taskMembers">
                    <div class="taskMember" style="z-index: 1;">KH</div>
                    <div class="taskMember" style="background-color: #1FD7C1; margin-left: -10%; z-index: 1;">NW</div>
                    <div class="taskMember" style="background-color: #FF4646; margin-left: -10%; z-index: 2;">AE</div>
                </div>
                <div> 
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
                    </div>
            </div>
        </div>`;
}

function renderSubtasks(){
    let done = tasks.filter(t => t['subtasks']['status'] == 'done'); 
    let toDo = tasks.filter(t => t['subtasks']['status'] == 'toDo');
    
    document.getElementById(`${status}`).innerHTML = '';
}

function renderAssignTo(){
    
}