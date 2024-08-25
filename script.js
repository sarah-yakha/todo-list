import '/style.css';
import { toggleTask } from './ToggleTask';
import { addTask } from './AddTask';
import { deleteTask } from './DeletTask';



// Класс
class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Привязываем
        this.toggleTask = toggleTask.bind(this);
        this.addTask = addTask.bind(this);
        this.deleteTask = deleteTask.bind(this);

        this.createElem();
        this.renderTasks();
    }

    // Создаем интерфейс
    createElem() {
        const header = document.createElement('h1');
        header.textContent = 'ToDo List';
        document.body.appendChild(header);
        const cont = document.createElement('div');
        cont.classList.add('contan');
        this.taskInput = document.createElement('input');

        this.taskInput.type = 'text';
        this.taskInput.id = 'new-task';
        this.taskInput.placeholder = 'Добавить задачу...';
        cont.append(this.taskInput)
        document.body.append(cont);

        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить';
        addButton.addEventListener('click', () => {
            this.addTask(this.taskInput.value);
        });

        cont.append(addButton)
        

        this.todoList = document.createElement('ol');
        this.todoList.id = 'todo-list';
        document.body.append(this.todoList);
    }

    renderTasks() {
        this.todoList.textContent = '';  // Очищаем 
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            taskSpan.className = task.completed ? 'completed-task' : '';
            taskSpan.addEventListener('click', () => {
                this.toggleTask(index)
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = () => this.deleteTask(index);

            li.append(taskSpan);
            li.append(deleteButton);

            this.todoList.append(li);
        });
    }

    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

const todoList = new ToDoList();