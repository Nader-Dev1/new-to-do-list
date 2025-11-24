const add = document.getElementById('add');
const input = document.getElementById('input');
const tasks = document.querySelector('.tasks');

let items = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(items));
}

function createTaskElement(text, index) {
    const task = document.createElement('div');
    task.classList.add('task');

    const span = document.createElement('span');
    span.textContent = text;
    task.appendChild(span);

    span.addEventListener('click', () => {
        span.classList.toggle('completed');
    });

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.classList.add('delete-btn');
    task.appendChild(del);

    del.addEventListener('click', () => {
        items.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.classList.add('edit-btn');
    task.appendChild(edit);

    edit.addEventListener('click', () => {
        showPrompt('Edit your task:', span.textContent, (newVal) => {
            if (newVal && newVal.trim() !== '') {
                items[index] = newVal.trim();
                saveTasks();
                renderTasks();
            } else {
                showAlert('Edit cancelled or invalid text.');
            }
        });
    });

    tasks.appendChild(task);
}

function renderTasks() {
    tasks.innerHTML = '';
    items.forEach((item, index) => createTaskElement(item, index));
}

add.addEventListener('click', () => {
    if (input.value.trim() === '') {
        showAlert('Please enter a task');
        return;
    }

    items.push(input.value.trim());
    saveTasks();
    renderTasks();
    input.value = '';
});

function showAlert(msg) {
    const alertBox = document.getElementById('customAlert');
    const alertMsg = document.getElementById('alertMessage');
    const alertOk = document.getElementById('alertOk');

    alertMsg.textContent = msg;
    alertBox.style.display = 'flex';

    alertOk.onclick = () => {
        alertBox.style.display = 'none';
    };
}

function showPrompt(label, defaultText = '', callback) {
    const promptBox = document.getElementById('customPrompt');
    const promptLabel = document.getElementById('promptLabel');
    const promptInput = document.getElementById('promptInput');
    const promptOk = document.getElementById('promptOk');
    const promptCancel = document.getElementById('promptCancel');

    promptLabel.textContent = label;
    promptInput.value = defaultText;

    promptBox.style.display = 'flex';

    promptOk.onclick = () => {
        const value = promptInput.value.trim();
        promptBox.style.display = 'none';
        callback(value || null);
    };

    promptCancel.onclick = () => {
        promptBox.style.display = 'none';
        callback(null);
    };
}
