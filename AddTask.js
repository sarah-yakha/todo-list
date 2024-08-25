export function addTask(taskText) {
    if (taskText.trim() === '') return;  
    this.tasks.push({ text: taskText, completed: false });
    this.updateLocalStorage();
    this.renderTasks();
    this.taskInput.value = '';  
}
