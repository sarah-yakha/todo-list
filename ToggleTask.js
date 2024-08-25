export function toggleTask(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.updateLocalStorage();
    this.renderTasks(); 
}