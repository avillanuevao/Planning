// Model: Data and business logic
class Item {
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}

class TodoList {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.items = [];
    }

    addItem(text) {
        const item = new Item(Date.now(), text);
        this.items.push(item);
        saveToLocalStorage();
    }

    editItem(id, newText) {
        const item = this.items.find(i => i.id === id);
        if (item) item.text = newText;
        saveToLocalStorage();
    }

    deleteItem(id) {
        this.items = this.items.filter(i => i.id !== id);
        saveToLocalStorage();
    }

    toggleCompleted(id) {
        const item = this.items.find(i => i.id === id);
        if (item) item.completed = !item.completed;
        saveToLocalStorage();
    }

    moveItem(id, direction) {
        const index = this.items.findIndex(i => i.id === id);
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < this.items.length) {
            [this.items[index], this.items[newIndex]] = [this.items[newIndex], this.items[index]];
        }
        saveToLocalStorage();
    }

    clearCompleted() {
        this.items = this.items.filter(item => !item.completed);
        saveToLocalStorage();
    }

    rename(newName) {
        this.name = newName;
        saveToLocalStorage();
    }

    getFilteredItems(filter) {
        if (filter === 'pending') return this.items.filter(item => !item.completed);
        if (filter === 'completed') return this.items.filter(item => item.completed);
        return this.items;
    }
}

// Global model data
let lists = [];
let currentList = null;
let currentFilter = 'all';

function createList(name) {
    const list = new TodoList(Date.now(), name);
    lists.push(list);
    saveToLocalStorage();
    return list;
}

function getListById(id) {
    return lists.find(list => list.id === id);
}

function deleteList(id) {
    lists = lists.filter(list => list.id !== id);
    if (currentList && currentList.id === id) {
        currentList = null;
    }
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('todoLists', JSON.stringify(lists));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('todoLists');
    if (data) {
        const parsed = JSON.parse(data);
        lists = parsed.map(listData => {
            const list = new TodoList(listData.id, listData.name);
            list.items = listData.items.map(itemData => new Item(itemData.id, itemData.text, itemData.completed));
            return list;
        });
    }
}

// Load data on startup
loadFromLocalStorage();