const drawData = (todoContainer, data) => {
    todoContainer.innerHTML = '';
    data.forEach((item) => {
        todoContainer.innerHTML += addToDoData(item);
    });
};
const drawDeletedData = (deletedTodoContainer, data) => {
    deletedTodoContainer.innerHTML = '';
    data.forEach((item) => {
        deletedTodoContainer.innerHTML += drawDeletedDataItem(item);
    });
};
const drawProgressData = (progressTodoContainer, data) => {
    progressTodoContainer.innerHTML = '';
    data.forEach((item) => {
        progressTodoContainer.innerHTML += drawProgressDataItem(item);
    });
};
const drawDoneData = (doneTodoContainer, data) => {
    doneTodoContainer.innerHTML = '';
    data.forEach((item) => {
        doneTodoContainer.innerHTML += drawDoneDataItem(item);
    });
};
const drawReturnData = (todoContainer, data) => {
    todoContainer.innerHTML = '';
    data.forEach((item) => {
        todoContainer.innerHTML += addToDoData(item);
    });
};

const drawDeletedDataItem = (deletedTodoData) => {
    return `<div class="toDoTaskItem" data-index="${deletedTodoData.index}">
                <div class="taskTitle">Title: ${deletedTodoData.toDoTaskName}</div>
                    <div class="taskContent">Content: ${deletedTodoData.toDoContent}</div>
                    <button class="returnBtn" data-index="${deletedTodoData.index}">Return</button>
                </div>`;
}
const drawProgressDataItem = (progressTodoData) => {
    return `<div class="toDoTaskItem" data-index="${progressTodoData.index}">
                <div class="taskTitle">Title: ${progressTodoData.toDoTaskName}</div>
                    <div class="taskContent">Content: ${progressTodoData.toDoContent}</div>
                    <button class="doneBtn" data-index="${progressTodoData.index}">Done</button>
                </div>`;
}
const drawDoneDataItem = (doneTodoData) => {
    return `<div class="toDoTaskItem" data-index="${doneTodoData.index}">
                <div class="taskTitle">Title: ${doneTodoData.toDoTaskName}</div>
                    <div class="taskContent">Content: ${doneTodoData.toDoContent}</div>
                </div>`;
}

const addToDoData = (todoData) => {
    return `
    <div class="toDoTaskItem">
    <div class="taskTitle">Title: ${todoData.toDoTaskName}</div>
    <div class="taskContent">Content: ${todoData.toDoContent}</div>
    <button class="nextBtn" data-index="${todoData.index}">Next</button>
    <button class="editBtn" data-index="${todoData.index}">Edit</button>
    <button class="deleteBtn" data-index="${todoData.index}">Delete</button>
    </div>
    `
}

const showToDoForm = () => {
    const todoForm = document.getElementById('doDoForm');
    if (todoForm) {
        todoForm.style.display = 'block';
    }
}

const showEditForm = (modalData) => {
    console.log(modalData, '====');
    const todoFormEdit = document.getElementById('editForm');
    const toDoTaskNameEdit = document.getElementById('toDoTaskNameEdit');
    const toDoContentEdit = document.getElementById('toDoContentEdit');
    if (todoFormEdit) {
        todoFormEdit.style.display = 'block';
        toDoTaskNameEdit.value = modalData.toDoTaskName;
        toDoContentEdit.value = modalData.toDoContent;
    }
}
const hideEditForm = () => {
    const todoFormEdit = document.getElementById('editForm');
    const toDoTaskNameEdit = document.getElementById('toDoTaskNameEdit');
    const toDoContentEdit = document.getElementById('toDoContentEdit');
    if (todoFormEdit) {
        todoFormEdit.style.display = 'none';
        toDoTaskNameEdit.value = '';
        toDoContentEdit.value = '';
    }
}
const init = () => {
    const savedData = localStorage.getItem('savedData');

    let initialSavedData = {
        data: [],
        deletedToDoItems: [],
        progressToDoItems: [],
        doneToDoItems: []
    };

    if (savedData?.length) {
        initialSavedData = JSON.parse(savedData);
    }

    let index = 0;
    let currentDataIndex = 0;
    let data = initialSavedData.data?.length ? initialSavedData.data : [];
    let deletedToDoItems = initialSavedData.deletedToDoItems?.length ? initialSavedData.deletedToDoItems : [];
    let progressToDoItems = initialSavedData.progressToDoItems?.length ? initialSavedData.progressToDoItems : [];
    const doneToDoItems = initialSavedData.doneToDoItems?.length ? initialSavedData.doneToDoItems : [];

    const toDoData = document.querySelector(".toDoData");
    const deletedToDoContainer = document.querySelector(".deletedToDoData");
    const progressToDoContainer = document.querySelector(".progressToDoData")
    const doneToDoContainer = document.querySelector(".doneToDoData");
    const toDoAddBtn = document.querySelector(".toDoAddBtn");
    const closeEditModal = document.querySelector("#closeEditModal");

    if (savedData?.length) {
        if (initialSavedData?.data?.length) {
            drawData(toDoData, initialSavedData?.data);
        }
        if (initialSavedData?.deletedToDoItems?.length) {
            drawDeletedData(deletedToDoContainer, initialSavedData?.deletedToDoItems);
        }
        if (initialSavedData?.progressToDoItems?.length) {
            drawProgressData(progressToDoContainer, initialSavedData?.progressToDoItems);
        }
        if (initialSavedData?.doneToDoItems?.length) {
            drawDoneData(doneToDoContainer, initialSavedData?.doneToDoItems);
        }
    }

    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        let savingData = {
            data,
            deletedToDoItems,
            progressToDoItems,
            doneToDoItems
        };
        localStorage.setItem('savedData', JSON.stringify(savingData));
    });

    closeEditModal.addEventListener('click', (e) => {
        e.preventDefault();
        hideEditForm();
    })

    const closeTask = document.querySelector(".closeTask");

    closeTask?.addEventListener('click', (ECloseTask) => {
        ECloseTask.preventDefault();
        closeTask.parentNode.querySelector('#toDoTaskName').value = '';
        closeTask.parentNode.querySelector('#toDoContent').value = '';
        const todoForm = document.getElementById('doDoForm');
        if (todoForm) {
            todoForm.style.display = 'none';
        }
    });

    const saveEdit = document.querySelector(".saveEdit");
    if (saveEdit) {
        saveEdit.addEventListener('click', (saveEditEvent) => {
            saveEditEvent.preventDefault();

            if(saveEditEvent.target.closest(".saveEdit")) {
                const taskNameValue = saveEditEvent.target.parentNode.querySelector('.taskName')?.value;
                const toDoContentValue = saveEditEvent.target.parentNode.querySelector('.toDoContent')?.value;
                const currentEditingData = data.find(item => item.index === currentDataIndex);
                if (currentEditingData) {
                    currentEditingData.toDoTaskName = taskNameValue;
                    currentEditingData.toDoContent = toDoContentValue;
                    drawData(toDoData, data);
                }
            }
            hideEditForm();
        });
    }

    toDoData.addEventListener('click', (todoDataClickEvent) => {
        todoDataClickEvent.preventDefault();
        console.log(todoDataClickEvent.target);
        if (todoDataClickEvent.target.nodeName === 'BUTTON') {
            const btnClassListArr = Array.from(todoDataClickEvent.target.classList);
            currentDataIndex = +todoDataClickEvent.target.getAttribute('data-index');
            if (btnClassListArr.includes('editBtn')) {
                const currentEditingData = data.find(item => item.index === currentDataIndex);
                showEditForm(currentEditingData);
            }

            if (btnClassListArr.includes('deleteBtn')) {
                const currentDeletingData = data.find(item => item.index === currentDataIndex);
                data = data.filter(item => item.index !== +currentDeletingData?.index);
                deletedToDoItems.push(currentDeletingData);
                console.log(currentDataIndex, deletedToDoItems, data);
                drawData(toDoData, data);
                drawDeletedData(deletedToDoContainer, deletedToDoItems);
            }

            if (btnClassListArr.includes('nextBtn')) {
                const currentProgressData = data.find(item => item.index === currentDataIndex);
                data = data.filter(item => item.index !== +currentProgressData?.index);
                progressToDoItems.push(currentProgressData);

                drawData(toDoData, data);
                drawProgressData(progressToDoContainer, progressToDoItems);
            }


        }
    });

    progressToDoContainer.addEventListener('click', (progressEvent) => {
        progressEvent.preventDefault();

        if(progressEvent.target.nodeName === 'BUTTON') {
            const btnClassListArr = Array.from(progressEvent.target.classList);
            currentDataIndex = +progressEvent.target.getAttribute('data-index');

            if (btnClassListArr.includes('doneBtn')) {
                const currentMakingDoneData = progressToDoItems.find(item => item.index === currentDataIndex);
                progressToDoItems = progressToDoItems.filter(item => item.index !== +currentMakingDoneData?.index);

                doneToDoItems.push(currentMakingDoneData);

                drawData(progressToDoContainer, progressToDoItems);
                drawDoneData(doneToDoContainer, doneToDoItems);
            }
        }
    });

    deletedToDoContainer.addEventListener('click', (returnEvent) => {
        returnEvent.preventDefault();
        if(returnEvent.target.nodeName === 'BUTTON') {
            const btnClassListArr = Array.from(returnEvent.target.classList);
            currentDataIndex = +returnEvent.target.getAttribute('data-index');
            if(btnClassListArr.includes('returnBtn')) {
                const currentReturnData = deletedToDoItems.find(item => item.index === currentDataIndex);
                deletedToDoItems = deletedToDoItems.filter(item => item.index !== +currentReturnData?.index);
                data.push(currentReturnData);
                drawData(deletedToDoContainer, deletedToDoItems);
                drawReturnData(toDoData, data);
            }
        }
    });

    toDoAddBtn.addEventListener('click', (todoAddBtnEvent) => {
        todoAddBtnEvent.preventDefault();
        showToDoForm();
    });
    const addTask = document.querySelector("#addTask");
    addTask.addEventListener('click', (event) => {
        event.preventDefault();
        const taskName = document.querySelector(".taskName");
        const toDoContent = document.querySelector(".toDoContent");
        const newToDoItem = {
            index: ++index,
            toDoTaskName: taskName.value,
            toDoContent: toDoContent.value
        }
        data.push(newToDoItem);
        toDoData.innerHTML += addToDoData(newToDoItem);

        taskName.value = '';
        toDoContent.value = '';
    });
}

init();
