const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Структура даних для зберігання справ
// Кожна справа - об'єкт з полями: id, text, checked
let todos = []

// Початкові справи
function getInitialTodos() {
  return [
    {
      id: 1,
      text: 'Вивчити HTML',
      checked: true
    },
    {
      id: 2,
      text: 'Вивчити CSS',
      checked: true
    },
    {
      id: 3,
      text: 'Вивчити JavaScript',
      checked: false
    }
  ]
}

// Завантаження даних з Local Storage при старті
function loadTodos() {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos = JSON.parse(savedTodos)
  } else {
    // Якщо немає збережених даних, використовуємо початкові
    todos = getInitialTodos()
    saveTodos()
  }
  render()
  updateCounter()
}

// Збереження даних у Local Storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Функція для додавання нової справи
function newTodo() {
  const text = prompt('Введіть нове завдання:')
  if (text && text.trim() !== '') {
    const newTodo = {
      id: Date.now(), // Використовуємо timestamp як унікальний ID
      text: text.trim(),
      checked: false
    }
    todos.push(newTodo)
    saveTodos()
    render()
    updateCounter()
  }
}

// Функція для створення HTML розмітки однієї справи
function renderTodo(todo) {
  const checkedClass = todo.checked ? 'text-success text-decoration-line-through' : ''
  const checkedAttr = todo.checked ? 'checked' : ''
  
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${checkedAttr} onchange="checkTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${checkedClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `
}

// Функція для відображення всіх справ
function render() {
  const todosHTML = todos.map(todo => renderTodo(todo)).join('')
  list.innerHTML = todosHTML
}

// Функція для оновлення лічильників
function updateCounter() {
  const totalCount = todos.length
  const uncheckedCount = todos.filter(todo => !todo.checked).length
  
  itemCountSpan.textContent = totalCount
  uncheckedCountSpan.textContent = uncheckedCount
}

// Функція для видалення справи
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  saveTodos()
  render()
  updateCounter()
}

// Функція для відмітки справи як виконаної/невиконаної
function checkTodo(id) {
  const todo = todos.find(t => t.id === id)
  if (todo) {
    todo.checked = !todo.checked
    saveTodos()
    render()
    updateCounter()
  }
}

// Ініціалізація при завантаженні сторінки
loadTodos()

