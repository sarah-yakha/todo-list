export class Todo {
    constructor(text, index, completed = false) {
        this.text = text;
        this.index = index;
        this.completed = completed;
    }

    toggle() {
        this.completed = !this.completed;
    }
}
