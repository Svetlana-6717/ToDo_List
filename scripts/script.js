'use strict';

let todoControl = document.querySelector('.todo-control');
let headerInput = document.querySelector('.header-input');
let todoList = document.querySelector('.todo-list');
let todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if (localStorage.getItem('memory')) {
    todoData = JSON.parse(localStorage.getItem('memory'));
}

const showLocalSt = function () {
    localStorage.setItem('memory', JSON.stringify(todoData));
};

const todoDelete = function (elem) {
    const item = elem.parentNode.parentNode;
    const itemParent = item.parentNode;
    const id = itemParent.id;
    const text = item.textContent;

    if (id === 'todo') {
        todoData.splice(todoData.indexOf(text), 1);
    }
    else {
        todoData.splice(todoData.indexOf(text), 1);
    }
    itemParent.removeChild(item);

    showLocalSt();
};

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            render();

            showLocalSt();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function (event) {
            todoDelete(event.target);
        });

    });
};


todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (headerInput.value === '') {
        return;
    } else {
        todoData.push(newTodo);
    }

    showLocalSt();

    headerInput.value = '';

    render();

});

render();

showLocalSt();

