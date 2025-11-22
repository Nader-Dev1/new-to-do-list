const add = document.getElementById('add');
const input =document.getElementById('input')
const tasks =document.querySelector('.tasks')


add.addEventListener('click',()=>{
if(input.value===''){
    alert('please enter a task');
    return;
}

const task =document.createElement('div')
task.classList.add('task')
tasks.appendChild(task);

const text =document.createElement('span');
text.textContent=input.value.trim();
task.appendChild(text)
if(input.value.trim){
return input.value='';
}

const del =document.createElement('button');
del.textContent='delete';
input.value='';

task.appendChild(del)
del.addEventListener('click',()=>{
task.remove();

})

text.addEventListener('click',()=>{
    text.classList.toggle('completed');
})

const edit =document.createElement('button');
edit.textContent='Edit';
task.appendChild(edit);

edit.addEventListener('click',()=>{
    const newText =prompt ('edit your task:',)
    if(newText !==null&&newText.trim()!==''){
        text.textContent=newText;
    }else{
     return prompt ('edit your task:',);
    }
})
})