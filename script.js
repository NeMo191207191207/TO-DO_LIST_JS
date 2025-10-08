import { store } from './modules/store.js'
import { loadState, saveState } from './modules/loadState.js'
import { createTask } from './modules/createTask.js'
import { wrapperCubeNone } from './modules/wrapperCubeNone.js'

const title = document.querySelector('.title')
const input = document.querySelector('.input_to-do')
const button = document.querySelector('.create__task')
const list_task = document.querySelector('.list-task')
const list_completede = document.querySelector('.list_completede')

// Начальные задачи
const initialArray = [
  { title: "Выучить React", done: false },
  { title: "Выучить JS", done: false },
  { title: "Выучить CSS", done: false },
]

// Рендер списка задач из store.tasks
function renderTasks() {
  list_task.innerHTML = ''
  list_completede.innerHTML = ''

  store.tasks.forEach(task => {
    const li = document.createElement('li')
    const inputBlock = document.createElement('div')
    const btnBlock = document.createElement('div')
    const btn_completed = document.createElement('button')
    const btn_delete = document.createElement('button')
    const list_item = document.createElement('span')

    btn_delete.textContent = 'Удалить'
    btn_completed.textContent = 'Выполнено'

    li.classList.add('task')
    inputBlock.classList.add(task.done ? 'inputBlock' : 'inputBlock_vk')
    btnBlock.classList.add('btnBlock')
    btn_completed.classList.add('btn_completed')
    btn_delete.classList.add('btn_delete')

    if (task.done) btn_completed.classList.add('btn_completed_active')
    list_item.textContent = task.title

    inputBlock.appendChild(list_item)
    btnBlock.appendChild(btn_completed)
    btnBlock.appendChild(btn_delete)
    li.appendChild(inputBlock)
    li.appendChild(btnBlock)

    if (task.done) list_completede.appendChild(li)
    else list_task.appendChild(li)

    btn_delete.addEventListener('click', () => {
      const idx = store.tasks.findIndex(t => t.id === task.id)
      if (idx !== -1) {
        store.tasks.splice(idx, 1)
        saveState()
        renderTasks()
        wrapperCubeNone()
      }
    })

    btn_completed.addEventListener('click', () => {
      const t = store.tasks.find(t => t.id === task.id)
      if (t) {
        t.done = !t.done
        saveState()
        renderTasks()
        wrapperCubeNone()
      }
    })
  })
}

// Обработчики UI
button.addEventListener('click', (e) => {
  e.preventDefault()
  const textInput = input.value.trim()
  if (!textInput) {
    alert('Введите что-то в поле ввода')
    input.focus()
    return
  }
  createTask(textInput) // добавляет в store и сохраняет
  input.value = ''
  input.focus()
  renderTasks()
  wrapperCubeNone()
})

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    button.click()
  }
})

// инициализация
loadState(initialArray)
renderTasks()
wrapperCubeNone()