export class Storage {
    constructor(key) {
        this.key = key;
    }

    load() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    clear() {
        localStorage.removeItem(this.key);
    }
}
