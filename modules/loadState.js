import { store } from './store.js'
const STORAGE_KEY = 'todo_state'

export function loadState(initialArray = []) {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      store.tasks = parsed.map(t => ({
        id: Number(t.id) || ++store.nextId,
        title: String(t.title || ''),
        done: !!t.done
      }))
      const ids = store.tasks.map(t => t.id).filter(Boolean)
      if (ids.length) store.nextId = Math.max(store.nextId, ...ids)
      return
    }
  }
  // fallback — начальные задачи
  store.tasks = initialArray.map(item => ({ id: ++store.nextId, title: item.title, done: !!item.done }))
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.tasks))
}