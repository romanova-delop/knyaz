// Функция для добавления задачи
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Пожалуйста, введите текст задачи');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    
    // Создаем новый элемент списка
    const li = document.createElement('li');
    
    // Добавляем текст задачи
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);
    
    // Добавляем кнопку удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
        saveTasks();
    };
    li.appendChild(deleteBtn);
    
    // Добавляем обработчик для отметки выполнения
    li.onclick = function() {
        li.classList.toggle('completed');
        saveTasks();
    };
    
    // Добавляем задачу в список
    taskList.appendChild(li);
    
    // Очищаем поле ввода
    taskInput.value = '';
    
    // Сохраняем задачи
    saveTasks();
}

// Функция для сохранения задач в localStorage
function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    
    for (let i = 0; i < taskList.children.length; i++) {
        const li = taskList.children[i];
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (!savedTasks) return;
    
    const tasks = JSON.parse(savedTasks);
    const taskList = document.getElementById('taskList');
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        li.appendChild(taskSpan);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };
        li.appendChild(deleteBtn);
        
        li.onclick = function() {
            li.classList.toggle('completed');
            saveTasks();
        };
        
        taskList.appendChild(li);
    });
}

// Загружаем задачи при загрузке страницы
window.onload = loadTasks;

// Добавляем обработчик нажатия Enter в поле ввода
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});