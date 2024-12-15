let sprintIDCounter = 1; // To auto-generate Sprint IDs

const saveSprintBtn = document.getElementById('save-sprint-btn');
const saveRemarksBtn = document.getElementById('save-remarks-btn');
const sprintHistoryBody = document.getElementById('sprint-history-body');
const remarksHistoryBody = document.getElementById('remarks-history-body');

saveSprintBtn.addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const projectTitle = document.getElementById('project-title').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const task = document.getElementById('task').value;
    const taskDescription = document.getElementById('task-description').value;

    if (!username || !projectTitle || !startDate || !endDate || !task || !taskDescription) {
        alert('All fields are required!');
        return;
    }

    const sprintID = sprintIDCounter++; 
    // Append sprint data to Sprint History
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${sprintID}</td>
        <td>${username}</td>
        <td>${projectTitle}</td>
        <td>${formatDate(startDate)}</td>
        <td>${formatDate(endDate)}</td>
        <td>${task}</td>
        <td>${taskDescription}</td>
        <td>
            <button class="delete" onclick="deleteSprint(this)">Delete</button>
        </td>
    `;
    sprintHistoryBody.appendChild(newRow);

    // Clear input fields
    clearInputs();
});

saveRemarksBtn.addEventListener('click', function () {
    const sprintID = document.getElementById('remarks-sprint-id').value;
    const remarksStatus = document.getElementById('remarks-status').value;
    const feedback = document.getElementById('remarks-feedback').value;

    if (!sprintID || !remarksStatus || !feedback) {
        alert('All fields are required!');
        return;
    }

    // Append remarks data to Remarks History
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${sprintID}</td>
        <td>${remarksStatus}</td>
        <td>${feedback}</td>
    `;
    remarksHistoryBody.appendChild(newRow);

    // Clear remarks input fields
    clearRemarksInputs();
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function clearInputs() {
    document.getElementById('username').value = '';
    document.getElementById('project-title').value = '';
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    document.getElementById('task').value = '';
    document.getElementById('task-description').value = '';
}

function clearRemarksInputs() {
    document.getElementById('remarks-sprint-id').value = '';
    document.getElementById('remarks-status').value = 'Completed';
    document.getElementById('remarks-feedback').value = '';
}

function editSprint(button) {
    const row = button.closest('tr');
    const sprintID = row.children[0].textContent;
    const username = row.children[1].textContent;
    const projectTitle = row.children[2].textContent;
    const task = row.children[5].textContent;
    const taskDescription = row.children[6].textContent;
    const startDate = row.children[3].textContent;
    const endDate = row.children[4].textContent;

    document.getElementById('username').value = username;
    document.getElementById('project-title').value = projectTitle;
    document.getElementById('task').value = task;
    document.getElementById('task-description').value = taskDescription;
    document.getElementById('start-date').value = startDate;
    document.getElementById('end-date').value = endDate;

    row.remove();
}

function deleteSprint(button) {
    const password = prompt('Enter password to delete this entry:');
    if (password === 'admin123') { // Replace with secure password logic
        button.closest('tr').remove();
    } else {
        alert('Incorrect password!');
    }
}
