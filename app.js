// Model: Simple in-memory storage for lists
let lists = [];
let currentList = null;
let currentFilter = 'all';

// Controller: Handle form submission
const form = document.getElementById('create-list-form');
const listsContainer = document.getElementById('lists-container');
const currentListDiv = document.getElementById('current-list');
const currentListTitle = document.getElementById('current-list-title');
const addItemForm = document.getElementById('add-item-form');
const itemsList = document.getElementById('items-list');
const filterAll = document.getElementById('filter-all');
const filterPending = document.getElementById('filter-pending');
const filterCompleted = document.getElementById('filter-completed');
const clearCompleted = document.getElementById('clear-completed');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = document.getElementById('list-name').value.trim();
    if (listName) {
        const newList = { id: Date.now(), name: listName, items: [] };
        lists.push(newList);
        displayLists();
        form.reset();
    }
});

addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentList) return;
    const itemText = document.getElementById('item-text').value.trim();
    if (itemText) {
        const newItem = { id: Date.now(), text: itemText, completed: false };
        currentList.items.push(newItem);
        displayCurrentList();
        addItemForm.reset();
    }
});

filterAll.addEventListener('click', () => setFilter('all'));
filterPending.addEventListener('click', () => setFilter('pending'));
filterCompleted.addEventListener('click', () => setFilter('completed'));
clearCompleted.addEventListener('click', () => clearCompletedItems());

// View: Render lists
function displayLists() {
    listsContainer.innerHTML = '';
    lists.forEach(list => {
        const listDiv = document.createElement('div');
        listDiv.textContent = list.name;
        listDiv.style.padding = '10px';
        listDiv.style.border = '1px solid #ccc';
        listDiv.style.marginBottom = '10px';
        listDiv.style.backgroundColor = '#fff';
        listDiv.style.cursor = 'pointer';
        listDiv.addEventListener('click', () => selectList(list));
        listsContainer.appendChild(listDiv);
    });
}

function selectList(list) {
    currentList = list;
    displayCurrentList();
    currentListDiv.style.display = 'block';
}

function displayCurrentList() {
    if (!currentList) return;
    currentListTitle.textContent = currentList.name;
    itemsList.innerHTML = '';
    let filteredItems = currentList.items;
    if (currentFilter === 'pending') {
        filteredItems = currentList.items.filter(item => !item.completed);
    } else if (currentFilter === 'completed') {
        filteredItems = currentList.items.filter(item => item.completed);
    }
    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '10px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', () => toggleCompleted(item));

        const span = document.createElement('span');
        span.textContent = item.text;
        if (item.completed) span.classList.add('completed');

        const upBtn = document.createElement('button');
        upBtn.textContent = '↑';
        upBtn.addEventListener('click', () => moveItem(item, -1));

        const downBtn = document.createElement('button');
        downBtn.textContent = '↓';
        downBtn.addEventListener('click', () => moveItem(item, 1));

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editItem(item));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteItem(item));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(upBtn);
        li.appendChild(downBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        itemsList.appendChild(li);
    });
}

function editItem(item) {
    const newText = prompt('Edit item:', item.text);
    if (newText && newText.trim()) {
        item.text = newText.trim();
        displayCurrentList();
    }
}

function deleteItem(item) {
    currentList.items = currentList.items.filter(i => i.id !== item.id);
    displayCurrentList();
}

function setFilter(filter) {
    currentFilter = filter;
    displayCurrentList();
}

function clearCompletedItems() {
    currentList.items = currentList.items.filter(item => !item.completed);
    displayCurrentList();
}

function toggleCompleted(item) {
    item.completed = !item.completed;
    displayCurrentList();
}

function moveItem(item, direction) {
    const index = currentList.items.indexOf(item);
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < currentList.items.length) {
        [currentList.items[index], currentList.items[newIndex]] = [currentList.items[newIndex], currentList.items[index]];
        displayCurrentList();
    }
}