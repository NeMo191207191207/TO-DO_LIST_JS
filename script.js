const title = document.querySelector('.title')
const input = document.querySelector('.input_to-do')
const button = document.querySelector('.create__task')
const types_task = document.querySelector('.types_task')
const list_task = document.querySelector('.list-task')
const list_completede = document.querySelector('.list_completede')
const wrapper_cube = document.querySelector('.wrapper')

// Начальные задачи — будут перенесены в stateTasks с уникальными id
const initialArray = [
  { title: "Выучить React", done: false },
  { title: "Выучить JS", done: false },
  { title: "Выучить CSS", done: false },
]

// State — массив задач, каждая задача: { id, title, done }
let nextId = Date.now()
let stateTasks = []

// Загрузка состояния из localStorage (если есть), иначе используем initialArray
function loadState() {
  const raw = localStorage.getItem('todo_state')
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        stateTasks = parsed.map(t => ({ id: Number(t.id), title: String(t.title), done: !!t.done }))
        nextId = Math.max(nextId, ...stateTasks.map(t => t.id))
        return
      }
    } catch (e) {
      console.error('Ошибка парсинга сохранённого состояния:', e)
    }
  }
  // fallback — начальные задачи
  stateTasks = initialArray.map(item => ({ id: ++nextId, title: item.title, done: !!item.done }))
}

// Сохранение stateTasks в localStorage
function saveState() {
  try {
    localStorage.setItem('todo_state', JSON.stringify(stateTasks))
  } catch (e) {
    console.error('Не удалось сохранить состояние:', e)
  }
}

// Рендер всего списка на основе stateTasks
function renderTasks() {
  list_task.innerHTML = ''
  list_completede.innerHTML = ''

  stateTasks.forEach(task => {
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

    // Вставляем в соответствующий список
    if (task.done) {
      list_completede.appendChild(li)
    } else {
      list_task.appendChild(li)
    }

    // Обработчики — работают с id задачи
    btn_delete.addEventListener('click', () => {
      const idx = stateTasks.findIndex(t => t.id === task.id)
      if (idx !== -1) {
        stateTasks.splice(idx, 1) // удаляем задачу из массива
        saveState()
        renderTasks()
        wrapperCubeNone()
      }
    })

    btn_completed.addEventListener('click', () => {
      const t = stateTasks.find(t => t.id === task.id)
      if (t) {
        t.done = !t.done // переключаем флаг done
        saveState()
        renderTasks()
        wrapperCubeNone()
      }
    })
  })
}

// Создание новой задачи — добавляем в массив и рендерим
function createTask(text) {
  const newTask = { id: ++nextId, title: text, done: false }
  stateTasks.push(newTask)
  saveState()
  renderTasks()
  wrapperCubeNone()
}

// Отображение / скрытие wrapper в зависимости от наличия задач
function wrapperCubeNone() {
  if (stateTasks.length > 0) {
    wrapper_cube.style.display = 'none'
  } else {
    wrapper_cube.style.display = 'block'
  }
}

// Обработчик кнопки добавления
button.addEventListener('click', (e) => {
  e.preventDefault()
  const textInput = input.value
  if (textInput.trim() === '') {
    alert('Введите что-то в поле ввода')
    input.focus()
    return
  }
  createTask(textInput.trim())
  input.value = ''
  input.focus()
})

// Поддержка Enter в поле ввода
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    button.click()
  }
})

// Инициализация
loadState()
renderTasks()
wrapperCubeNone()