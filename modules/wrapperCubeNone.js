import { store } from './store.js'

export function wrapperCubeNone() {
  const wrapper_cube = document.querySelector('.wrapper')
  if (!wrapper_cube) return
  wrapper_cube.style.display = store.tasks.length > 0 ? 'none' : 'block'
}