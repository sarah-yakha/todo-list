export function deleteTask(index) {
    this.tasks.splice(index, 1);
    this.updateLocalStorage();
    this.renderTasks();
}
