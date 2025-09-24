const title = document.querySelector('.title')
const input = document.querySelector('.input_to-do')
const button = document.querySelector('.create__task')
const list = document.querySelector('.list-task')
const types_task = document.querySelector('.types_task')
const task_completede_list = document.createElement('ul')
const wrapper_cube = document.querySelector('.wrapper')

let quantity_task = 0

button.addEventListener('click', (e) => {
  e.preventDefault()
  const textInput = input.value;
  if (textInput.trim() == '') { alert('Введите что-то в поле ввода') }
  else {
    createTask()
  }
  input.focus()
  quantity_task++
  wrapperCubeNone()
})

function createTask() {
  let task = document.createElement('div')
  let btnBlock = document.createElement('div')
  let inputBlock = document.createElement('div')
  let task_completede = document.createElement('ul')
  let list_item = document.createElement('li')
  let btn_completed = document.createElement('button')
  let btn_delete = document.createElement('button')

  btn_delete.textContent = 'Удалить'
  btn_completed.textContent = 'Выполенено'

  // Задаю CLass
  task.classList.add('task')
  inputBlock.classList.add('inputBlock_vk')
  btnBlock.classList.add('btnBlock')
  btn_completed.classList.add('btn_completed')
  btn_delete.classList.add('btn_delete')
  task_completede.classList.add('tack_completede')
  
  list_item.textContent = input.value

  // Отрисовка на странице
  list.after(task)
  task.append(inputBlock)
  task.append(btnBlock)
  btnBlock.append(btn_completed) 
  btnBlock.append(btn_delete)
  types_task.append(task_completede)
  inputBlock.append(list_item)
  input.value = ''

  btn_delete.addEventListener('click', () => {
    task.remove()
    quantity_task--
    wrapperCubeNone()
  })

  btn_completed.addEventListener('click', () => {
    inputBlock.classList.toggle('inputBlock')
    btn_completed.classList.toggle('btn_completed_active')
    task_completede.after(task)
  })
}
function wrapperCubeNone() {
  if(quantity_task > 0){
    wrapper_cube.style.display = 'none'
  }
  if(quantity_task === 0) {
    wrapper_cube.style.display = 'block'
  }
}