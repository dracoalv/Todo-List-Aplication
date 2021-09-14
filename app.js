const searchInputTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')
const formAddTodo = document.querySelector('.form-add-todo')

const addTodo = event => {
  event.preventDefault()

  const inputValue = formAddTodo.add.value.trim()

  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}}">
          <span>${inputValue}</span>
          <i class="far fa-trash-alt" data-trash="${inputValue}}"></i>
        </li>
    `
  }

  formAddTodo.reset()
}

const removeTodo = event => {
  const clickedElement = event.target
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

  if (trashDataValue) {
    todo.remove()
  }
}

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
    return returnMatchedTodos ? matchedTodos : !matchedTodos
})

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach(todo => {
    todo.classList.remove(classToRemove)
    todo.classList.add(classToAdd)
  })
}

const hideTodos = (todos, inputValue) => {
  const todosToHide = filterTodos(todos, inputValue, false)
  manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
  const todosToShow = filterTodos(todos, inputValue, true)
  manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

const searchTodos = () => {
  const inputValue = searchInputTodo.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  hideTodos(todos, inputValue)    
  showTodos(todos, inputValue)
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodo)
searchInputTodo.addEventListener('input', searchTodos)