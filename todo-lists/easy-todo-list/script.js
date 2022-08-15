const todos = JSON.parse(localStorage.getItem('todos'));

const form = document.getElementById('form'),
  input = document.getElementById('input'),
  todosList = document.getElementById('todos');

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoValue = input.value;

  if (todo) {
    todoValue = todo.text;
  }

  if (todoValue) {
    const todoEl = document.createElement('li');
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoValue;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLocalStorage();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLocalStorage();
    });

    todosList.appendChild(todoEl);

    input.value = '';

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
