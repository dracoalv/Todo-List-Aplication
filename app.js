const searchInputTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')
const formAddTodo = document.querySelector('.form-add-todo')

const addTodo = event => {
  event.preventDefault()

  const inputValue = formAddTodo.add.value.trim()

  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${inputValue}</span>
          <i class="far fa-trash-alt delete"></i>
        </li>
    `
  }

  formAddTodo.reset()
}

const removeTodo = event => {
  const clickedElement = event.target

  if (Array.from(clickedElement.classList).includes('delete')) {
    clickedElement.parentElement.remove()
  }
}

const searchTodos = () => {
  const inputValue = searchInputTodo.value.trim().toLowerCase()

  Array.from(todosContainer.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach(todo => {
      todo.classList.remove('d-flex')
      todo.classList.add('hidden')
    })
    
  Array.from(todosContainer.children)
  .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
  .forEach(todo => {
    todo.classList.remove('hidden')
    todo.classList.add('d-flex')
  })
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodo)
searchInputTodo.addEventListener('input', searchTodos)