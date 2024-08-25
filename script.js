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
         const header = document.createElement('header');
         header.classList.add('header');
        const h1 = document.createElement('h1');
        h1.textContent = 'Plan your day  whith ToDo-List!';
        const container = document.createElement('div');
        container.className = 'todo-container';
        const openBtn = document.createElement('button');
        openBtn.textContent = '+ADD';
        openBtn.className = 'open-btn';
        openBtn.addEventListener('click', () => {
            this.toggleTodoListVisibility(true)
        });
        header.append(h1, openBtn)
        document.body.append(header);
        
      
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'x';
        closeBtn.className = 'close-btn';
        closeBtn.addEventListener('click', () => {
            this.toggleTodoListVisibility(false);
        });
        container.append(closeBtn);

        const cont = document.createElement('div');
        cont.classList.add('contan');

        this.taskInput = document.createElement('input');
        this.taskInput.type = 'text';
        this.taskInput.id = 'new-task';
        this.taskInput.placeholder = 'Добавить задачу...';
        cont.append(this.taskInput)
        container.append(cont);

        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить';
        addButton.addEventListener('click', () => {
            this.addTask(this.taskInput.value);
        });

        cont.append(addButton);
        container.append(cont);

        this.todoList = document.createElement('ol');
        this.todoList.id = 'todo-list';
        container.append(this.todoList);
        document.body.append(container);
    }

    toggleTodoListVisibility (visible){
       const container = document.querySelector('.todo-container');
       container.style.display = visible ? 'block' : 'none';
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
            deleteButton.addEventListener('click', () => {
                this.deleteTask(index)});

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
todoList.toggleTodoListVisibility(false);