export function createModal() {
  const div = document.createElement('div')
  div.className = "modal-full"
  div.innerHTML = ``
  document.body.appendChild(div)
  document.body.style.position = 'fixed'
}