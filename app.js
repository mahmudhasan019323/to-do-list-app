"use strict";
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterItem);
}


function getTasks() {
    console.log("ho");
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }



    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.classList = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.classList = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}



function addTask(e) {

    e.preventDefault();

    if (taskInput.value === "") {
        alert('please enter a task');
    } else {
        // create li
        const li = document.createElement('li');
        // add class to li
        li.classList = 'collection-item';
        // adds input's value to li 
        li.appendChild(document.createTextNode(taskInput.value));
        // create a tag
        const link = document.createElement('a');
        // add class to a tag
        link.classList = 'delete-item secondary-content';
        // add delete icon to a tag
        link.innerHTML = '<i class="fa fa-times"></i>';
        // add link to li
        li.appendChild(link);
        // add li to taskList
        taskList.appendChild(li);
        // add the task to localStorage
        storeTaskInLocalStorage(taskInput.value);
        // clear the input field
        taskInput.value = "";
    }

}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('do you want to delete this item?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    }
}


function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }

    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks() {
    if (confirm('Are you sure you want clear the tasks')) {
        taskList.innerHTML = "";
        localStorage.clear('tasks');
    }

}


function filterItem(e){
    let inputVal = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(li){
        let item = li.firstChild.textContent.toLowerCase();

        if(item.includes(inputVal)){
            li.style.display = "block";
        }else{
            li.style.display = "none";
        }
    })
    // if()
    console.log(inputVal);
}