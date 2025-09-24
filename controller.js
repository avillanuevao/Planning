// Controller: Handles user input and updates model/view
const form = document.getElementById('create-list-form');
const addItemForm = document.getElementById('add-item-form');
const filterAll = document.getElementById('filter-all');
const filterPending = document.getElementById('filter-pending');
const filterCompleted = document.getElementById('filter-completed');
const clearCompleted = document.getElementById('clear-completed');

// Event listeners
form.addEventListener('submit', handleCreateList);
addItemForm.addEventListener('submit', handleAddItem);
filterAll.addEventListener('click', () => setFilter('all'));
filterPending.addEventListener('click', () => setFilter('pending'));
filterCompleted.addEventListener('click', () => setFilter('completed'));
clearCompleted.addEventListener('click', handleClearCompleted);

// Initialize display
displayLists();

// Use case: Crear lista nueva
function handleCreateList(e) {
    e.preventDefault();
    const listName = document.getElementById('list-name').value.trim();
    if (listName) {
        createList(listName);
        displayLists();
        form.reset();
    }
}

// Use case: Entrar en lista (visualizar lista completa)
function selectList(id) {
    currentList = getListById(id);
    displayCurrentList();
}

// Use case: Añadir ítem a la lista
function handleAddItem(e) {
    e.preventDefault();
    if (!currentList) return;
    const itemText = document.getElementById('item-text').value.trim();
    if (itemText) {
        currentList.addItem(itemText);
        displayCurrentList();
        addItemForm.reset();
    }
}

// Use case: Editar ítem existente
function editItem(id) {
    if (!currentList) return;
    const item = currentList.items.find(i => i.id === id);
    if (item) {
        const newText = prompt('Edit item:', item.text);
        if (newText && newText.trim()) {
            currentList.editItem(id, newText.trim());
            displayCurrentList();
        }
    }
}

// Use case: Eliminar ítem
function deleteItem(id) {
    if (currentList) {
        currentList.deleteItem(id);
        displayCurrentList();
    }
}

function renameList(id) {
    const list = getListById(id);
    if (list) {
        const newName = prompt('Rename list:', list.name);
        if (newName && newName.trim()) {
            list.rename(newName.trim());
            displayLists();
            if (currentList && currentList.id === id) {
                displayCurrentList();
            }
        }
    }
}

function deleteListHandler(id) {
    if (confirm('Are you sure you want to delete this list?')) {
        deleteList(id);
        displayLists();
        if (!currentList) {
            document.getElementById('current-list').style.display = 'none';
        }
    }
}

// Use case: Marcar ítem como completado / Desmarcar ítem
function toggleCompleted(id) {
    if (currentList) {
        currentList.toggleCompleted(id);
        displayCurrentList();
    }
}

// Use case: Filtrar ítems por estado
function setFilter(filter) {
    currentFilter = filter;
    displayCurrentList();
}

// Use case: Eliminar todos los ítems completados
function handleClearCompleted() {
    if (currentList) {
        currentList.clearCompleted();
        displayCurrentList();
    }
}

// Use case: Reordenar ítems
function moveItem(id, direction) {
    if (currentList) {
        currentList.moveItem(id, direction);
        displayCurrentList();
    }
}