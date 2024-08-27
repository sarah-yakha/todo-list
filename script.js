import '/style.css';
import { Todo } from './Todo';
import { Storage } from './Storage';



// Класс
class ToDoList {
    constructor(storageKey = 'tasks') {
        this.storage = new Storage(storageKey);
        this.todos = this.loadTodos();
        if(this.todos.length > 0){
            this.currentIndex = Math.max(...this.todos.map(task => task.index));
        }else {
        this.currentIndex = 0;
        }
        
        this.createElem();
        this.renderTasks();
    }
       
    loadTodos(){
        const savedTasks = this.storage.load();
        return savedTasks.map(task => new Todo(task.text, task.index, task.completed));
    }
    
    addTask(taskText) {
        if(taskText.trim() === '') return;
        const newTask = new Todo(taskText, ++this.currentIndex);
        this.todos.push(newTask);
        this.updateLocalStorage();
        this.renderTasks();
        this.taskInput.value = '';
    }

   toggleTask(index){
    this.todos[index].toggle();
    this.updateLocalStorage();
    this.renderTasks();
   }
 
   deleteTask(index){
    this.todos.splice(index, 1);
    this.updateLocalStorage();
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
            this.toggleTodoListVisib(true)
        });
        header.append(h1, openBtn)
        document.body.append(header);
        
      
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'x';
        closeBtn.className = 'close-btn';
        closeBtn.addEventListener('click', () => {
            this.toggleTodoListVisib(false);
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

        this.todoList = document.createElement('ul');
        this.todoList.id = 'todo-list';
        container.append(this.todoList);
        document.body.append(container);
    }

    toggleTodoListVisib (visible){
       const container = document.querySelector('.todo-container');
       container.style.display = visible ? 'block' : 'none';
    }




    renderTasks() {
        this.todoList.textContent = '';  // Очищаем 
        this.todos.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
             
            const taskSpan = document.createElement('span');
            taskSpan.textContent = `${index + 1}.${task.text}`;
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
       this.storage.save(this.todos.map(todo => ({
          text: todo.text,
          index: todo.index,
          completed: todo.completed
       })));
    }
}

const todoList = new ToDoList();
todoList.toggleTodoListVisib(false);