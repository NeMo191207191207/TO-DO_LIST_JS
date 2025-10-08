import { store } from './store.js'
import { saveState } from './loadState.js'

export function createTask(text) {
  const newTask = { id: ++store.nextId, title: text, done: false }
  store.tasks.push(newTask)
  saveState()
}