
const add = document.getElementById('add');
const input = document.getElementById('input');
const tasks = document.querySelector('.tasks');

add.addEventListener('click', () => {

    if (input.value.trim() === '') {
        showAlert('Please enter a task');
        return;
    }

    const task = document.createElement('div');
    task.classList.add('task');

    const text = document.createElement('span');
    text.textContent = input.value.trim();
    task.appendChild(text);

    input.value = '';

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.classList.add('delete-btn');
    task.appendChild(del);

    del.addEventListener('click', () => {
        task.remove();
    });

    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.classList.add('edit-btn');
    task.appendChild(edit);

    edit.addEventListener('click', () => {
        showPrompt('Edit your task:', text.textContent, (newVal) => {
            if (newVal && newVal.trim() !== '') {
                text.textContent = newVal.trim();
            } else {
                showAlert('Edit cancelled or invalid text.');
            }
        });
    });

    text.addEventListener('click', () => {
        text.classList.toggle('completed');
    });

    tasks.appendChild(task);
});


function showAlert(msg) {
    const alertBox = document.getElementById("customAlert");
    const alertMsg = document.getElementById("alertMessage");
    const alertOk = document.getElementById("alertOk");

    alertMsg.textContent = msg;
    alertBox.style.display = "flex";

    alertOk.onclick = () => {
        alertBox.style.display = "none";
    };
}


function showPrompt(label, defaultText = "", callback) {
    const promptBox = document.getElementById("customPrompt");
    const promptLabel = document.getElementById("promptLabel");
    const promptInput = document.getElementById("promptInput");
    const promptOk = document.getElementById("promptOk");
    const promptCancel = document.getElementById("promptCancel");

    promptLabel.textContent = label;
    promptInput.value = defaultText;

    promptBox.style.display = "flex";

    promptOk.onclick = () => {
        const value = promptInput.value.trim();
        promptBox.style.display = "none";
        callback(value || null);
    };

    promptCancel.onclick = () => {
        promptBox.style.display = "none";
        callback(null);
    };
}
