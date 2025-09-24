// View: Presentation and DOM manipulation
const listsContainer = document.getElementById('lists-container');
const currentListDiv = document.getElementById('current-list');
const currentListTitle = document.getElementById('current-list-title');
const itemsList = document.getElementById('items-list');

function displayLists() {
    listsContainer.innerHTML = '';
    lists.forEach(list => {
        const listDiv = document.createElement('div');
        listDiv.style.display = 'grid';
        listDiv.style.gridTemplateColumns = 'auto 1fr auto';
        listDiv.style.alignItems = 'center';
        listDiv.style.padding = '10px';
        listDiv.style.border = '1px solid #dadce0';
        listDiv.style.marginBottom = '8px';
        listDiv.style.backgroundColor = '#fff';
        listDiv.style.borderRadius = '8px';
        listDiv.style.boxShadow = 'var(--shadow)';

        const buttonsLeft = document.createElement('div');
        const renameBtn = document.createElement('button');
        renameBtn.textContent = '✏️';
        renameBtn.title = 'Rename list';
        renameBtn.addEventListener('click', () => renameList(list.id));
        buttonsLeft.appendChild(renameBtn);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = list.name;
        nameSpan.style.textAlign = 'center';
        nameSpan.style.cursor = 'pointer';
        nameSpan.addEventListener('click', () => selectList(list.id));

        const buttonsRight = document.createElement('div');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.title = 'Delete list';
        deleteBtn.addEventListener('click', () => deleteListHandler(list.id));
        buttonsRight.appendChild(deleteBtn);

        listDiv.appendChild(buttonsLeft);
        listDiv.appendChild(nameSpan);
        listDiv.appendChild(buttonsRight);
        listsContainer.appendChild(listDiv);
    });
}

function displayCurrentList() {
    if (!currentList) {
        currentListDiv.style.display = 'none';
        return;
    }
    currentListDiv.style.display = 'block';
    currentListTitle.textContent = currentList.name;
    itemsList.innerHTML = '';
    const filteredItems = currentList.getFilteredItems(currentFilter);
    filteredItems.forEach(item => {
        const li = document.createElement('li');

        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', () => toggleCompleted(item.id));
        checkboxContainer.appendChild(checkbox);

        const span = document.createElement('span');
        span.className = 'item-text';
        span.textContent = item.text;
        if (item.completed) span.classList.add('completed');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'item-buttons';

        const upBtn = document.createElement('button');
        upBtn.textContent = '↑';
        upBtn.addEventListener('click', () => moveItem(item.id, -1));

        const downBtn = document.createElement('button');
        downBtn.textContent = '↓';
        downBtn.addEventListener('click', () => moveItem(item.id, 1));

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editItem(item.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteItem(item.id));

        buttonsContainer.appendChild(upBtn);
        buttonsContainer.appendChild(downBtn);
        buttonsContainer.appendChild(editBtn);
        buttonsContainer.appendChild(deleteBtn);

        li.appendChild(checkboxContainer);
        li.appendChild(span);
        li.appendChild(buttonsContainer);
        itemsList.appendChild(li);
    });
}